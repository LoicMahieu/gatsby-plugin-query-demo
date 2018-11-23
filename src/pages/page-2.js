import React from 'react'
import { Link, graphql } from 'gatsby'

const SecondPage = ({ data }) => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <a href="/">Go back to the homepage</a>
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
  }
`

export default SecondPage
