import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { IRestApiResponse } from "../types/IRestApiResponse"

function verifyToken(token:string) {
  const publicKey = ""// obtain the user's public key from the IDP
  const options : jwt.VerifyOptions = {
    algorithms: ["ES256"],
    audience: 'https://solidcommunity.net',
    issuer: 'https://solidcommunity.net',
  }

  try {
    const decoded = jwt.verify(token, publicKey, options)
    return decoded
  } catch (error) {
    console.error('Invalid Solid session token:', error.message)
    return null
  }
}

const isAuthorized = (req:Request, res:Response<IRestApiResponse>, next:NextFunction) => {
  //TODO Falta verificar la identidad del usuario
  console.log(`User: ${req.headers['web-id']}`)
  if (!req.headers['web-id'])
    return res.status(401).json({ success: false, error: { message: 'User\'s WebId missing in request headers' } })
  
  res.locals.WebId=req.headers['web-id']
  next()
}

export { isAuthorized }