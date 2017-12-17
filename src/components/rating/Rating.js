import React from 'react'

const Rating = (props) => {
  const { rating } = props;
  return (
    <div>
      <p>{ rating.comment }</p>
      <p><small className="text-muted">Rating: { rating.rating } </small></p>
      <p><small className="text-muted">Posted by { rating.author }</small></p>
      <hr />
    </div>
  )
}

export default Rating
