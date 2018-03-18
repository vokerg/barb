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
        const {userId, token, username} = response.body
        return resolve({userId, token, username})
      })
  })

export const loginFacebook = accessToken =>
  new Promise((resolve, reject) => {
    request
      .post('/login/facebook')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({accessToken})
      .end((error, response) => {
        if (error) return reject()
        const {userId, username, token} = response.body
        return resolve({userId, token, username})
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

export const addBooking = (shopId, userId, date, service, comment) =>
  new Promise((resolve, reject) => {
    date = date.toString()
    request
      .put('/shops/' + shopId + '/bookings/')
      .use(tokenPlugin)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({userId, date, service, comment})
      .then(res => resolve(res.body))
  })

export const getBookings = (shopId, status, time) =>
  new Promise((resolve, reject) => {
    request
      .get('/shops/' + shopId + '/bookings/')
      .use(tokenPlugin)
      .query({'status': status})
      .query({'time': time})
      .end((err, res) => resolve(res.body))
  })

export const updateBookingStatus = (shopId, bookingId, status) =>
  new Promise((resolve, reject) => {
    request
      .post('/shops/' + shopId + '/bookings/' + bookingId)
      .use(tokenPlugin)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({status})
      .then(res => resolve(res.body))
  })

export const loadPreferences = userId =>
  new Promise((resolve, reject) =>
    resolve(['5a523ec73fbe9f2dcf20d8e5'])
  )

export const addFavorite = shopId =>
new Promise((resolve, reject) =>
  resolve(true)
)
