import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

import { getServices } from '../../reducers'
import { loadServices } from '../../actions'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "100%",
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class Services extends React.PureComponent {

  componentDidMount = () => this.props.loadServices()

  render() {
    const { serviceList, classes, theme, selectedServices, handleServiceListChange } = this.props
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Select services</InputLabel>
        <Select
          multiple
          value={selectedServices}
          onChange={handleServiceListChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => <Chip key={value} label={value} className={classes.chip} />)}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {serviceList.map(service => (
            <MenuItem
              key={service}
              value={service}
              style={{
                fontWeight:
                  selectedServices.indexOf(service) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
              }}
            >
              {service}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

const mapStateToProps = state => ({
  serviceList: getServices(state)
})

const mapDispatchToProps = dispatch => ({
  loadServices: () => dispatch(loadServices())
})

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Services))
