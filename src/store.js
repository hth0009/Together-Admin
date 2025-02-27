import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

import Church from '@/services/church';

Vue.use(Vuex)


import { thisSundayModule } from './storeModules/ThisSundayStore'
import { TeamsModule } from './storeModules/TeamsStore'
import { PeopleModule } from './storeModules/PeopleStore'
import { MessagesModule } from './storeModules/MessagesStore'
import { SplashModule } from './storeModules/SplashStore'
import { GivingModule } from './storeModules/GivingStore'

export default new Vuex.Store({
  modules: {
    thisSunday: thisSundayModule,
    teams: TeamsModule,
    people: PeopleModule,
    messages: MessagesModule,
    splash: SplashModule,
    giving: GivingModule,
  },
  state: {
    status: '',
    token: '',
    personID: -1,
    church: {},
    churchUsername: localStorage.getItem('churchUsername') || '',
    personName: '',
    churchIcon: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3621a9352f53339f36df51/1552577214769/?format=1500w',
    personIcon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    drawerIsOpen: true,
  },
  getters: {
    authStatus: state => !!state.token,
    personID: state => state.personID,
    churchUsername: state => state.churchUsername,
  },
  mutations: {
    setChurch(state, church) { state.church = {...church}; },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.personID = payload.personID
      state.personName = payload.personName
      state.churchUsername = payload.churchUsername
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
    setDrawerIsOpen(state, drawerIsOpen) { state.drawerIsOpen = drawerIsOpen; },
  },
  actions: {
    async getChurch({state, commit}, churchUsername = state.churchUsername, getCurrentStateIfAlreadyThere=false) {
      if(getCurrentStateIfAlreadyThere && Object.keys(state.church).length !== 0) { return state.church; }
      const getChurchRes = await Church.getChurch(churchUsername);
      commit('setChurch', getChurchRes.data.churches[0]);
      return state.church;
    },
    login ({commit, dispatch}, user) {
      return new Promise((resolve, reject) => {
        const { username, password } = user
        var authenticationData = {
          Username: username,
          Password: password
        }
        var authenticationDetails = new AuthenticationDetails(authenticationData)
        var poolData = {
          UserPoolId: 'us-east-2_th6kgbG7W',
          ClientId: '40ljk2uqsfr2rhuqascb564rlq'
        }
        var userPool = new CognitoUserPool(poolData)
        var userData = {
          Username: username,
          Pool: userPool
        }
        let cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            // Local Storage
            var idToken = result.getIdToken().getJwtToken()
            var personID = result.getIdToken().payload.person_id
            const personName = result.getIdToken().payload.given_name + " " + result.getIdToken().payload.family_name
            var churchUsername = result.getIdToken().payload['custom:churchUsernam']

            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            // Change State
            commit('auth_success', {
              token: idToken,
              personID: personID,
              churchUsername: churchUsername,
              personName: personName
            })
            // dispatch('getSecondaryInfo')
            resolve()
          },
          onFailure: function (err) {
            commit('auth_error')
            reject(err)
          }
        })
      })
    },
    // getSecondaryInfo ({commit}, personID, churchUsername) {
    //   return new Promise(async(resolve, reject) => {
    //     const church = await Church.getChurch(churchUsername).then(result => {
    //       return result
    //     }).catch(err => {
    //       reject(err)
    //     })
    //     console.log(church)
        
    //     resolve()
    //   })
    // },
    checkLogin ({commit}) {
      return new Promise((resolve, reject) => {
        var data = {
          UserPoolId: 'us-east-2_th6kgbG7W',
          ClientId: '40ljk2uqsfr2rhuqascb564rlq'
        }
        var userPool = new CognitoUserPool(data)
        let cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          cognitoUser.getSession(function (err, session) {
            if (err) {
              reject(err)
            }

            var idToken = session.getIdToken().getJwtToken()
            var personID = session.getIdToken().payload.person_id
            var churchUsername = session.getIdToken().payload['custom:churchUsernam']
            const personName = session.getIdToken().payload.given_name + " " + session.getIdToken().payload.family_name

            
            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            commit('auth_success', {
              token: idToken,
              personID: personID,
              churchUsername: churchUsername,
              personName: personName
            })
          })
        }
        resolve()
      })
    },
    logout ({commit}) {
      const data = {
        UserPoolId: 'us-east-2_th6kgbG7W',
        ClientId: '40ljk2uqsfr2rhuqascb564rlq'
      }
      const userPool = new CognitoUserPool(data)
      let cognitoUser = userPool.getCurrentUser()
      cognitoUser.signOut()

      delete axios.defaults.headers.common['Authorization']

      commit('logout')
    },
  },
})
