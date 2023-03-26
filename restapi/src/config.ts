import { config } from 'dotenv'

config()

export default function() {

  if (!process.env.MONGODB_USERNAME) {
    console.error("mongodb username not defined")
    process.exit(1)
  }
  if (!process.env.MONGODB_PASSWORD) {
    console.error("mongodb password not defined")
    process.exit(1)
  }
  if (!process.env.MONGODB_DATABASE_NAME) {
    console.error("mongodb database name not defined")
    process.exit(1)
  }
  if (!process.env.MONGODB_HOST) {
    console.error("mongodb host not defined")
    process.exit(1)
  }
  if (!process.env.JWT_TOKEN) {
    console.error("jwt token not defined")
    process.exit(1)
  }
  if (!process.env.PORT) {
    console.error("port not defined")
    process.exit(1)
  }

  if (process.env.NODE_ENV === 'test' && !process.env.MONGODB_TEST_DATABASE_NAME) {
    console.error("mongodb test database name not defined")
    process.exit(1)
  }

  if (process.env.NODE_ENV === 'test')  
    return {
      dbUser: process.env.MONGODB_USERNAME,
      dbPass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_TEST_DATABASE_NAME || '',
      dbHost: process.env.MONGODB_HOST,
      jwtToken: process.env.JWT_TOKEN,
      port: process.env.PORT,
    }
  else
    return {
      dbUser: process.env.MONGODB_USERNAME,
      dbPass: process.env.MONGODB_PASSWORD,
      dbName: process.env.MONGODB_DATABASE_NAME,
      dbHost: process.env.MONGODB_HOST,
      jwtToken: process.env.JWT_TOKEN,
      port: process.env.PORT,
    }
}