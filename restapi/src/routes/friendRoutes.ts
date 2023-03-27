import { Router } from 'express'
import { addFriend, getFriends } from '../controllers/friendsController'
import { isAuthorized } from '../middlewares/isAuthorized'

const router = Router()

router.get("/all", isAuthorized, getFriends)

router.post("/new", isAuthorized, addFriend)

export default router