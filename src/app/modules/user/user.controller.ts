/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import { UserServices } from './user.service'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendresponse'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User created Successfully',
      data: user,
    })
  }
)

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers()

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: 'All Users Retrieved Successfully',
      data: result.users,
      meta: result.meta,
    })
  }
)

export const userController = {
  createUser,
  getAllUsers,
}
