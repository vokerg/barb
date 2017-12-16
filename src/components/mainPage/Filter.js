import React from 'react'
import { Link } from 'react-router-dom'

const Filter = () => {
  return (
    <div>
      <span><h5>
        <Link to="/">
          All
        </Link>
        {"    "}
        <Link to="/filter/favorites">
          Favorites
        </Link>
      </h5></span>
    </div>
  )
}

export default Filter
