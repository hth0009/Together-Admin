import Api from './api'
// import store from '../store'

export default {
  getMessages (id) {
    return Api().get('messages',
      {
        params: {
          threadID: id,
          orderByDescending: 'sentAt'
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
