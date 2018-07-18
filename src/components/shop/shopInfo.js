import React from 'react'

const ShopInfo = (props) => {
  return (
    <div>
      <h3 className="card-title">{ props.name }</h3>
      <h4>{ props.address }</h4>
      <p className="card-text">{ props.description }</p>
    </div>
  )
}

export default ShopInfo
