/* eslint-disable @typescript-eslint/no-unused-vars */
import { catchAsync } from '../../utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import { sendResponse } from '../../utils/sendresponse'
import { AuthServices } from './auth.service'

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const LoginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User Login success',
      data: LoginInfo,
    })
  }
)

export const AuthController = {
  credentialsLogin,
}
