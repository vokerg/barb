import request from 'superagent'

export const getShops = (filter="all", service="") =>
  new Promise((resolve, reject) => {
    request
      .get('/shops/')
      .query({'filter': filter})
      .query({'service': service})
      .end((err, res) => resolve(res.body))
  })

  export const getServices = () =>
    new Promise((resolve, reject) => {
      request
        .get('/services/')
        .end((err, res) => resolve(res.body))
    })

export const addRating = (shopId, author, rating, comment) =>
  new Promise((resolve, reject) => {
    request.put('/shops/' + shopId + '/ratings')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({shopId, author, rating, comment})
      .then(() => resolve())
  })

export const updateShop = (shopId, name='', address='', favorited='', description='', services='', coordinates='') =>
  new Promise((resolve, reject) => {
    let shop = Object.assign(
      name!=='' ? {name}: {},
      address!=='' ? {address}: {},
      favorited!=='' ? {favorited}: {},
      description!=='' ? {description}: {},
      services!=='' ? {services}: {},
      coordinates!=='' ? {coordinates}: {},
    )
    console.log("services from api", shop)
    return request.post('/shops/' + shopId)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(shop)
      .then(() => resolve())
  })

export const createShop = (name, address, description, services=[], lat=0, lng=0) =>
  new Promise((resolve, reject) => {
    const coordinates={lat, lng}
    request.put('/shops/')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({name, address, description, coordinates, services})
      .then(res => resolve(res.body))
  })
