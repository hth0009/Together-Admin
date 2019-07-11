import Api from './api'
import store from '../store'

export default {
  getChurch (churchUsername = store.state.churchUsername) {
    return Api().get('churches', {
      params: {
        username: `${churchUsername}`,
      }
    })
  }
}
