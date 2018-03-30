import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table'
import UserRow from './userRow'

const UsersView = ({users}) => {
  return (
    <Table height={'300px'}>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Username</TableHeaderColumn>
          <TableHeaderColumn>Admin</TableHeaderColumn>
          <TableHeaderColumn>Moderates shops</TableHeaderColumn>
          <TableHeaderColumn>Block</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user =>
          <UserRow key={user.id} id={user.id} username={user.username}/>
        )}
      </TableBody>
    </Table>
  )
}

export default UsersView
