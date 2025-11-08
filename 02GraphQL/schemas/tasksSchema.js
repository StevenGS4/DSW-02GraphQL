// schemas/tasksSchema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    completed: Boolean!
  }

  type Query {
    getAllTasks: [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    createTask(name: String!): Task
    updateTask(id: ID!, name: String!): Task
    deleteTask(id: ID!): Boolean
    completeTask(id: ID!): Task
  }
`;

module.exports = typeDefs;
