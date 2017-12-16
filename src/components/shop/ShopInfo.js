import React from 'react'

const ShopInfo = (props) => {
  return (
    <div>
      <h2>{ props.name }</h2>
      <h3>{ props.address }</h3>
      <h4>{ props.description }</h4>
    </div>
  )
}

export default ShopInfo
