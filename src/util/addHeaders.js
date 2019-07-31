export default function addHeaders(handler) {
  return function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept',
    )
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, DELETE, OPTIONS',
    )
    res.setHeader('Access-Control-Max-Age', '86400')
    return handler(req, res)
  }
}
