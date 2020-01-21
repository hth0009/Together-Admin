import API from './api'
import store from '../store'
import awsIot from 'aws-iot-device-sdk'
import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'

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
  },
  async subscribeToThread(id) {    
    console.log(id)
    AWS.config.region = 'us-east-2' // your region
    AWS.config.credentials = AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-2:565cdd94-fd83-45d7-b4c5-ee8b6f40fffb'
    })

    const client = new AWSMqttClient({
      region: AWS.config.region,
      credentials: AWS.config.credentials,
      endpoint: 'wss://a249ujnc2b66n0-ats.iot.us-east-2.amazonaws.com/mqtt', // NOTE: get this value with `aws iot describe-endpoint`
      expires: 600, // Sign url with expiration of 600 seconds
      clientId: 'mqtt-client-' + (Math.floor((Math.random() * 100000) + 1)), // clientId to register with MQTT broker. Need to be unique per client
      will: {
          topic: 'WillMsg',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false
      }
    })

    return client
    
    // client.on('connect', () => {
    //   client.subscribe('/myTopic')
    // })
    // client.on('message', (topic, message) => {
    //   console.log(topic, message)
    // })
    // client.on('close', () => {
    //   // ...
    // })
    // client.on('offline', () => {
    //   // ...
    // })
  }
}
