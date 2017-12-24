import React from 'react'

class EditShop extends React.Component {
	handleSubmit(event) {
		console.log("form submited");
		event.preventDefault();
	}
	
	render() {
	  return (
		<div>
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>
						Name:
						<input type="text" />
					</label>
					<label>
						Address:
						<input type="text" />
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

export default EditShop
