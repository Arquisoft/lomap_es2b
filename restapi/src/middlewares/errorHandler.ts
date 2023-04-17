import { NextFunction, Request, Response } from "express";
import HttpException from "../util/HttpException";
import { IRestApiResponse } from "../types/IRestApiResponse";

function errorMiddleware(error: HttpException, req: Request, res: Response<IRestApiResponse>, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'Something went wrong'
  res.status(status).json({ success: false, error: { message } })
}

export default errorMiddleware