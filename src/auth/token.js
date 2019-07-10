import jwt from 'jsonwebtoken'
import fs from 'fs'
import Token from '../database/models/Token'
import User from '../database/models/User'

const key = fs.readFileSync('./keys/jwtRS256.key')
const pub = fs.readFileSync('./keys/jwtRS256.key.pub')

export async function verifyToken (unverifiedToken) {
  try {
    const authenticationToken = unverifiedToken.startsWith('Bearer')
      ? unverifiedToken.slice(7)
      : unverifiedToken
    const decoded = jwt.verify(authenticationToken, pub)
    if (!decoded) {
      return false
    }
    const verifiedToken = await Token.findByPk(decoded.id)
    if (!verifiedToken) {
      return false
    }
    const verifiedUser = await User.findByPk(verifiedToken.UserId)
    if (!verifiedUser) {
      return false
    }
    return verifiedUser
  } catch (e) {
    return false
  }
}

export async function createSignedToken (user) {
  const tokenForUser = await Token.create()
  await tokenForUser.setUser(user.id)
  await tokenForUser.save()
  return jwt.sign(tokenForUser.dataValues, key, {
    algorithm: 'RS256'
  })
}

export async function removeToken (unverifiedToken) {
  try {
    const authenticationToken = unverifiedToken.startsWith('Bearer')
      ? unverifiedToken.slice(7)
      : unverifiedToken
    const decoded = jwt.verify(authenticationToken, pub)
    if (!decoded) {
      return false
    }
    const verifiedToken = await Token.findByPk(decoded.id)
    if (!verifiedToken) {
      return false
    }
    await verifiedToken.destroy()
    return true
  } catch (e) {
    return false
  }
}
