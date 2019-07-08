import test from 'ava'
import handler from '../src/index.js'
import fetch from 'node-fetch'
import micro from 'micro'

const getUrl = fn => {
  const srv = micro(fn)
  return new Promise((resolve, reject) => {
    srv.listen(err => {
      if (err) {
        reject(err)
      }

      const { port } = srv.address()

      resolve(`http://localhost:${port}`)
    })
  })
}

test('Healthcheck: returns SUCCESS', async t => {
  const url = await getUrl(handler)
  const res = await (await fetch(url)).text()

  t.deepEqual(res, 'SUCCESS')
})
