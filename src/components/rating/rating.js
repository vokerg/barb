import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/starRating'
import RatingScore from './ratingScore'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  date: {
    fontSize: 12,
  },
  mainTable: {
    display: 'table',
    tablelayout: 'fixed',
    width: '100%'
  },
  childTable: {
    display: 'table-cell'
  }
})

const Rating = props => {
  const { id, shopId, rating, comment, author, userId, date, score } = props.rating
  const { classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent class={classes.content}>
          <div className={classes.mainTable}>
            <div className={classes.childTable}>
              <Typography gutterBottom variant="subheading">
                {userId ?
                  <Link to={`/users/${userId}`} style={{textDecoration: 'none', color: 'inherit'}}>{ author }</Link>
                  : author
                }
              </Typography>
              <Typography component="p" className={classes.date} color="textSecondary">
                { date && `posted on ${date}` }
              </Typography>
              <StarRating selected={rating} total={5} />
            </div>
            <div className={classes.childTable}>
              <RatingScore id={id} shopId={shopId} score={score} userId={userId}/>
            </div>
          </div>
          <Typography component="p">
            { comment }
          </Typography>
        </CardContent>
      </Card>
      <br/>
    </div>
  )
}

export default withStyles(styles)(Rating)
