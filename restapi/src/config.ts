import { config } from 'dotenv'

config()

export default function() {

  if (!process.env.JWT_TOKEN) {
    console.error("jwt token not defined")
    process.exit(1)
  }
  if (!process.env.PORT) {
    console.error("port not defined")
    process.exit(1)
  }

  return {
    jwtToken: process.env.JWT_TOKEN,
    port: process.env.PORT,
  }
}