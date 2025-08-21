import { Request, Response } from 'express'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendresponse'
import { DivisionService } from './division.service'

const createDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.createDivision(req.body)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Division created Successfully',
    data: result,
  })
})

const getAllDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getAllDivision()

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'All divisions fetched Successfully',
    data: result.data,
    meta: result.meta,
  })
})

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.getSingleDivision(req.params.slug)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Single division fetched Successfully',
    data: result.data,
  })
})

const updateDivision = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await DivisionService.updateDivision(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Division updated',
    data: result,
  })
})

const deleteDivision = catchAsync(async (req: Request, res: Response) => {
  const result = await DivisionService.deleteDivision(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Division deleted',
    data: result,
  })
})

export const DivisionController = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
}
