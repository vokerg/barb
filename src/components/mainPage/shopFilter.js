import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    flexGrow: 1,
  },
};

const Filter = ({classes, selectedColumn, handleColumnChange}) => {
  return (
      <Paper className={classes.root}>
       <Tabs
         value={selectedColumn}
         onChange={handleColumnChange}
         indicatorColor="primary"
         textColor="primary"
         centered
       >
         <Tab label="All" />
         <Tab label="Favorites" />
         <Tab label="By services" />
       </Tabs>
     </Paper>
  )
}

export default withStyles(styles)(Filter)
