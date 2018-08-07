import React from 'react'
import { Link } from 'react-router-dom'

const ShopServiceList = ({ services }) => {
  return (
    <div>
      {
        services.map(service =>
          <Link key={service} to={`/service/${service}`}> { `${service} `}</Link>)
      }
    </div>
  )
}

export default ShopServiceList
