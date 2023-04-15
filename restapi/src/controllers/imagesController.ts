import { NextFunction, Request, Response } from "express";
import { IRestApiResponse } from "../types/IRestApiResponse";
import HttpException from "../util/HttpException";
import { existsSync, readFile, readFileSync } from "fs";
import { imgUploadPath } from "../constants";
import { join } from "path";

export const postImage = (req: Request, res: Response<IRestApiResponse>, next: NextFunction) => {
  if (!req.file) {
    next(new HttpException(400, 'Image missing'))
  } else {
    res.status(200).json({ success: true, data: { filename: req.file.filename } })
  }
}

export const getImage = (req: Request, res: Response<IRestApiResponse>, next: NextFunction) => {
  let filename = req.params.filename
  const path = join(imgUploadPath, filename)
  if (existsSync(path)) {
    readFile(path, (err, img) => {
      if (err) {
        next(new HttpException(500, 'Error while retrieving image'))
      } else
        try {
          res.end(img)
        } catch(err) {
          next(new HttpException(500, 'Error while retrieving image'))
        }
    })
  } else {
    next(new HttpException(404, 'Image not found'))
  }
}