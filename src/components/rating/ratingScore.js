import React from 'react'
import ThumbUp from 'material-ui-icons/ThumbUp'
import ThumbDown from 'material-ui-icons/ThumbDown'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'

import { addRatingScore } from '../../actions'
import { getUserId } from '../../reducers'

const RatingScore = ({id, shopId, score, addRatingScore, userId, currentUserId}) => {
  return (
    (currentUserId !== userId) ?
    <div>
      <IconButton onClick = {() => addRatingScore(shopId, id, 'positive')} >
        <ThumbUp/>
      </IconButton>
      <span>{score}</span>
      <IconButton onClick = {() => addRatingScore(shopId, id, 'negative')} >
        <ThumbDown/>
      </IconButton>
    </div>
    : null
  )
}

const mapStateToProps = state => ({
  currentUserId: getUserId(state)
})

const mapDispatchToProps = dispatch => ({
  addRatingScore: (id, shopId, direction) => dispatch(addRatingScore(id, shopId, direction))
})

export default connect(mapStateToProps, mapDispatchToProps)(RatingScore)
