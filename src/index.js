import dispatch from 'micro-route/dispatch'
import { send } from 'micro'
import { ApolloServer } from 'apollo-server-micro'
import database from './database'
import { typeDefs, resolvers } from './graphql/schema'

const graphqlPath = '/'

function optionsHandler (req, res) {
  send(res, 200, '')
}

function authenticatedGraphql (req, res) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    debug: process.env.NODE_ENV !== 'production',
  }).createHandler({ path: graphqlPath })

  return apolloServer(req, res)
}

/*
 * Initializing this here without awaiting
 * means that there may be some weird race conditions on startup
 * TODO: Find a solution to this problem
 */
database()

export default function (req, res) {
  dispatch()
    .dispatch('*', 'OPTIONS', optionsHandler)
    .dispatch(graphqlPath, ['POST', 'GET'], authenticatedGraphql)
    .dispatch('/healthcheck', ['GET'], (req, res) => send(res, 200, 'Healthy'))
    .otherwise((req, res) => send(res, 404, 'not found'))(req, res)
}
