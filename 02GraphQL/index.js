// index.js
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schemas/tasksSchema');
const resolvers = require('./controllers/tasksController');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Servidor GraphQL ejecutándose en: ${url}`);
});

