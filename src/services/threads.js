import API from './api'
import store from '../store'

export default {
  async getThreadByID(id) {
    return await API().get('messagethreads', {
      params: {
        id: `${id}`
      }
    })
  },
  async getThreads(personID = store.state.personID) {
    return await API().get('messagethreads', {
      params: {
        personID: `${personID}`
      }
    })
  }
}
