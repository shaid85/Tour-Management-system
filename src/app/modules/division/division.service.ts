import { IDivision } from './division.interface'
import { DivisionModel } from './division.model'

const createDivision = async (payload: IDivision) => {
  const baseSlug = payload.name.toLowerCase().split(' ').join('-')
  let slug = `${baseSlug}-division}`

  let counter = 0
  while (await DivisionModel.exists({ slug })) {
    slug = `${slug}-${counter++}`
  }

  payload.slug = slug

  const existingDivision = await DivisionModel.findOne({ name: payload.name })
  if (existingDivision) {
    throw new Error('Division already exists')
  }
  const division = await DivisionModel.create(payload)
  return division
}

const getAllDivision = async () => {
  const divisions = await DivisionModel.find()
  const totalDivision = await DivisionModel.countDocuments()

  return {
    data: divisions,
    meta: {
      total: totalDivision,
    },
  }
}
const getSingleDivision = async (slug: string) => {
  const division = await DivisionModel.findOne({ slug })
  return {
    data: division,
  }
}

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const existingDivision = await DivisionModel.findById(id)
  if (!existingDivision) {
    throw new Error('Division not found')
  }

  const duplicateDivision = await DivisionModel.findOne({
    name: payload.name,
    _id: { $ne: id },
  })

  if (duplicateDivision) {
    throw new Error('Division name already exists')
  }
  const updatedDivision = await DivisionModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return updatedDivision
}

const deleteDivision = async (id: string) => {
  await DivisionModel.findByIdAndDelete(id)
  return null
}

export const DivisionService = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
}
