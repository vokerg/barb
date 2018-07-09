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
});

const BookingFilter = ({statusFilter, timeFilter, changeStatusFilter, changeTimeFilter, classes}) => {
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="status-helper">Status</InputLabel>
        <Select
          input={<Input name="Status" id="status-helper" />}
          value={statusFilter}
          onChange={changeStatusFilter}
          displayEmpty
          name="statusFilter"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Unprocessed">Unprocessed</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
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
          <MenuItem value="Future">Future</MenuItem>
          <MenuItem value="Past">Past</MenuItem>
          <MenuItem value="All">All</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(BookingFilter)
