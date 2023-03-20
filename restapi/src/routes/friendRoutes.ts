import { Router } from 'express'
import { addFriend, getFriends } from '../controllers/friendsController'
import { isAuthorized } from '../middlewares/isAuthorized'

const router = Router()

router.get("/getFriends", isAuthorized, getFriends)

router.post("/addFriend", isAuthorized, addFriend)

export default router