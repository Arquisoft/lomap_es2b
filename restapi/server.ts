import cors from "cors"
import express, { Application, RequestHandler } from "express"
import { readFileSync } from "fs"
import promBundle from 'express-prom-bundle'
import getConfig from "./src/config"
import { createServer } from "https"
import errorHandler from "./src/middlewares/errorHandler"
import routes from "./src/routes"


const app: Application = express();
const port: number = 5000;

const metricsMiddleware: RequestHandler = promBundle({ includeMethod: true });
app.use(metricsMiddleware);
app.use(cors())

let host = process.env.host || "localhost";

var privateKey = readFileSync("certificates/host.key");
var certificate = readFileSync("certificates/host.cert");
var credentials = { key: privateKey, cert: certificate };

app.all("*", function (req, res, next) {
  if (req.secure) {
    return next();
  }
  console.log("redirecting to https");
  res.redirect("https://" + req.hostname + req.url);
});

app.get('/api', (req, res) => {
    res.status(200).json({ message: 'LoMap restAPI' })
})

app.use('/api/image', routes.images)



createServer(credentials, app)
  .listen(port, (): void => {
    console.log("Restapi listening on " + port);
  })
  .on("error", (error: Error) => {
    console.error("Error occured: " + error.message);
  });