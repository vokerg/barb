import request from 'superagent'

let token = ''
export const setToken = tkn => token = tkn

const tokenPlugin = req => {
  req.set({'Authorization': 'Bearer ' + token})
}

export const signup = (username, password) =>
  new Promise((resolve, reject) => {
    request
      .post('/signup')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username, password})
      .end((error, response) => {
        if (error) return reject()
        return resolve()
      })
  })

export const login = (username, password) =>
  new Promise((resolve, reject) => {
    request
      .post('/login')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({username, password})
      .end((error, response) => {
        if (error) return reject()
        const {userId, token} = response.body
        return resolve({userId, token})
      })
  })

const getShop = (id) =>
  new Promise((resolve, reject) => {
    request
      .get('/shops/' + id)
      .use(tokenPlugin)
      .end((err, res) => resolve(res.body))
  })

export const getShops = (filter="all", service="", id="") =>
{
  return (id !== "")
    ? getShop(id)
    : new Promise((resolve, reject) => {
      request
        .get('/shops/')
        .use(tokenPlugin)
        .query({'filter': filter})
        .query({'service': service})
        .query({'id': id})
        .end((err, res) => resolve(res.body))
    })
}

export const getServices = () =>
  new Promise((resolve, reject) => {
    request
      .get('/services/')
      .use(tokenPlugin)
      .end((err, res) => resolve(res.body))
  })

export const addRating = (shopId, author, rating, comment) =>
  new Promise((resolve, reject) => {
    request.put('/shops/' + shopId + '/ratings')
      .set('content-type', 'application/x-www-form-urlencoded')
      .use(tokenPlugin)
      .send({shopId, author, rating, comment})
      .then(() => resolve())
  })

export const updateShop = (shopId, name='', address='', favorited='', description='', services=[], coordinates='') =>
  new Promise((resolve, reject) => {
    let shop = Object.assign(
      name!=='' ? {name}: {},
      address!=='' ? {address}: {},
      favorited!=='' ? {favorited}: {},
      description!=='' ? {description}: {},
      services!=='' ? {"services[]":services}: {},
      coordinates!=='' ? {coordinates}: {},
    )
    return request
      .post('/shops/' + shopId)
      .use(tokenPlugin)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(shop)
      .then(() => resolve())
  })

export const createShop = (name, address, description, services=[], coordinates={lat:0, lng:0}) =>
  new Promise((resolve, reject) => {
    request
      .put('/shops/')
      .use(tokenPlugin)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name, address, description, coordinates, 'services[]':services})
      .then(res => resolve(res.body))
  })
