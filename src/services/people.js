import Api from './api'
import store from '../store'

export default {
  getPeople (churchUsername = store.state.churchUsername) {
    return Api().get('people',
      {
        params: {
          inChurch: `${churchUsername}`,
          pagesize: 50,
          page: 0,
          relateTo: -1
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getPerson (personID) {
    return Api().get('people',
      {
        params: {
          id: `${personID}`,
          relateTo: -1
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  }
}
