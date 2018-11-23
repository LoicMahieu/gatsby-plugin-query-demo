const { ApolloServer, gql } = require('apollo-server')

exports.onPostBootstrap = async ({ store }) => {
  const { schema } = store.getState()

  if (process.env.NODE_ENV === 'production') {
    const port = 4000
    const server = new ApolloServer({ schema })

    await server.listen({ port }).then(({ url }) => {
      console.log('')
      console.log(`🚀  GraphQL Server listen at ${url}graphql`)
    })
  }
}
