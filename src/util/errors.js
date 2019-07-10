export function throwUnauthorizedError () {
  throw new Error('Unauthorized')
}

export function throwInvalidLoginError () {
  throw new Error('Invalid Email or Username')
}

export function throwMissingError (item) {
  throw new Error(`Invalid ${item}`)
}
