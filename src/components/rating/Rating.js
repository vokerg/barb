import React from 'react'

const Rating = (props) => {
  const { rating } = props;
  return (
    <div>
      <div>
        <span>Author: { rating.author }</span>
        <span> Rating: { rating.rating }</span>
      </div>
      <div>
        <span>Comment: { rating.comment }</span>
      </div>
    </div>
  )
}

export default Rating
