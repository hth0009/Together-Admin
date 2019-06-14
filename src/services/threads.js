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
  postDirectThread (senderID, recipientID, title, descpription) {
    return Api().post('threads',
      {
        'title': `${title}`,
        'description': 'This is a direct message',
        'directMessage': true,
        'leaderID': `${senderID}`,
        'members': [
          {
            'personID': `${senderID}`
          },
          {
            'personID': `${recipientID}`
          }
        ]
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
