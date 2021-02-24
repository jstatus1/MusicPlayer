import auth from 'auth0-js'

export default class Auth 
{
    auth0 = new auth0.WebAuth({
        domain: 'musicplayer.us.auth0.com',
        clientID: 'wzOKFJNeLPPumeltvwUmKFCeceKrozD7',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
      })

      login = () => {
        this.auth0.authorize()
    }
}