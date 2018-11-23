import React from 'react'
import { Link } from 'gatsby'
import ProductList from '../components/ProductList'

const SecondPage = ({ data }) => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 3</p>
    <Link to="/">Go back to the homepage</Link>

    <ProductList />
  </div>
)

export default SecondPage
