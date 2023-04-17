import { NextFunction, Request, Response } from "express";
import { IRestApiResponse } from "../types/IRestApiResponse";
import HttpException from "../util/HttpException";
import { existsSync, readFile } from "fs";
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
  res.sendFile(filename, { root: imgUploadPath }, (err) => {
    next(err)
  })
}