import handler from '../src/index.js'
import fetch from 'node-fetch'
import micro from 'micro'
import graphqlRequest from './helpers/graphql'

const activeConnections = []

function getUrl(fn) {
  const srv = micro(fn)
  return new Promise((resolve, reject) => {
    srv.listen(err => {
      if (err) {
        reject(err)
      }

      activeConnections.push(srv)

      const { port } = srv.address()

      resolve(`http://localhost:${port}`)
    })
  })
}

async function getEndpoint(endpoint = '') {
  const url = await getUrl(handler)
  return `${url}${endpoint}`
}

test('Healthcheck: returns Healthy', async () => {
  const healthCheckUrl = await getEndpoint('/healthcheck')

  const res = await (await fetch(healthCheckUrl)).text()

  expect(res).toBe('Healthy')
})

test('GraphQL Healthcheck Query: returns true', async () => {
  const url = await getUrl(handler)
  const query = `
    query {
      healthCheck
    }
  `

  const res = await graphqlRequest(url, query)

  expect(res.errors && res.errors.length > 0).toBeFalsy()
  expect(res.data.healthCheck).toBe(true)
})

test('GraphQL Healthcheck Mutation: returns true', async () => {
  const url = await getUrl(handler)
  const query = `
    mutation {
      healthCheck
    }
  `

  const res = await graphqlRequest(url, query)

  expect(res.errors && res.errors.length > 0).toBeFalsy()
  expect(res.data.healthCheck).toBe(true)
})

afterEach(async () => {
  await Promise.all(activeConnections.map(srv => srv.close()))
})
