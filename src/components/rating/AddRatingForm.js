import React from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const AddRatingForm = (props) => {
  return (
    <div>
      <div>
        <TextField hintText="Name" ref={props.nameRef}/>
        <SelectField floatingLabelText="Rating" ref={props.ratingRef}>
          <MenuItem value={5} primaryText="Awesome" />
          <MenuItem value={4} primaryText="Good" />
          <MenuItem value={3} primaryText="Ok" />
          <MenuItem value={2} primaryText="Bad" />
          <MenuItem value={1} primaryText="Terrible" />
        </SelectField>
      </div>
      <div>
        <TextField hintText="Comment" multiLine={true} ref={props.commentRef}/>
      </div>
    </div>
  )
}

export default AddRatingForm
