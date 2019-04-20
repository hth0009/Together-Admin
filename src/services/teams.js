import Api from './api'
// import store from '../store'

export default {
  getTeams (id = 1) {
    return Api().get('teams',
      {
        params: {
          personID: `${id}`
          // accountEmail: this.$store.state.user.username
        }
      }).then((response) => {
      return response.data
    }).catch((e) => {
      console.error(e)
    })
  },
  getTeam (id = 2) {
    return Api().get('teams',
      {
        params: {
          id: `${id}`
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
