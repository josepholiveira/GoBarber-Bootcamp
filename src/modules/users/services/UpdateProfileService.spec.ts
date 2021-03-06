import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

    let fakeUsersRepository: FakeUsersRepository
    let fakeHashProvider: FakeHashProvider
    let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com'
        })

        expect(updatedUser.name).toBe('John Tre')
        expect(updatedUser.email).toBe('johntre@gmail.com')
    })

    it('should not be able to change to another user email ', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({ //tentativa de alterar para um email q ja existe
            user_id: user.id,
            name: 'John Tre',
            email: 'john@gmail.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to update the password ', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            old_password: '123456',
            password: '123123'
        })

        expect(updatedUser.password).toBe('123123')
    })

    it('should not be able to update the password without old password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            password: '123123'
        })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the password with wrong old password ', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john@gmail.com',
            password: '123456'
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John Tre',
            email: 'johntre@gmail.com',
            old_password: 'wrong-old_password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to update the password if user not exists ', async () => {

        await expect(updateProfile.execute({
            user_id: 'non-existing',
            name: 'John Tre',
            email: 'johntre@gmail.com',
            old_password: '123456',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)
    })


})
