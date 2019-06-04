import Api from './api'
import store from '../store'

export default {
  getThreads () {
    return Api().get('threads',
      {
        params: {
          // personID: `${store.state.personID}`
          orderByDescending: 'lastMessageAt'
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
          // personID: store.state.personID,
          id: threadID
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  postDirectThread (payload) {
    return Api().get('threads',
      {
        params: {
          'title': 'Harrison & Drew',
          'description': 'Test Direct Message',
          'directMessage': true,
          'leaderID': 24,
          'threadImageURL': '',
          'threadImageThumbnailURL': '',
          'members': [
            {
              'personID': 1
            },
            {
              'personID': 24
            }
          ]
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
