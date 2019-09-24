import Api from './api'
import store from '../store'

export default {
  getServices (churchUsername = store.state.churchUsername) {
    return Api().get('services',
    {
      params: {
        churchUsername: `${churchUsername}`
      }
    })
  },
  postService (body) {    
    return Api().post('services', body)
  },
  deleteService (serviceID) {    
    return Api().delete('services', {data: {
      "elements": [
        {
          "id": `${serviceID}`
        }
      ]
    }})
  }
}
