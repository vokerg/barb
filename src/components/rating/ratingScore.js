import React from 'react'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'

import { addRatingScore } from '../../actions'

const RatingScore = ({id, shopId, score, addRatingScore}) => {
  return (
    <div>
      <IconButton onClick = {() => addRatingScore(shopId, id, 'positive')} >
        <ThumbUp/>
      </IconButton>
      <span>{score}</span>
      <IconButton onClick = {() => addRatingScore(shopId, id, 'negative')} >
        <ThumbDown/>
      </IconButton>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addRatingScore: (id, shopId, direction) => dispatch(addRatingScore(id, shopId, direction))
})

export default connect(() => ({}), mapDispatchToProps)(RatingScore)
