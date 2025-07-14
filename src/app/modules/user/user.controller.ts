/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status-codes'
import { UserServices } from './user.service'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendresponse'
import { verifyToken } from '../../utils/jwt'
import { envVars } from '../../config/env'
import { JwtPayload } from 'jsonwebtoken'

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

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(
    //   token as string,
    //   envVers.JWT_ACCESS_SECRET
    // ) as JwtPayload
    const verifiedToken = req.user
    const payload = req.body
    const user = await UserServices.updateUser(
      userId,
      payload,
      verifiedToken as JwtPayload
    )

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: 'User Updated Successfully',
      data: user,
    })
  }
)

export const userController = {
  createUser,
  getAllUsers,
  updateUser,
}
