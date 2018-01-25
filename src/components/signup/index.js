import React from 'react'
import TextField from 'material-ui/TextField'
import Card from 'material-ui/Card'

class Signup extends React.Component {
  render() {
    return (
      <div>
        <br/>
        <Card className="container">
          <form>
            <h2 className="card-heading">Sign up</h2>
            <div className="field-line">
              <TextField floatingLabelText="Name"/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Password" type="Password"/>
            </div>
            <div className="field-line">
              <TextField floatingLabelText="Repeat password" type="Password"/>
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

export default Signup
