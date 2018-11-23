import React from 'react'
import { Link, graphql } from 'gatsby'

const SecondPage = ({ data }) => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
)

export const query = graphql`
  {
    allSitePage {
      edges {
        node {
          id
        }
      }
    }
    allProductsJson (filter: { title: { regex: "/bar/" } }) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

export default SecondPage
