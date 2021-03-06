import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersServices from './ListProvidersServices'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

    let fakeUsersRepository: FakeUsersRepository
    let listProvider: ListProvidersServices
    let fakeCacheProvider: FakeCacheProvider

describe('ListProviders', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        listProvider = new ListProvidersServices(fakeUsersRepository, fakeCacheProvider)
    })

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johntre@gmail.com',
            password: '123456'
        })


        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@gmail.com',
            password: '123456'
        })

        const providers = await listProvider.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([user1, user2])

    })
})
