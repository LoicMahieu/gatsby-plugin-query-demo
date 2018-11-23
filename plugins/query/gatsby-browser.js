import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:8000/___graphql',
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)
