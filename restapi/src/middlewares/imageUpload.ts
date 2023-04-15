import { extname } from 'path'
import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { v4 as uuid } from 'uuid'

import HttpException from '../util/HttpException';
import { imgUploadPath } from '../constants';

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (!existsSync(imgUploadPath))
        mkdirSync(imgUploadPath, { recursive: true, mode: 0o766 })

      cb(null, imgUploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, uuid() + extname(file.originalname));
    },
  }),
  fileFilter: (req, file, callback) => {
    const array_of_allowed_files = ['png', 'jpeg', 'jpg'];
    const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg'];
    // Allowed file size in mb
    const allowed_file_size = 2;
    // Get the extension of the uploaded file
    const file_extension = file.originalname.slice(
        ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
    );

    // Check if the uploaded file is allowed
    if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(file.mimetype)) {
      callback(new HttpException(400, 'Invalid file type'))
    } else if ((file.size / (1024 * 1024)) > allowed_file_size) {
      callback(new HttpException(400, 'File too big'))
    } else
      callback(null, true);
  },
});

export default upload;