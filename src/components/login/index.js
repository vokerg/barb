import React from 'react'
import TextField from 'material-ui/TextField'
import {Card, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

const Login = () => {
  return (
    <div>
      <br />
      <Card className="container">
        <form>
          <div>
            <h2 className="card-heading">Login</h2>
            <TextField
              hintText="Usename"
            />
            <TextField
              hintText="Password"
            />
          </div>
          <CardActions>
            <RaisedButton type="submit" label="Submit" />
          </CardActions>
        </form>
      </Card>
    </div>
  )
}

export default Login
