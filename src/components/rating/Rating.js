import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/starRating'

const Rating = (props) => {
  const { rating, comment, author, userId, date } = props.rating
  return (
    <div>
      <div>
        <h4>
          <span>
            {
              (userId) ?
              <Link to={`/users/${userId}`} style={{textDecoration: 'none', color: 'inherit'}}>{ author }</Link>
              : <span>{ author }</span>
            }
          </span>
        </h4>
        {
            date ?
              <small className="text-muted">
                <span>posted on </span>
                <span>{date}</span>
              </small> : <small/>
        }
      </div>
      <div><StarRating selected={rating} total={5} /></div>
      <div>{ comment }</div>
      <hr />
    </div>
  )
}

export default Rating
