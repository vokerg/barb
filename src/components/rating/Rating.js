import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/starRating'
import RatingScore from './ratingScore'

const Rating = (props) => {
  const { id, shopId, rating, comment, author, userId, date, score } = props.rating
  const mainTable = {
    'display': 'table',
    'tablelayout': 'fixed',
    'width': '100%'
  }

  const childTable = {
    'display': 'table-cell'
  }

  return (
    <div>
      <div style={mainTable}>
        <div style={childTable}>
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
        </div>
        <div style={childTable}><RatingScore id={id} shopId={shopId} score={score}/></div>
      </div>
      <div>{ comment }</div>
      <hr />
    </div>
  )
}

export default Rating
