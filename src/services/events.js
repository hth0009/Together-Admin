import Api from './api'
import store from '../store'

export default {
  getEvents (churchCode = store.state.churchCode) {
    return Api().get('events',
      {
        params: {
          churchUsername: `${churchCode}`,
          pagesize: 50,
          page: 0
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
