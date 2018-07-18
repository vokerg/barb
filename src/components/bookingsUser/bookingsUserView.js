import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275,
    border: '4px',
    margin: '15px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const getFormattedDate = date => {
  const d = new Date(date),
    minutes = d.getMinutes().toString().length === 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length === 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

const BookingsUserView = ({bookings, classes, cancelBooking}) => {
  return(
    <React.Fragment>
      {bookings.map((booking, key) =>
        <Card className={classes.card} key={key}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {booking.status}
            </Typography>
            <Typography variant="headline" component="h2">
              {booking.shopname}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {booking.service}
            </Typography>
            <Typography component="p">
              {getFormattedDate(booking.date)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Show more</Button>
            <Button size="small">Change</Button>
            <Button size="small" onClick = {cancelBooking(booking.id)}>Cancel</Button>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  )
}

export default withStyles(styles)(BookingsUserView);
