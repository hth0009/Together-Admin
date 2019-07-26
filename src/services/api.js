import axios from 'axios'
import store from '../store'

export default() => {
  var API = axios.create({
    baseURL: `https://api.togetheradmin.com/`,
    headers: {
      'Authorization': `Bearer ${store.state.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  // Checks credintials before every api call
  // If the access token is expired to refresh token will get a new one
  API.interceptors.request.use(config => {
    return store.dispatch('checkLogin').then(() => {
      return config
    })
  });
  return API
}