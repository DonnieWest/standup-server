/* eslint-disable */

// needed to prevent the mail module from actually sending emails
jest.mock('../src/util/mail')

import userResolver from '../src/users/userResolver'
import database from '../src/database'
import User from '../src/database/models/User'
import mail from '../src/util/mail'

/* eslint-enable */

let connection
beforeAll(async () => {
  connection = await database()
})

const user = {
  email: 'test@test.com',
  username: 'test',
}

test('UserResolver can create a user', async () => {
  const done = await userResolver.Mutation.register(null, user)
  expect(done).toBe(true)
})

test('UserResolver should send an email when it creates a user', async () => {
  await userResolver.Mutation.register(null, user)
  expect(mail.sendRegistrationEmail).toHaveBeenCalled()
})

test('UserResolver should send an email when it logs in a user', async () => {
  await userResolver.Mutation.register(null, user)
  await userResolver.Mutation.login(null, user)
  expect(mail.sendLoginEmail).toHaveBeenCalled()
})

afterEach(async () => {
  try {
    await User.destroy({
      where: {
        username: user.username,
      },
    })
  } catch (e) {
    // ignore error
  }
})

afterAll(() => {
  connection.close()
})
