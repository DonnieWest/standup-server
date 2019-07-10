import { gql } from 'apollo-server-micro'
import { GraphQLDateTime, GraphQLTime, GraphQLDate } from 'graphql-iso-date'

const TypeResolvers = {
  DateTime: GraphQLDateTime,
  Time: GraphQLTime,
  Date: GraphQLDate
}

const ScalarSchema = gql`
  scalar DateTime
  scalar Date
  scalar Time
`

const RootQuery = gql`
  type Query {
    healthCheck: Boolean!
  }

  type Mutation {
    healthCheck: Boolean!
  }
`

const RootResolver = {
  Query: {
    healthCheck () {
      return true
    }
  },
  Mutation: {
    healthCheck () {
      return true
    }
  }
}

export const typeDefs = [RootQuery, ScalarSchema]

export const resolvers = [RootResolver, TypeResolvers]
