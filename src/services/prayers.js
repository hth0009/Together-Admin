import Api from './api'
// import store from '../store'

export default {
  getPrayers () {
    return Api().get('prayers',
      {
        params: {
          churchUsername: 'NPCChurch3'
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getPrayer (id) {
    return Api().get('prayers',
      {
        params: {
          id: `${id}`
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  }
}
