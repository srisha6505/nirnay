from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from fastapi.middleware.cors import CORSMiddleware
import dbms
import os

class SuccessResponse(BaseModel):
    detail: str

app = FastAPI()

def retrieve_data_as_json(collection_name: str, query: dict = {}):
    # Retrieve the collection from the database
    db = client["User"]
    collection = db[collection_name]
    try:
        # Find documents based on the provided query
        documents = collection.find(query)
        document_list = list(documents)

        # Convert ObjectId to string for JSON serialization
        for document in document_list:
            if '_id' in document:
                document['_id'] = str(document['_id'])
    
        return document_list
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return []



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to allow only specific origins for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client setup (replace with your MongoDB connection details)
uri = "mongodb+srv://codesrisha:Zygf4fUYScWteOWk@cluster0.my38l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client["abdsa"]
# collection = db["casess"]

# Helper function to serialize MongoDB ObjectId and handle non-serializable data
def serialize_case(case):
    case["_id"] = str(case["_id"])  # Convert ObjectId to string
    return case  # Include all fields including judgment

@app.get("/cases")
async def get_cases():
    a = dbms.retrieve_data_as_json("saved_cases")
    return a[:10]

@app.get("/notifications")
async def get_cases():
    a = dbms.retrieve_data_as_json("notifications")
    return a[:10]

@app.get("/notes")
async def get_cases():
    a = dbms.retrieve_data_as_json("notes")
    return a[:10]

@app.get("/cases/citation/{collection_name}")
async def get_cases_by_collection(collection_name: str):
    try:
        print("here")

        # Fetch cases from the specified collection
        cases = retrieve_data_as_json(collection_name)
        print("here")

        # Check if any cases were found
        if not cases:
            raise HTTPException(status_code=404, detail="No cases found in this collection.")

        # Serialize cases before returning
        serialized_cases = [serialize_case(case) for case in cases]
        return serialized_cases
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving cases from collection: {str(e)}")




@app.get("/cases/citation/{citation}")
async def get_case_by_citation(citation: str):
    normalized_citation = citation.replace("%20", " ")  # Decode URL encoding
    cases = dbms.retrieve_data_as_json("casess", {"citation": normalized_citation})

    if not cases:
        raise HTTPException(status_code=404, detail="Case not found")

    case = serialize_case(cases[0])  # Serialize before returning
    return case

# New endpoint for fetching judgment by citation
@app.get("/cases/judgment/{citation}")
async def get_case_judgment_by_citation(citation: str):
    normalized_citation = citation.replace("%20", " ")  # Decode URL encoding
    judgment = dbms.retrieve_data_as_json("casess", {"citation": normalized_citation})

    if not judgment:
        raise HTTPException(status_code=404, detail="Judgment not found")

    return {"judgment": judgment[0].get("judgment", "No judgment text available")}

class Case(BaseModel):
    petitioner: str
    respondent: str
    date_of_judgment: str
    bench: str
    citation: str
    citator_info: Optional[str] = None
    judgment: str
    court: str

@app.post("/cases/citation/", response_model=Case)
async def create_case(new_case: Case):
    print("Received request to create a new case")

    try:
        # Insert new case data into the collection
        collection = db["abdsa"]
        case_data = new_case.dict()  # Convert Pydantic model to dict
        collection.insert_one(case_data)
        return serialize_case(case_data)  # Serialize before returning
    except Exception as e:
        print(f"Error while creating new case: {e}")
        raise HTTPException(status_code=500, detail="Failed to create new case")

@app.post("/cases/citation/{collection}", response_model=Case)
async def create_new_collection(collection: str):
    print("Received request to create a new collection:", collection)

    # Prepare new case data using default values
    new_case_data = {
        "petitioner": "add_case",
        "respondent": "add_case",
        "date_of_judgment": "add_case",
        "bench": "add_case",
        "citation": "add_case",
        "citator_info": None,
        "judgment": "add_case",
        "court": "add_case"
    }

    try:
        # Insert new case data into the new collection
        dbms.insert_data(collection, new_case_data)
        return new_case_data
    except Exception as e:
        print(f"Error while creating new collection: {e}")
        raise HTTPException(status_code=500, detail="Failed to create new collection")



@app.get("/cases/citation/see", response_model=List[str])
async def show_db():
    try:
        collections = db.list_collection_names()
        return collections  # Return the list of collection names as JSON
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing collections: {str(e)}")

@app.delete("/cases/citation/{collection}", response_model=SuccessResponse)
async def remove_db(collection: str):
    try:
        dbms.delete_collection(collection)
        return SuccessResponse(detail="Collection successfully deleted.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to remove collection: {str(e)}")

# Search endpoint that supports partial matching
@app.get("/cases/search", response_model=List[Case])
async def search_cases(petitioner: Optional[str] = None, respondent: Optional[str] = None):
    try:
        collection = db["casess"]
        query = {}

        if petitioner:
            query["petitioner"] = {"$regex": petitioner, "$options": "i"}  # Case-insensitive regex
        if respondent:
            query["respondent"] = {"$regex": respondent, "$options": "i"}  # Case-insensitive regex

        results = list(collection.find(query))

        if not results:
            raise HTTPException(status_code=404, detail="No cases found")

        serialized_results = [serialize_case(case) for case in results]
        print(serialized_results)
        return serialized_results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
