import { gql } from 'apollo-server-micro'

export default gql`
  type User {
    id: ID!
    email: String
    lastName: String
    location: String
    bio: String
    username: String!
    timezone: String
  }

  extend type Query {
    getCurrentUser(token: String): User!
    getUser(username: String!): User!
  }

  extend type Mutation {
    editUser(
      lastName: String
      location: String
      bio: String
      timezone: String
    ): User!
    login(email: String!, username: String!): Boolean!
    logout(token: String): Boolean!
    register(email: String!, username: String!): Boolean!
  }
`
