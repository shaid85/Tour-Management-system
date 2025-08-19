import { Router } from 'express'
import { userRoutes } from '../modules/user/user.route'
import { AuthRouters } from '../modules/auth/auth.route'
import { divisionRoutes } from '../modules/division/division.route'
import { tourRoutes } from '../modules/tour/tour.route'

export const router = Router()

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/division',
    route: divisionRoutes,
  },
  {
    path: '/tour',
    route: tourRoutes,
  },
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route)
})
