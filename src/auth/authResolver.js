import { verifyToken } from './token'
import { throwUnauthorizedError } from '../util/errors'

export default async function authResolver(
  _,
  { token: pToken },
  { token: hToken },
) {
  const token = pToken || hToken
  if (token) {
    const user = await verifyToken(token)
    if (user) {
      return { user, token }
    }
  }
  throwUnauthorizedError()
}
