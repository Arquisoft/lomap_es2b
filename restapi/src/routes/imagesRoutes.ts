import { Router } from 'express'

import { postImage, getImage } from '../controllers/imagesController'
import upload from '../middlewares/imageUpload'

const router = Router()

router.get('/get/:filename', getImage)
router.post('/upload', upload.single('image'), postImage)

export default router