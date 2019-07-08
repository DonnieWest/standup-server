import { send } from 'micro'
import database from './database'

/*
 * Initializing this here without awaiting
 * means that there may be some weird race conditions on startup
 * TODO: Find a solution to this problem
 */
database()

export default function (req, res) {
  return send(res, 200, 'SUCCESS')
}
