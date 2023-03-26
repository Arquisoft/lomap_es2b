import mongoose from 'mongoose'
import app from '../src/server'

beforeEach(async () => {
    await mongoose.connect()
})