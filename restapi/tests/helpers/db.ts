import mongoose from'mongoose'

import UserModel from '../../src/model/userModel'
import getVars from '../../src/config' 

const { dbName: databaseName, dbPass, dbUser, dbHost: databaseHost } = getVars()

export const connect = () => {
  return new Promise((resolve, reject) => {
    const dbUserName = encodeURI(dbUser)
    const dbPassword = encodeURI(dbPass)
    const dbName = encodeURI(databaseName)
    const dbHost = encodeURI(databaseHost)
  
    const CONNECTION_URI = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
  
    mongoose.set('strictQuery', false)
    mongoose.connect(CONNECTION_URI)
      .then(() => {
        resolve(undefined)
      })
      .catch(err => {
        console.error(err)
        reject(err)
      })    
  })

}

export const addMockData = async () => {

  let user1 = await UserModel.create({
    webId: 'https://user1.inrupt.com'
  })
  
  let user2 = await UserModel.create({
    webId: 'https://user2.inrupt.com',
    friends: [ user1._id ]
  })
  
  await UserModel.create({
    webId: 'https://user3.inrupt.com',
    friends: [ user1._id, user2._id ]
  })


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
