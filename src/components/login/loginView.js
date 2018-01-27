import React from 'react'
import TextField from 'material-ui/TextField'
import {Card, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const LoginView = ({username, password, onChange, onSubmit}) => {
  return (
    <div>
      <br />
      <Card className="container">
        <form onSubmit={onSubmit}>
          <div>
            <h2 className="card-heading">Login</h2>
            <div className="field-line">
              <TextField
                hintText="Usename"
                name="username"
                value={username}
                onChange={onChange}
              />
            </div>
            <div className="field-line">
              <TextField
                type="Password"
                hintText="Password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
          <CardActions>
            <RaisedButton type="submit" label="Submit" />
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default LoginView;
