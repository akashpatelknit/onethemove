const { MongoClient } = require("mongodb")

let mongoClient = null 

const initDB = async () => {
    try {
      const uri = 'mongodb+srv://main:bDnrJIflqg0Cz5uw@cluster0.lip2cfo.mongodb.net/test'
      mongoClient = new MongoClient(uri, { useNewUrlParser: true })
  
      // Connect to the client and query
      await mongoClient.connect()
      console.log('DB connected')
    } catch (error) {
      console.error(error)
    }
}

async function getAll (collectionName, filterQuery) {
  if (filterQuery == null) {
    filterQuery = {}
  }
  
  const cursor = mongoClient
    .db('otm')
    .collection(collectionName)

  const results = await cursor.find(filterQuery).sort({ _id: -1 })
  return results.toArray()
}

module.exports = {
    initDB,
    getAll
}