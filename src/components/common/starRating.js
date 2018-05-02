import React from 'react'
import Star from 'material-ui-icons/Star'
import StarBorder from 'material-ui-icons/StarBorder'
import StarHalf from 'material-ui-icons/StarHalf'

const StarRating = ({selected=1, total=5}) =>
    <div>
      {Array(total).fill(0).map((element, i) =>
          <span key={i}>
            {
              i+1 <= selected ? <Star /> : (i - selected < 0) ? <StarHalf /> : <StarBorder />
            }
          </span>
      )}
    </div>

export default StarRating
