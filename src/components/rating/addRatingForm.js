import React from 'react'
import TextField from 'material-ui/TextField'

import Star from 'material-ui-icons/Star'
import StarBorder from 'material-ui-icons/StarBorder'

const AddRatingForm = ({name, comment, onChangeName, onChangeComment, isNameVisible, totalStars, selected, onRatingHover}) => {
  return (
    <div>
    {isNameVisible ?
      <div>
        <TextField hintText="Name" value={name} onChange={onChangeName}/>
      </div>
    :
      <div/>
    }
      <div>
        {Array(totalStars).fill(0).map((element, i) =>
            <span key={i} onMouseOver={() => onRatingHover(i+1)}>
              {
                i+1 <= selected ? <Star /> : <StarBorder />
              }
            </span>
        )}
      </div>
      <div>
        <TextField hintText="Comment" multiLine={true} value={comment} onChange={onChangeComment}/>
      </div>
    </div>
  )
}

export default AddRatingForm
