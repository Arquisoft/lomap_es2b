import express, { Application, RequestHandler } from "express"
import cors from 'cors'
import promBundle from 'express-prom-bundle'

import routes from './routes'
import getConfig from "./config"

const app: Application = express()

app.set('port', getConfig().port)

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true})
app.use(metricsMiddleware)

app.use(cors())
app.use(express.json())

app.use("/api/friends", routes.friends)
app.use("/api", routes.auth)

export default app