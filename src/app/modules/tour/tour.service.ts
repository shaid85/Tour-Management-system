import { QueryBuilder } from '../../utils/QueryBuilder'
import { tourSearchableFields } from './tour.constant'
import { ITour, ITourType } from './tour.interface'
import { TourModel, TourTypeModel } from './tour.model'

const createTour = async (payload: ITour) => {
  const existingTour = await TourModel.findOne({ title: payload.title })
  if (existingTour) {
    throw new Error('Tour already exists')
  }
  const tour = await TourModel.create(payload)
  return tour
}

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(TourModel.find(), query)

  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()

  // const meta = await queryBuilder.getMeta()

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ])

  return {
    data,
    meta,
  }
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await TourModel.findById(id)

  if (!existingTour) {
    throw new Error('Tour not found.')
  }

  const updatedTour = await TourModel.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updatedTour
}

const deleteTour = async (id: string) => {
  return await TourModel.findByIdAndDelete(id)
}

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourTypeModel.findOne({ name: payload.name })

  if (existingTourType) {
    throw new Error('Tour type already exists.')
  }

  return await TourTypeModel.create(payload)
}
const getAllTourTypes = async () => {
  return await TourTypeModel.find()
}
const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourTypeModel.findById(id)
  if (!existingTourType) {
    throw new Error('Tour type not found.')
  }

  const updatedTourType = await TourTypeModel.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return updatedTourType
}
const deleteTourType = async (id: string) => {
  const existingTourType = await TourTypeModel.findById(id)
  if (!existingTourType) {
    throw new Error('Tour type not found.')
  }

  return await TourTypeModel.findByIdAndDelete(id)
}

export const TourService = {
  createTour,
  createTourType,
  deleteTourType,
  updateTourType,
  getAllTourTypes,
  getAllTours,
  updateTour,
  deleteTour,
}
