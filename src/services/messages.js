import API from './api'
import awsIot from 'aws-iot-device-sdk'
import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
import store from '../store'

// AWS.config.region = 'us-east-2' // your region
// AWS.config.credentials = store.state.token // See AWS Setup and Security below 

export default {
  async getMessages(threadID) {
    console.log(store)
    console.log('sotreere')
    return await API().get('messages', {
      params: {
        threadID: `${threadID}`
      }
    })
  },  
  async postMessage(body) {    
    return API().post('messages', body)
  },
}