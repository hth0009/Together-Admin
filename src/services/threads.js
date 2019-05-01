import Api from './api'
import store from '../store'

export default {
  getThreads () {
    return Api().get('threads',
      {
        params: {
          personID: 1
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  getThread (id) {
    return Api().get('threads',
      {
        params: {
          personID: store.state.personID,
          id: id
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
