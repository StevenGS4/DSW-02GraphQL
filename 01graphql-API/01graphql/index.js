const { ApolloServer } = require('apollo-server');
const typeDefs = require('./Schemas/userSchemas');
const resolvers = require('./Controllers/userController');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});