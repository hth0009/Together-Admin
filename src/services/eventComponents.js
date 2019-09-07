import Api from './api'

export default {
  patchComponent (componentID, fields) {
    return Api().patch('components', {
      "identifier":{
        "id": `${componentID}`
      },
      "values": {
        "component": {
          "fields": fields
        }
      }
    })
  }
}
