import React from 'react'
import { Link } from 'gatsby'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

console.log(Query)

const GET_PRODUCTS = gql`
  query ($productId: String) {
    allProductsJson (filter: { id: { eq: $productId } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`

class ProductList extends React.Component {
  state = {
    productId: null
  }

  componentDidMount () {
    this.setState({ productId: 'b465118f-fdf3-599f-b94a-3ac446e3636d' })
  }

  render () {
    return (
      <Query query={GET_PRODUCTS} variables={this.state}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error :( <pre>{JSON.stringify(error, null, 2)}</pre></div>

          return <pre>{JSON.stringify(data, null, 2)}</pre>
        }}
      </Query>
    )
  }
}

export default ProductList
