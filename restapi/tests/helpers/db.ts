import mongoose from'mongoose'

import getVars from '../../src/config' 

const { dbName: databaseName, dbPass, dbUser, dbHost: databaseHost } = getVars()

export const connect = () => {
  const dbUserName = encodeURI(dbUser)
  const dbPassword = encodeURI(dbPass)
  const dbName = encodeURI(databaseName)
  const dbHost = encodeURI(databaseHost)

  const CONNECTION_URI = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(CONNECTION_URI)
    .then()
    .catch(err => console.error(err))

}

export const clearAndClose = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }

  await mongoose.connection.close()
}



export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
}
