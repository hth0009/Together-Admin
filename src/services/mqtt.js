import AWS from 'aws-sdk/global'
import AWSMqttClient from 'aws-mqtt'
import store from '../store'
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import Amplify, { Auth, PubSub } from 'aws-amplify';

export default {
  
  createMqttClient() {    
    Amplify.configure({
      identityPoolId: "us-east-2:565cdd94-fd83-45d7-b4c5-ee8b6f40fffb",
      region: "us-east-2",
      userPoolId: "us-east-2_th6kgbG7W",
      userPoolWebClientId: "40ljk2uqsfr2rhuqascb564rlq"
    });
    Amplify.addPluggable(
      new AWSIoTProvider({
        aws_pubsub_region: 'us-east-2',
        aws_pubsub_endpoint:
          'wss://a249ujnc2b66n0-ats.iot.us-east-2.amazonaws.com/mqtt'
      })
    );
  }
}