const { ApolloServer, gql } = require('apollo-server');

exports.onPostBootstrap = ({ store }) => {
  const { schema } = store.getState()
  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log('')
    console.log(`🚀  GraphQL Server listen at ${url}graphql`);
  });
}
