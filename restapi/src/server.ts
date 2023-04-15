import { RequestHandler } from 'express';
import promBundle from 'express-prom-bundle'
import app from './app'


const metricsMiddleware:RequestHandler = promBundle({includeMethod: true})
app.use(metricsMiddleware)

app.listen(app.get('port'), () : void => {
    console.log('Restapi listening on '+ app.get('port'))
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message)
});