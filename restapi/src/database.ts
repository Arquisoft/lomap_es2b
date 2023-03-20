import mongoose from'mongoose'

import getVars from './config' 

const { dbName: databaseName, dbPass, dbUser, dbHost: databaseHost } = getVars()

const dbUserName = encodeURI(dbUser)
const dbPassword = encodeURI(dbPass)
const dbName = encodeURI(databaseName)
const dbHost = encodeURI(databaseHost)

const CONNECTION_URI = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`

export function connectToDB() {
  mongoose.set('strictQuery', false)
  mongoose.connect(CONNECTION_URI)
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err))
}