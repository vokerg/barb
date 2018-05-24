import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';

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
  {classes, selectedService, services, onSubmit, onDateChange, onServiceChange, onCommentChange}
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
            //disableYearSelection={true}
            onChange={onDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="field-line">
          <SelectField
            floatingLabelText="Service"
            value={selectedService}
            onChange={onServiceChange}
          >
            {services.map((service, key) =>
              <MenuItem key={key} value={service} primaryText={service} />
            )}
          </SelectField>
        </div>
        <div className="field-line">
          <TextField
            onChange = {onCommentChange}
            label="Comments"
            placeholder="Add your notes here"
            multiline
            rows={10}
            rowsMax={4}
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
