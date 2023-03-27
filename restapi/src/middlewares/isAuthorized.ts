import { NextFunction, Request, Response } from "express"
import jwt, { verify } from 'jsonwebtoken'
import { IRestApiResponse } from "../types/IRestApiResponse"

import getVars from '../config'
const { jwtToken } = getVars()

function verifyToken(token:string) {
  return verify(token, jwtToken)
}

const isAuthorized = (req:Request, res:Response<IRestApiResponse>, next:NextFunction) => {
  if (!req.headers['session-token'])
    return res.status(403).json({ success: false, error: { message: 'User\'s Session-Token missing in request headers' } })
    
  try {
    res.locals.userId = verifyToken(req.headers['session-token'].toString())
    next()
  } catch (error) {
    res.status(403).json({ success: false, error: { message: 'Could not authenticate user' } })
  }

}

export { isAuthorized }