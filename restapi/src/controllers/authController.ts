import { Response } from "express"
import { sign } from "jsonwebtoken"
import UserModel from "../model/userModel"
import { CustomRequest } from "../types/FriendRequest"
import { IRestApiResponse } from "../types/IRestApiResponse"

import getVars from '../config'
const { jwtToken } = getVars()

const createToken = (webId:string) => {
  return sign(webId, jwtToken)
}

export const login = async (req:CustomRequest<{ WebId: string }>, res:Response<IRestApiResponse,any>) => {

  // TODO comprobar que la sesion de Solid del usuario es valida

  if (!req.body.WebId)
    return res.status(401).json({ success: false, error: { message: 'User\'s WebId missing in request body' } })

  const webId = req.body.WebId

  let newUser = false
  
  let user = await UserModel.findOne({ webId })
  if (!user) {
    user = await UserModel.create({
      webId
    })
    newUser = true
  }

  const token = createToken(user._id.toString())

  return res.status(200).json({ success: true, data: { token, webId, newUser } })
}