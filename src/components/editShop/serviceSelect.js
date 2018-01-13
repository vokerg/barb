import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css';

const SERVICES = [
	{ label: 'Shaving', value: 'Shaving' },
	{ label: 'Manicure', value: 'Manicure' },
	{ label: 'Cut', value: 'Cut' },
	{ label: 'Pedicure', value: 'Pedicure' },
];


class ServiceSelect extends React.Component{
  componentWillMount() {
    this.setState({value:[], options:[]})
    setTimeout(function () {
      this.setState({options:SERVICES, value:["Shaving","Manicure"]})
      console.log(this.state)
    }.bind(this), 5000);

  }

  handleChange(value) {
    this.setState({value})
  }

  render() {
    console.log("rerender", this.state)
    const {options, value} = this.state
    return (
      <div className="section">
        <h3 className="section-heading">select services...</h3>
        <Select.Creatable
          class-name="Select-control"
          closeOnSelect={false}
          multi
          simpleValue
          options={options}
          value={value}
          onChange={this.handleChange.bind(this)}
        />

      </div>
    )
  }

}
export default ServiceSelect
