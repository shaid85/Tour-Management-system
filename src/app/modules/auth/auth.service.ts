import AppError from '../../errorhelpers/AppError'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import httpStatus from 'http-status-codes'
import bcriptjs from 'bcryptjs'
import { generateToken } from '../../utils/jwt'
import { envVers } from '../../config/env'

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload

  const isUserExist = await User.findOne({ email })

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email does not exist')
  }

  const isPasswordMatch = await bcriptjs.compare(
    password as string,
    isUserExist.password as string
  )

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Wrong Password')
  }

  //   const { password, ...rest} = isUserExist
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  }

  const accessToken = generateToken(
    jwtPayload,
    envVers.JWT_ACCESS_SECRET,
    envVers.JWT_ACCESS_EXPIRES
  )

  return {
    // ...rest
    accessToken,
  }
}

export const AuthServices = {
  credentialsLogin,
}
