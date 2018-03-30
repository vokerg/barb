import React from 'react'
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { Link } from 'react-router-dom'

const UserRow = ({id, username}) => {
  return (
    <TableRow>
      <TableRowColumn><Link to={`/users/${id}`}>{username}</Link></TableRowColumn>
      <TableRowColumn>Admin</TableRowColumn>
      <TableRowColumn>Moderates shops</TableRowColumn>
      <TableRowColumn>Block</TableRowColumn>
    </TableRow>
  )
}

export default UserRow
