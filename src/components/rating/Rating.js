import React from 'react'
import { Link } from 'react-router-dom'

const Rating = (props) => {
  const { rating, comment, author, userId } = props.rating
  return (
    <div>
      <p>{ comment }</p>
      <p><small className="text-muted">Rating: { rating } </small></p>
      <p><small className="text-muted">
        <span>Posted by </span>
        <span>
          {
            (userId) ?
            <Link to={`/users/${userId}`}>{ author }</Link>
            : <span>{ author }</span>
          }
        </span>
      </small></p>
      <hr />
    </div>
  )
}

export default Rating
