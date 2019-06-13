import Api from './api'
import store from '../store'

export default {
  getMessages (threadID) {
    return Api().get('messages',
      {
        params: {
          threadID: `${threadID}`,
          orderByDescending: 'sentAt'
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  postMessage (fromID, threadID, contents) {
    return Api().post('messages',
      {
        fromID: `${store.state.personID}`,
        threadID: `${threadID}`,
        contents: `${contents}`
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
