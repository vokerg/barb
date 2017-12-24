import React from 'react'
import { connect } from 'react-redux'
import { addShop } from '../../actions'

class EditShop extends React.Component {
	constructor(props) {
		super();
		this.state = {
			name: '',
			address: '',
			description: ''
		};

		const updateFieldEvent = key => event => {
			this.setState({
				...this.state,
				[key]: event.target.value
			})
		}
		this.onUpdateName = updateFieldEvent("name");
		this.onUpdateAddress = updateFieldEvent("address");
		this.onUpdateDescription = updateFieldEvent("description");

	}
	handleSubmit(event) {
		event.preventDefault();
		const {name, address, description} = this.state;
		this.props.addShop(name, address, description);
	}

	render() {
	  return (
		<div>
			<form onSubmit={(this.handleSubmit).bind(this)}>
				<div>
					<label>
						Name:
						<input type="text" value={ this.state.name } onChange={ this.onUpdateName }/>
					</label>
					<label>
						Address:
						<input type="text" value= { this.state.address } onChange={ this.onUpdateAddress }/>
					</label>
					<label>
						Description:
						<input type="textarea" value= { this.state.description } onChange={ this.onUpdateDescription }/>
					</label>
				</div>
				<div>
					<input type="submit" value="Save" />
				</div>
			</form>
		</div>
	  )
	}
}

const mapStateToProps = () => {
	return {}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShop: (name, address, description) => {
			dispatch(addShop(name, address, description));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditShop);
