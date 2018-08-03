import React from 'react'

const editShop = (props) => {
  return(
      <form onSubmit={props.onSubmit}>
        <div>
          <div>
            <label>
              Name:
              <input type="text" value={ props.name } onChange={ props.onUpdateName }/>
            </label>
            <label>
              Address:
              <input type="text" value= { props.address } onChange={ props.onUpdateAddress }/>
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea type="text" value= { props.description } onChange={ props.onUpdateDescription }/>
            </label>
          </div>
        </div>

        {props.children}

        <div>
          <hr></hr>
          <input type="submit" value="Save" />
          <input type="button" value="Cancel" />
        </div>
      </form>
  )
}

export default editShop;
