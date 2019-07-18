import Api from './api'
import store from '../store'

export default {
  getMessages (threadID) {
    return Api().get('messages',
      {
        params: {
          threadID: `${threadID}`,
          orderByDescending: 'sentAt',
          pageSize: 100,
          page: 0
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
