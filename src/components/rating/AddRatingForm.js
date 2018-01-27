import React from 'react'
import TextField from 'material-ui/TextField'

const AddRatingForm = (props) => {
  return (
    <div>
      <div>
        <TextField hintText="Name" ref={props.nameRef}/>
        <TextField hintText="Rating" ref={props.ratingRef}/>
      </div>
      <div>
        <TextField hintText="Comment" multiLine={true} ref={props.commentRef}/>
      </div>
    </div>
  )
}

export default AddRatingForm
