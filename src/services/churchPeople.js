import Api from './api'
import store from '../store'

export default {
  async getChurchPeople (churchID = store.state.church.id) {
    if(!churchID) {
      const church = await store.dispatch('getChurch');
      churchID = church.id
    }
    return Api().get('churchpeople', {
      params: {
        churchID: `${churchID}`
      }
    })
  },
  postChurchPerson (body) {    
    return Api().post('churchpeople', body)
  }
}
