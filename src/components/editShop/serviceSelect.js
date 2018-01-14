import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css';

class ServiceSelect extends React.Component{
  componentWillMount() {
		const {valueList} = this.props
		this.setState({
			value:valueList,
			options:valueList,
		})
  }

  handleChange(value) {
		const {options} = this.state
		const {serviceList, servicesCallback} = this.props
		const tempArray = [
			...options,
			...serviceList
		]

    this.setState({
			value,
			options:[
				...options
					.filter(element =>
						!serviceList.includes(element)),
				...value.split(',')
					.filter(element =>
						(!tempArray.includes(element)) && (element !== ""))
			]
		})
		servicesCallback(value)
  }

  render() {
    const {options, value} = this.state
    return (
      <div className="section">
        <h3 className="section-heading">select services...</h3>
        <Select.Creatable
          class-name="Select-control"
          closeOnSelect={false}
          multi
          simpleValue
          options={[...this.props.serviceList, ...options].map(service => {
						return {label: service, value: service}
					})}
          value={value}
          onChange={this.handleChange.bind(this)}
					placeholder="Select your favourite(s)"
        />
      </div>
    )
  }

}
export default ServiceSelect
