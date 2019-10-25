import Api from './api'
import store from '../store'

export default {
  getTeamsByID (personID = store.state.personID) {
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
  getTeamsByChurch (churchUsername = store.state.churchUsername) {
    return Api().get('teams',
      {
        params: {
          churchUsername: `${churchUsername}`
        }
      })
  },
  getTeam (teamID) {
    return Api().get('teams',
      {
        params: {
          id: `${teamID}`
          // accountEmail: this.$store.state.user.username
        }
      })
  },
  postTeam (teamInfo) {
    return Api().post('teams', teamInfo)
  },
  patchTeam (teamInfo) {
    return Api().patch('teams', teamInfo)
  },
  patchTeamValue (teamID, valueKey, value) {
    return Api().patch('teams', {
      "identifier":{
        "id": `${teamID}`
      },
      "values": {
        [valueKey]: `${value}`
      }
    })
  },
  deleteTeam (teamID) {
    return Api().delete('teams',
    {data: {
      "elements": [
        {
          "id": `${teamID}`
        }
      ]
    }})
  }
}
