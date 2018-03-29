import React from 'react'
import { connect } from 'react-redux'
import { isAdmin, getUserId, getUserAdminUsers, getUserAdminFilter } from '../../reducers'
import { updateFilter } from '../../actions/userAdmin'
import UsersFilter from './usersFilter'
import UsersView from './usersView'

class UserAdmin extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.updateFilter()
  }

  render() {
    const {users, filter, updateFilter} = this.props
    return (
      <div>
        <UsersFilter filter={ filter } updateFilter={updateFilter}/>
        <UsersView users={ users }/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  admin: isAdmin(state, getUserId(state)),
  filter: getUserAdminFilter(state),
  users: getUserAdminUsers(state)
})

const mapDispatchToProps = dispatch => ({
  updateFilter: filter => dispatch(updateFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin)
