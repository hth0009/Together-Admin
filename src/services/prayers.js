import Api from './api'
import store from '../store'

export default {
  _defaultParams: {
    storedChurchCode: store.state.churchUsername
  },
  getPrayers (churchUsername = store.state.churchUsername) {
    return Api().get('prayers',
      {
        params: {
          churchUsername: `${churchUsername}`
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getPrayer (prayerID) {
    return Api().get('prayers',
      {
        params: {
          id: `${prayerID}`
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  }
}
