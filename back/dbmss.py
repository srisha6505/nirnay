import pymongo
import json
from pymongo.errors import ConnectionFailure, OperationFailure, ConfigurationError

def send_json_to_mongodb(json_file_path, mongodb_uri, database_name, collection_name):
    try:
        # Connect to MongoDB
        client = pymongo.MongoClient(mongodb_uri)
        
        # Check if the connection was successful
        client.admin.command('ismaster')
        
        # Select the database and collection
        db = client[database_name]
        collection = db[collection_name]
        
        # Read the JSON file
        with open(json_file_path, 'r') as file:
            data = json.load(file)
        
        # Insert the data into the collection
        if isinstance(data, list):
            result = collection.insert_many(data)
            print(f"Inserted {len(result.inserted_ids)} documents")
        elif isinstance(data, dict):
            result = collection.insert_one(data)
            print(f"Inserted document with ID: {result.inserted_id}")
        else:
            print("Invalid JSON format. Expected a list or a dictionary.")
            return
        
        print("JSON data successfully sent to MongoDB")
    
    except FileNotFoundError:
        print(f"Error: JSON file not found at {json_file_path}")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in the file")
    except ConnectionFailure:
        print("Error: Could not connect to MongoDB")
    except ConfigurationError as e:
        print(f"Error: MongoDB configuration error - {str(e)}")
    except OperationFailure as e:
        print(f"Error: MongoDB operation failed - {str(e)}")
    finally:
        if 'client' in locals():
            client.close()


uri = "mongodb+srv://swatantratiwari29:Niggaballz@adaalat.1q8sc.mongodb.net/?retryWrites=true&w=majority&appName=Adaalat"
send_json_to_mongodb("data.json", uri, "legal_cases_db", "cases")
