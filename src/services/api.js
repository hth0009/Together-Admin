import axios from 'axios'
import store from '../store'

export default() => {
  return axios.create({
    baseURL: `https://api.togetheradmin.com/`,
    headers: {
      'Authorization': `Bearer ${store.state.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
