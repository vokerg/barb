import request from 'superagent'

let token = ''
export const setToken = tkn => token = tkn

const tokenPlugin = req => {
  req.set({'Authorization': 'Bearer ' + token})
}

const urlEncodedPlugin = req => {
  req.set('content-type', 'application/x-www-form-urlencoded')
}

export const signup = (username, password) =>
  new Promise((resolve, reject) => {
    request
      .post('/signup')
      .use(urlEncodedPlugin)
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
      .use(urlEncodedPlugin)
      .send({username, password})
      .end((error, response) => {
        if (error) return reject()
        const {userId, token, username, admin, moderateShops} = response.body
        return resolve({userId, token, username, admin, moderateShops})
      })
  })

export const loginFacebook = accessToken =>
  new Promise((resolve, reject) => {
    request
      .post('/login/facebook')
      .use(urlEncodedPlugin)
      .send({accessToken})
      .end((error, response) => {
        if (error) return reject()
        const {userId, token, username, admin, moderateShops} = response.body
        return resolve({userId, token, username, admin, moderateShops})
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

export const getRatings = shopId =>
  new Promise((resolve, reject) => {
    request
      .get(`/shops/${shopId}/ratings`)
      .end((err, res) => resolve(res.body))
  })

export const addRatingScore = (shopId, ratingId, direction) =>
  new Promise((resolve, reject) => {
    request
      .post(`/shops/${shopId}/ratings/${ratingId}/score`)
      .query({'direction': direction})
      .use(urlEncodedPlugin)
      .use(tokenPlugin)
      .send({})
      .end((err, res) => resolve(res.body))
  })

export const getServices = () =>
  new Promise((resolve, reject) => {
    request
      .get('/services/')
      .use(tokenPlugin)
      .end((err, res) => resolve(res.body))
  })

export const addRating = (userId, shopId, author, rating, comment, dateAdded, score) =>
  new Promise((resolve, reject) => {
    request.put(`/shops/${shopId}/ratings`)
      .use(urlEncodedPlugin)
      .use(tokenPlugin)
      .send({userId, shopId, author, rating, comment, date: JSON.stringify(dateAdded), score})
      .then((response) => resolve(response.body))
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
      .post(`/shops/${shopId}`)
      .use(tokenPlugin)
      .use(urlEncodedPlugin)
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
      .put(`/shops/${shopId}/bookings/`)
      .use(tokenPlugin)
      .use(urlEncodedPlugin)
      .send({userId, date, service, comment})
      .then(res => resolve(res.body))
  })

export const getBookings = (shopId, status, time) =>
  new Promise((resolve, reject) => {
    request
      .get(`/shops/${shopId}/bookings/`)
      .use(tokenPlugin)
      .query({'status': status})
      .query({'time': time})
      .end((err, res) => resolve(res.body))
  })

export const updateBookingStatus = (shopId, bookingId, status) =>
  new Promise((resolve, reject) => {
    request
      .post(`/shops/${shopId}/bookings/${bookingId}`)
      .use(tokenPlugin)
      .use(urlEncodedPlugin)
      .send({status})
      .then(res => resolve(res.body))
  })

export const loadPreferences = userId =>
  new Promise((resolve, reject) =>
    request
      .get(`/users/${userId}/favorites`)
      .use(tokenPlugin)
      .end((err, res) => {
        return (err) ? resolve([]) : resolve(res.body)
      })
  )

export const addFavorite = (userId, shopId) =>
  new Promise((resolve, reject) =>
    request
      .put(`/users/${userId}/favorites/${shopId}`)
      .use(tokenPlugin)
      .send({})
      .then(res => resolve(true))
)

export const loadUsers = filter =>
  new Promise((resolve, reject) =>
    request
      .get(`users`)
      .use(tokenPlugin)
      .query({'filter': filter})
      .end((err, res) => {
        resolve(res.body)
      })
  )

  export const getUser = userId =>
    new Promise((resolve, reject) =>
      request
        .get(`/users/${userId}`)
        .then(response => resolve(response.body))
    )

  export const getUserRatings = userId =>
    new Promise((resolve, reject) =>
      request
        .get(`/users/${userId}/ratings`)
        .then(response => resolve(response.body))
  )
