import { Request } from "express"

export interface IFriendBody {
  friendWebId: string
}

export interface CustomRequest<TBody> extends Request {
  body: TBody
}