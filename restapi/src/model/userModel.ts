import { Schema, model, Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  webId: string
  friends: Types.ObjectId[]
}

const UserModel = new Schema({
  webId: { type: String, required: true, unique: true },
  friends: [{ type: Types.ObjectId, default: [] }],
})

export default model<User>('users', UserModel)