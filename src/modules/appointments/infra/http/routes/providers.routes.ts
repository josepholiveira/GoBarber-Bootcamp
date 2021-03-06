import { Router, request, response } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'


import ensureAuthenticated from '@modules/users/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'

const providersRouter = Router()

const providersController = new ProvidersController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()


providersRouter.use(ensureAuthenticated)

providersRouter.get('/:provider_id/month-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}),  providerMonthAvailabilityController.index)

providersRouter.get('/:provider_id/day-availability', celebrate({
    [Segments.PARAMS]: {
        provider_id: Joi.string().uuid().required()
    }
}), providerDayAvailabilityController.index)

//appointmentsRouter.get('/', async (request, response )=> {
//    console.log(request.user)
//    const appointments = await appointmentsRepository.find() //função do type orm, retornando todos os dados
//    return response.json({appointments})
//})

providersRouter.get('/', providersController.index)



export default providersRouter
