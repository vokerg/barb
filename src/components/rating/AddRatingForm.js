import React from 'react'
import TextField from 'material-ui/TextField'

const AddRatingForm = ({name, comment, rating, onChangeName, onChangeRating, onChangeComment}) => {
  return (
    <div>
      <div>
        <TextField hintText="Name" value={name} onChange={onChangeName}/>
        <TextField hintText="Rating" value={rating} onChange={onChangeRating}/>
      </div>
      <div>
        <TextField hintText="Comment" multiLine={true} value={comment} onChange={onChangeComment}/>
      </div>
    </div>
  )
}

export default AddRatingForm
