import Api from './api'
import store from '../store'

export default {
  getPeople (churchUsername = store.state.churchUsername) {
    return Api().get('people',
      {
        params: {
          churchUsername: `${churchUsername}`,
          // pagesize: 50,
          // page: 0,
          // relateTo: -1
        }
      })
  },
  getPerson (personID) {
    return Api().get('people',
      {
        params: {
          id: `${personID}`,
          // relateTo: -1
        }
      })
  },
  postPerson (personInfo) {
    return Api().post('people', personInfo)
  },
  patchPerson (personInfo) {
    return Api().patch('people', personInfo)
  },
  patchPersonValue (personID, valueKey, value) {
    return Api().patch('people', {
      "identifier":{
        "id": `${personID}`
      },
      "values": {
        [valueKey]: `${value}`
      }
    }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
}
