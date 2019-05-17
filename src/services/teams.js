import Api from './api'
import store from '../store'

export default {
  getTeams (personID = store.state.personID) {
    return Api().get('teams',
      {
        params: {
          personID: `${personID}`
          // accountEmail: this.$store.state.user.username
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getTeam (teamID) {
    return Api().get('teams',
      {
        params: {
          id: `${teamID}`
          // accountEmail: this.$store.state.user.username
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  postTeam (teamInfo) {
    return Api().post('teams', teamInfo).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  }
}
