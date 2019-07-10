import { pipeResolvers } from 'graphql-resolvers'
import authResolver from '../auth/authResolver'
import { createSignedToken, removeToken } from '../auth/token'
import User from '../database/models/User'
import { sendLoginEmail, sendRegistrationEmail } from '../util/mail'
import { throwInvalidLoginError } from '../util/errors'

export default {
  Query: {
    getCurrentUser: pipeResolvers(authResolver, ({ user }) => {
      return user
    }),
    async getUser (_, { username }) {
      const user = User.findOne({ username })
      delete user.email
      return user
    }
  },
  User: {},
  Mutation: {
    editUser: pipeResolvers(authResolver, async ({ user }, params) => {
      await user.update(params)
      return { ...user, ...params }
    }),
    async login (_, { email, username }) {
      const user = await User.findOne({
        where: { email: email.toLowerCase().trim() }
      })
      if (!user) {
        throwInvalidLoginError()
      }
      const token = await createSignedToken(user)
      await sendLoginEmail(email, token)
      return true
    },
    logout: pipeResolvers(authResolver, ({ token }) => {
      try {
        removeToken(token)
        return true
      } catch (e) {
        return false
      }
    }),
    async register (_, { email, username }) {
      try {
        const user = await User.create({
          email: email.toLowerCase().trim(),
          username: username.toLowerCase().trim()
        })
        const token = await createSignedToken(user)
        await sendRegistrationEmail(email, username, token)
        return true
      } catch (e) {
        console.log(e)
        throw new Error('User already exists')
      }
    }
  }
}
