import hello from 'hellojs/dist/hello.all.js';

export const loginFacebook = () => {
  return new Promise((resolve, reject) => {
    hello.init(
      {
        facebook: '212451939302537'
      },
      {
        redirect_uri: 'http://localhost:3000/fbredirect'
      }
    )

    hello('facebook').login(response => {
      if (!response.error) {
        resolve(response.authResponse.access_token)
      }
      else {
        reject()
      }
      console.log(response)

    })
  })
}
