import app from './app'
import { connectToDB } from './database'

connectToDB()

app.listen(app.get('port'), () : void => {
    console.log('Restapi listening on '+ app.get('port'))
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message)
});

