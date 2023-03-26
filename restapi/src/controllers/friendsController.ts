import { Response } from "express"

import UserModel from "../model/userModel"
import { CustomRequest, IFriendBody } from "../types/FriendRequest"
import { IRestApiResponse } from "../types/IRestApiResponse"

const getFriends = async (req:CustomRequest<{}>, res:Response<IRestApiResponse,any>) => {
  const userWebId = res.locals.WebId

  try {
    let user = await UserModel.findOne({ webId: userWebId })
    if (!user) {
      user = await UserModel.create({ webId: userWebId, friends: [] })
    }

    const friends:String[] = []
    console.log(user.friends)
    for (let friendId of user.friends) {
      const friend = await UserModel.findById(friendId)
      if (friend && friend.webId)
        friends.push(friend.webId) && console.log(friend)
    }
    console.log(friends)
    return res.status(200).json({ success: true, data: { friends } })

  } catch(err) {
    return res.status(500).json({ success: false, error: { message: err } })
  }
}

const addFriend = async (req:CustomRequest<IFriendBody>, res:Response<IRestApiResponse,any>) => {
  const userWebId = res.locals.WebIds
  const newFriendWebId = req.body.friendWebId

  if (!userWebId) 
    return res.status(400).json({ success: false, error: { message: 'User\'s WebId missing in request headers' } })
  
  if (!userWebId)
    return res.status(400).json({ success: false, error: { message: 'Friend\'s WebId is required on request body' } })

  try {
    let user = await UserModel.findOne({ webId: userWebId })

    if (!user) {
      user = await UserModel.create({ webId: userWebId, friends: [] })
    }
    
    let friend = await UserModel.findOne({ webId: newFriendWebId })
    if (!friend) {
      friend = await 
      UserModel.create({ webId: newFriendWebId, friends: [] })
    }

    if (userWebId === newFriendWebId)
      return res.status(400).json({ success: false, error: { message: 'Cannot add yourself as friend' } })

    if (friend.friends.includes(user.id))
      return res.status(200).json({ success: true, data: { message: 'Already friends' } })

    console.log(friend.id)
    const updatedFriend = friend
    updatedFriend.friends = [...friend.friends, user._id]
    console.log(updatedFriend)
    UserModel.findByIdAndUpdate(friend.id, updatedFriend).catch(err => console.log(err))

    return res.status(200).json({ success: true, data: { message: 'Added new friend' } })
  } catch(err) {
    console.log(err)
    return res.status(500).json({ success: false, error: err })
  }
}

export { getFriends, addFriend }