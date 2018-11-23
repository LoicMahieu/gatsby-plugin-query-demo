import React from 'react'
import { Link } from 'gatsby'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import ProductList from '../components/ProductList'

console.log(Query)

const GET_SITE_PAGES = gql`
  {
    allSitePage {
      edges {
        node {
          id
        }
      }
    }
  }
`

const GetSitePages = () => (
  <Query query={GET_SITE_PAGES}>
    {({ loading, error, data }) => {
      if (loading) return <div>Loading...</div>
      if (error) return <div>Error :(</div>

      return <pre>{JSON.stringify(data, null, 2)}</pre>
    }}
  </Query>
)

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/page-3/">Go to page 3</Link>

    <GetSitePages />

    <ProductList />
  </div>
)

export default IndexPage
