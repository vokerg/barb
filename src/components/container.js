import React from 'react'

const Container = ({children}) => {
  return (
    <div className="container">
      <div className="col-lg-9">
        <div className="card mt-4">
          <div className="card-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container
