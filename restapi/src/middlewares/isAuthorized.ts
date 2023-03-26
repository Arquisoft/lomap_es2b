import { NextFunction, Request, Response } from "express"
import jwt, { verify } from 'jsonwebtoken'
import { IRestApiResponse } from "../types/IRestApiResponse"

import getVars from '../config'
const { jwtToken } = getVars()

function verifyToken(token:string) {
  return verify(token, jwtToken)
}

const isAuthorized = (req:Request, res:Response<IRestApiResponse>, next:NextFunction) => {
  console.log(req.headers)
  if (!req.headers['session-token'])
    return res.status(401).json({ success: false, error: { message: 'User\'s Session-Token missing in request headers' } })
    
  try {
    res.locals.WebId = verifyToken(req.headers['session-token'].toString())
    console.log(res.locals.WebId)
    next()
  } catch (error) {
    res.status(401).json({ success: false, error: { message: 'Error while authenticating' } })
  }

}

export { isAuthorized }