import request from 'superagent'

export const shopsPromise = (filter="all", service="") =>
  new Promise((resolve, reject) => {
    request
      .get('/shops/')
      .query({'filter': filter})
      .query({'service': service})
      .end((err, res) => {
        resolve(res.body)
      })
  })
