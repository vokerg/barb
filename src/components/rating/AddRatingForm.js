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
          <select name="rating" ref={props.ratingRef}>
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
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
