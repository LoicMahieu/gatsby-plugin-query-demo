import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import fetch from 'node-fetch'

const clients = new Map()

export const wrapRootElement = ({ element, pathname }) => {
  const client = new ApolloClient({
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

export const onPreRenderHTML = ({
  pathname,
  getPostBodyComponents,
  replacePostBodyComponents,
}) => {
  const client = clients.get(pathname)
  if (!client) {
    return
  }

  const initialState = client.extract()

  const initialStateScript = (
    <script
      key={`apollo-initial-state`}
      id={`gatsby-plugin-query`}
      dangerouslySetInnerHTML={{
        __html: `/*<![CDATA[*/window.__APOLLO_STATE__=${JSON.stringify(
          initialState
        )};/*]]>*/`,
      }}
    />
  )

  replacePostBodyComponents([...getPostBodyComponents(), initialStateScript])
}