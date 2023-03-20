import { Request } from "express"

export interface IFriendBody {
  friendWebId: string
}

export interface FriendsRequest<TBody> extends Request {
  body: TBody
}