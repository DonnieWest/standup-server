import { send } from 'micro'

export default function (req, res) {
  return send(res, 200, 'SUCCESS')
}
