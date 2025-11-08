const { gql } = require('apollo-server');

const typeDefs = gql`
  """Representa a un usuario dentro del sistema"""
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    """Obtiene la lista de todos los usuarios"""
    getAllUsers: [User]

    """Obtiene un usuario por su id"""
    getUserById(id: ID!): User
  }

  type Mutation {
    """Crea un nuevo usuario"""
    createUser(name: String!, email: String!, age: Int): User
  }
`;

module.exports = typeDefs;