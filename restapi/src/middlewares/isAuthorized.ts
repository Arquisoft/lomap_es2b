import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { IRestApiResponse } from "../types/IRestApiResponse"
import axios from 'axios'
import { Session } from "@inrupt/solid-client-authn-node"

function verifyToken(token:string) {
  const session = new Session({

  }, token)

  console.log(session)
}

const isAuthorized = (req:Request, res:Response<IRestApiResponse>, next:NextFunction) => {
  //TODO Falta verificar la identidad del usuario
  console.log(`User: ${req.headers['web-id']}`)
  if (!req.headers['Web-Id'])
    return res.status(401).json({ success: false, error: { message: 'User\'s WebId missing in request headers' } })
  if (!req.headers['Session-Token'])
    return res.status(401).json({ success: false, error: { message: 'User\'s WebId missing in request headers' } })
  
  verifyToken(req.headers['Session-Token'])

  res.locals.WebId=req.headers['web-id']
  next()
}

export { isAuthorized }