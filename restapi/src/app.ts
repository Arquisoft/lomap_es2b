import express, { Application, Request, Response } from "express"
import cors from 'cors'

import getConfig from "./config"
import routes from './routes'
import errorHandler from "./middlewares/errorHandler"

const app: Application = express()

app.set('port', getConfig().port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/image', routes.images)

app.use(errorHandler)

export default app