import Api from './api'
import store from '../store'

export default {
  getChurchPeople (churchUsername = store.state.churchUsername) {
    return Api().get('churchpeople',
    {
      params: {
        churchUsername: `${churchUsername}`
      }
    })
  },
  postChurchPerson (body) {    
    return Api().post('churchpeople', body)
  }
}
