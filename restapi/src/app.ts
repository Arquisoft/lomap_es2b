import express, { Application } from "express"
import cors from 'cors'

import getConfig from "./config"
import routes from './routes'
import errorHandler from "./middlewares/errorHandler"
import { readFileSync } from "fs"
import { createServer } from "https"

const app: Application = express()

app.disable('x-powered-by')

const port=getConfig().port
app.set('port', getConfig().port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

var privateKey = readFileSync("src/certificates/host.key");
var certificate = readFileSync("src/certificates/host.cert");
var credentials = { key: privateKey, cert: certificate };

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'LoMap restAPI' })
})

app.use('/api/image', routes.images)

app.use(errorHandler)

createServer(credentials, app)
  .listen(port, (): void => {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });

export default app

