import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import fetch from 'node-fetch'

const clients = new Map()

export const wrapPageElement = ({ element, pathname }) => {
  const client = new ApolloClient({
    ssrMode: true,
    fetch,
    uri: 'http://localhost:4000/graphql',
  })
  clients.set(pathname, client)

  // Schema is not passed down by Gatsby
  // Due to usage of `jest-worker`, I think arguments should be serializable
  // So the builded schema could not pass here
  // import { ApolloClient } from 'apollo-client'
  // client = new ApolloClient({
  //   ssrMode: true,
  //   // Instead of "createHttpLink" use SchemaLink here
  //   link: new SchemaLink({ schema }),
  //   cache: new InMemoryCache(),
  // });

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}

export const replaceRenderer = async ({ bodyComponent }) => {
  await getDataFromTree(bodyComponent)
}

export const onPreRenderHTML = ({ pathname, setRenderData, getRenderData }) => {
  const client = clients.get(pathname)
  if (!client) {
    return
  }

  const initialState = client.extract()

  setRenderData({
    ...getRenderData(),
    __APOLLO_STATE__: initialState,
  })
}
