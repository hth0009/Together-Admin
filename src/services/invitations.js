import Api from './api'
import store from '../store'

export default {
  getMyInvitations (eventStartMin, eventStartMax) {
    return Api().get('myinvitations',{
      params: {
        "eventStartMin": `${eventStartMin}`.substring(0,19),
        "eventStartMax": `${eventStartMax}`.substring(0,19),
        "personID": store.state.personID,
      }
    })
  }
}
