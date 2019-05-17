import Api from './api'
import store from '../store'

export default {
  getThreads () {
    return Api().get('threads',
      {
        params: {
          personID: `${store.state.personID}`
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  getThread (threadID) {
    return Api().get('threads',
      {
        params: {
          personID: store.state.personID,
          id: threadID
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
