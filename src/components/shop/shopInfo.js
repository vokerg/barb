import React from 'react'

const ShopInfo = ({ shop }) => {
  return (
    <div>
      <h3 className="card-title">{ shop.name }</h3>
      <h4>{ shop.address }</h4>
      <p className="card-text">{ shop.description }</p>
    </div>
  )
}

export default ShopInfo
