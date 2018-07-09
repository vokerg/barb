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

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
})

const BookingView = (
  {classes, selectedService, services, onSubmit, onChange}
) => {
  return (
    <Card className="container">
      <h2 className="card-heading">Book time</h2>
      <form onSubmit = {onSubmit}>
        <div className="field-line">
          <TextField
            label="Select date"
            type="datetime-local"
            className={classes.dateTimePickup}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            name="date"
          />
        </div>
        <div className="field-line">
          <FormControl>
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
        <div className="field-line">
          <TextField
            onChange={onChange}
            label="Comments"
            placeholder="Add your notes here"
            multiline
            rows={10}
            rowsMax={4}
            name="comment"
          />
        </div>
        <div className="field-line">
        </div>
        <div className="field-line">
          <FlatButton label="Submit" type="Submit" />
        </div>
      </form>
    </Card>
  )
}

export default withStyles(styles)(BookingView)
