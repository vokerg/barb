import React from 'react'
import TextField from 'material-ui/TextField'
import Card from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default ({
  username,
  password,
  repeatPassword,
  onChange,
  onSubmit
}) => {
  return (
    <div>
      <br/>
      <Card className="container">
        <form onSubmit={onSubmit}>
          <h2 className="card-heading">Sign up</h2>
          <div className="field-line">
            <TextField floatingLabelText="Name" name="username" value={username} onChange={onChange}/>
          </div>
          <div className="field-line">
            <TextField floatingLabelText="Password" name="password" type="Password" value={password} onChange={onChange}/>
          </div>
          <div className="field-line">
            <TextField floatingLabelText="Repeat password" name="repeatPassword" type="Password" value={repeatPassword} onChange={onChange}/>
          </div>
          <div className="field-line">
            <FlatButton type="submit">Submit</FlatButton>
          </div>
        </form>
      </Card>
    </div>
  )
}
