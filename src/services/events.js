import Api from './api'
import store from '../store'

export default {
  getEvents (churchUsername = store.state.churchUsername) {
    return Api().get('events',
      {
        params: {
          churchUsername: `${churchUsername}`,
          pagesize: 50,
          page: 0
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  getEvent (eventID) {
    return Api().get('events',
      {
        params: {
          id: eventID
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
