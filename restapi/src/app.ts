import express, { Application } from "express"
import cors from 'cors'

import getConfig from "./config"
import routes from './routes'
import errorHandler from "./middlewares/errorHandler"
import { createServer } from "https"

const app: Application = express()

app.disable('x-powered-by')

const port=getConfig().port
app.set('port', getConfig().port)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/api', (req, res) => {
  res.status(200).json({ message: 'LoMap restAPI' })
})

app.use('/api/image', routes.images)

app.use(errorHandler)


export default app