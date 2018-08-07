import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'

import { getSnackbarMessage } from '../reducers'
import { clearSnackbar } from '../actions'

const BottomSnackbar = ({ snackbarMessage, clearSnackbar }) => {
  return (
    <Snackbar
      open={ snackbarMessage !== "" }
      message={ snackbarMessage }
      autoHideDuration={ 2000 }
      onClose={ clearSnackbar }
      anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
    />
  )
}

const mapStateToProps = state => ({
  snackbarMessage: getSnackbarMessage(state)
})

const mapDispatchToProps = dispatch => ({
    clearSnackbar : () => dispatch(clearSnackbar())
})


export default connect(mapStateToProps, mapDispatchToProps)(BottomSnackbar)
