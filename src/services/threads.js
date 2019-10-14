import Api from './api'
import store from '../store'

export default {
  getThreads () {
    return Api().get('messagethreads',
      {
        params: {
          personID: `${store.state.personID}`
          // "orderByDescending": 'lastMessageAt'
        }
      }
    )
  },
  getThread (threadID) {
    return Api().get('threads',
      {
        params: {
          // personID: store.state.personID,
          id: threadID
        }
      }
    )
  },
  patchMessageRead (threadPersonID) {
    return Api().patch('messagethreadspeople',
      {
        "identifier":{
          "id": `${threadPersonID}`
        },
        "values":{
          "unreadMessages": 0
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  },
  postDirectThread (senderID, recipientID, title) {
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
      })
  }
}
