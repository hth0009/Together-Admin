import Api from './api'
import store from '../store'

export default {
  getEventInstancesByChurch (churchUsername = store.state.churchUsername) {
    return Api().get('eventinstances',
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
  getEventBasesByChurch (churchUsername = store.state.churchUsername) {
    return Api().get('eventbases',
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
  getEventInstance (instanceID) {
    return Api().get('eventinstances',
      {
        params: {
          id: `${instanceID}`
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
