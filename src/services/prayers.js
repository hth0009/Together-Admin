import Api from './api'
import store from '../store'

export default {
  _defaultParams: {
    storedChurchCode: store.state.churchCode
  },
  getPrayers (churchCode = store.state.churchCode) {
    return Api().get('prayers',
      {
        params: {
          churchUsername: `${churchCode}`
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
