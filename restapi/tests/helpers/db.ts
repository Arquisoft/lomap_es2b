import getVars from '../../src/config' 

const { dbName: databaseName, dbPass, dbUser, dbHost: databaseHost } = getVars()

export const connect = () => {
  const dbUserName = encodeURI(dbUser)
  const dbPassword = encodeURI(dbPass)
  const dbName = encodeURI(databaseName)
  const dbHost = encodeURI(databaseHost)
}