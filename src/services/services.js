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
  patchService (serviceID, serviceData) {
    return Api().patch('services', {
      identifier: { id: serviceID },
      values: {
        description: serviceData.description,
        date: serviceData.date,
        speakerName: serviceData.speakerName,
        serviceTimes: serviceData.times,
        title: serviceData.title
      }
    });
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
