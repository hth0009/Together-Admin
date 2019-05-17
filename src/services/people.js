import Api from './api'
import store from '../store'

export default {
  getPeople (churchCode = store.state.churchCode) {
    return Api().get('people',
      {
        params: {
          inChurch: `${churchCode}`,
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
