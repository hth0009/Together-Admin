import Api from './api'
// import store from '../store'

export default {
  getEvents () {
    return Api().get('events',
      {
        params: {
          churchUsername: 'NPCChurch3',
          pagesize: 50,
          page: 0
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      return e
    })
  }
}
