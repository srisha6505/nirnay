from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

uri = "mongodb+srv://codesrisha:Zygf4fUYScWteOWk@cluster0.my38l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))

db = client["abdsa"] 

def insert_data(collection_name: str, data: dict):
    
    collection = db[collection_name]
    try:
        result = collection.insert_one(data)
        print(f"Data inserted with id: {result.inserted_id}")
    except Exception as e:
        print(f"Error inserting data: {e}")

from pymongo import MongoClient


   



def retrieve_data(collection_name: str, query: dict = {}):

    collection = db[collection_name]
    try:
        # Perform the query and return the results as a list
        documents = collection.find(query)
        return list(documents)
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return []




def delete_collection(collection_name: str):

    collection = db[collection_name]
    try:
        collection.drop()  # This deletes the collection
        print(f"Collection '{collection_name}' deleted successfully.")
    except Exception as e:
        print(f"Error deleting collection: {e}")

def list_all_collections():
    try:
        collections = db.list_collection_names()
        if collections:
            print("Collections in the database:")
            for collection in collections:
                print(f"- {collection}")
        else:
            print("No collections found in the database.")
        return collections
    except Exception as e:
        print(f"Error listing collections: {e}")
        return []
    

def retrieve_data_as_json(collection_name: str, query: dict = {}):
    # Retrieve the collection from the database
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



import json


from bson import ObjectId

# Function to convert MongoDB object to JSON serializable data
def convert_mongo_obj_to_json(data):
    if isinstance(data, list):
        return [convert_mongo_obj_to_json(item) for item in data]
    if isinstance(data, dict):
        return {key: convert_mongo_obj_to_json(value) for key, value in data.items()}
    if isinstance(data, ObjectId):
        return str(data)
    return data








# insert_data("db123", {"name": "John Doe", "age": 30})
# documents = retrieve_data("casess", {})
# print(documents)
# delete_collection("casess")
list_all_collections()