import React from 'react'
import TextField from 'material-ui/TextField'

const UsersFilter = ({filter, updateFilter}) => {
  return (
    <div>
      <TextField hintText="Username" value={filter} onChange={event => updateFilter(event.target.value)}/>
      <br/>
    </div>
  )
}

export default UsersFilter
