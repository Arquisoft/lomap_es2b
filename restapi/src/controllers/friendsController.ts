import { Request, Response } from "express"

import UserModel from "../model/userModel"
import { CustomRequest, IFriendBody } from "../types/FriendRequest"
import { IRestApiResponse } from "../types/IRestApiResponse"

const getFriends = async (req:Request, res:Response<IRestApiResponse,any>) => {
  const userId = res.locals.userId

  try {
    let user = await UserModel.findById(userId)
    if (!user) {
      return res.status(400).json({ success: false, error: { message: 'Could not find user data' } })
    }

    const friends:String[] = []
    for (let friendId of user.friends) {
      const friend = await UserModel.findById(friendId)
      if (friend && friend.webId)
        friends.push(friend.webId)
    }

    return res.status(200).json({ success: true, data: { friends } })

  } catch(err) {
    return res.status(500).json({ success: false, error: { message: err } })
  }
}

const addFriend = async (req:CustomRequest<IFriendBody>, res:Response<IRestApiResponse,any>) => {
  const userId = res.locals.userId
  const newFriendWebId = req.body.friendWebId
  
  if (!newFriendWebId)
    return res.status(400).json({ success: false, error: { message: 'Friend\'s WebId missing on request body' } })

  try {
    let user = await UserModel.findById(userId)
    if (!user) {
      return res.status(400).json({ success: false, error: { message: 'Could not find user data' } })
    }

    if (user.webId === newFriendWebId)
      return res.status(400).json({ success: false, error: { message: 'Cannot add yourself as friend' } })

    let friend = await UserModel.findOne({ webId: newFriendWebId })
    if (!friend) {
      return res.status(400).json({ success: false, error: { message: 'Friend is not a LoMap user' } })
    }

    if (friend.friends.includes(user.id))
      return res.status(200).json({ success: true, data: { message: 'Already friends' } })

    const updatedFriend = friend
    updatedFriend.friends = [...friend.friends, user._id]
    await UserModel.findByIdAndUpdate(friend.id, updatedFriend)

    return res.status(200).json({ success: true, data: { message: 'Added new friend' } })
  } catch(err) {
    return res.status(500).json({ success: false, error: { message: 'Error while adding friend'} })
  }
}

export { getFriends, addFriend }