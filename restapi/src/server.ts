import express, { Application, RequestHandler } from "express"
import cors from 'cors'
import bp from 'body-parser'
import promBundle from 'express-prom-bundle'

import { connectToDB } from './database'
import routes from './routes'
import getConfig from "./config"

declare global {
    namespace Express {
      interface Headers {
        'Web-Id': string;
      }
      interface MyRequest<TBody> {
        body: TBody
        headers: Headers
      }
    }
}

const app: Application = express()
connectToDB()

app.set('port', getConfig().port)

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true})
app.use(metricsMiddleware)

app.use(cors())
app.use(bp.json())

app.use("/api/friends", routes.friends)

app.listen(app.get('port'), () : void => {
    console.log('Restapi listening on '+ app.get('port'))
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message)
});

export default app

