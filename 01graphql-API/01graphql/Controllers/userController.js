
const { getAll, getById, create } = require('../Models/userModel');

const resolvers = {
  Query: {
    getAllUsers: () => getAll(),
    getUserById: (_, { id }) => getById(id),
  },
  Mutation: {
    createUser: (_, { name, email, age }) => create(name, email, age),
  },
};

module.exports = resolvers;