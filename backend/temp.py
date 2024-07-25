from pymongo import MongoClient

# Replace with your MongoDB connection string
client = MongoClient("mongodb+srv://hardiksingla007:S1SvMouq8bjaGlpQ@cluster0.sfm2x4j.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection = db["userLogins"]

# Update all documents by renaming the field
collection.update_many(
    {},
    { "$rename": { "time": "loginTime" } }
)