import React from 'react'
import {connect} from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
import {getSnackbarMessage} from '../reducers'
import {clearSnackbar} from '../actions'

class BottomSnackbar extends React.Component {
  render() {
    const {snackbarMessage, clearSnackbar} = this.props
    return (
      <Snackbar
        open={snackbarMessage !== ""}
        message={snackbarMessage}
        autoHideDuration={2000}
        onRequestClose={clearSnackbar}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
      snackbarMessage: getSnackbarMessage(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSnackbar : () => dispatch(clearSnackbar())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BottomSnackbar)
