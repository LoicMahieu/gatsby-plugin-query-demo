import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'

class ErrorLink extends ApolloLink {
  request() {
    return new Observable(observer => {
      observer.error(new Error('Could not execute query in runtime!'))
    })
  }
}

const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  link:
    process.env.NODE_ENV === 'production'
      ? new ErrorLink()
      : new HttpLink({
          uri: 'http://localhost:8000/___graphql',
        }),
})

export const wrapPageElement = ({ element, props }) => {
  const { __APOLLO_STATE__ } =
    (props.pageResources.json && props.pageResources.json.render) || {}
  if (__APOLLO_STATE__) {
    cache.restore(__APOLLO_STATE__)
  }
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
