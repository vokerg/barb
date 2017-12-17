import React from 'react'

const AddRatingForm = (props) => {
  return (
    <div>
      <div>
        <label>
          Name:
          <input type="text" name="name" ref={props.nameRef}/>
        </label>
        <label>
          Rating:
          <input type="text" name="rating" ref={props.ratingRef}/>
        </label>
      </div>
      <div>
        <label>
          Comment:
          <textarea type="text" name="comment" ref={props.commentRef}/>
        </label>
      </div>
    </div>
  )
}

export default AddRatingForm
