import React from 'react'

import Card from '@material-ui/core/Card'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FlatButton from 'material-ui/FlatButton'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { DateTimePicker } from 'material-ui-pickers'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
  },
})

const BookingView = (
  {classes, date, onDateChange, selectedService, services, onSubmit, onChange}
) => {
  return (
    <Card className={classes.container}>
      <form onSubmit = {onSubmit}>
        <div>
          <FormControl className={classes.formControl}>
            <DateTimePicker
              value={date}
              onChange={onDateChange}
              label="Booking date"
              clearable
            />
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="service-helper">Service</InputLabel>
            <Select
              input={<Input name="service" id="service-helper" />}
              value={selectedService}
              onChange={onChange}
              displayEmpty
              name="selectedService"
            >
              {services.map((service, key) =>
                <MenuItem key={key} value={service}>{service}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl className={classes.formControl}>
            <TextField
              onChange={onChange}
              label="Comments"
              placeholder="Add your notes here"
              multiline
              rows={10}
              rowsMax={4}
              name="comment"
            />
          </FormControl>
        </div>
        <div>
          <FlatButton label="Submit" type="Submit" />
        </div>
      </form>
    </Card>
  )
}

export default withStyles(styles)(BookingView)
