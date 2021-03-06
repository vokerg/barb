import React from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

const BookingFilter = ({
  statusFilter, timeFilter, changeStatusFilter, changeTimeFilter, classes, statusList, timesList
}) => {
  return (
    <React.Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="status-helper">Status</InputLabel>
        <Select
          input={<Input name="Status" id="status-helper" />}
          value={statusFilter}
          onChange={changeStatusFilter}
          displayEmpty
          name="statusFilter"
        >
        {statusList.map(status =>
          <MenuItem key={status} value={status}>{status}</MenuItem>
        )}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="time-helper">Time</InputLabel>
        <Select
          input={<Input name="Status" id="time-helper" />}
          value={timeFilter}
          onChange={changeTimeFilter}
          displayEmpty
          name="timeFilter"
        >
          {timesList.map(time =>
            <MenuItem key={time} value={time}>{time}</MenuItem>
          )}
        </Select>
      </FormControl>
    </React.Fragment>
  )
}

export default withStyles(styles)(BookingFilter)
