import React from 'react'

import DatePicker from 'material-ui/DatePicker'
import Card from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const BookingView = (
  {selectedService, services, onSubmit, onDateChange, onServiceChange, onCommentChange}
) => {
  return (
    <Card className="container">
      <h2 className="card-heading">Book time</h2>
      <form onSubmit = {onSubmit}>
        <div className="field-line">
          <DatePicker
            hintText="Select date"
            disableYearSelection={true}
            onChange={onDateChange}
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
            hintText="Comments"
            multiLine={true}
            rows={2}
            rowsMax={4}
          />
        </div>
        <div className="field-line">
          <FlatButton label="Submit" type="Submit" />
        </div>
      </form>
    </Card>
  )
}

export default BookingView
