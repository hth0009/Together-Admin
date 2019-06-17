import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

Vue.use(Vuex)

var cognitoUser

export default new Vuex.Store({
  state: {
    status: '',
    token: '',
    personID: -1,
    churchUsername: localStorage.getItem('churchUsername') || '',
    churchIcon: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3621a9352f53339f36df51/1552577214769/?format=1500w',
    userIcon: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.token = payload.token
      // state.personID = 1
      state.personID = payload.personID
      state.churchUsername = payload.churchUsername
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({commit}, user) {
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
        cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            // Local Storage
            var idToken = result.getIdToken().getJwtToken()
            var personID = result.getIdToken().payload.person_id
            var churchUsername = result.getIdToken().payload['custom:churchUsernam']

            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            // Change State
            commit('auth_success', {
              token: idToken,
              personID: personID,
              churchUsername: churchUsername
            })
            resolve()
          },
          onFailure: function (err) {
            commit('auth_error')
            reject(err)
          }
        })
      })
    },
    checkLogin ({commit}) {
      return new Promise((resolve, reject) => {
        var data = {
          UserPoolId: 'us-east-2_th6kgbG7W',
          ClientId: '40ljk2uqsfr2rhuqascb564rlq'
        }
        var userPool = new CognitoUserPool(data)
        cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          cognitoUser.getSession(function (err, session) {
            if (err) {
              reject(err)
            }

            var idToken = session.getIdToken().getJwtToken()
            var personID = session.getIdToken().payload.person_id
            var churchUsername = session.getIdToken().payload['custom:churchUsernam']
            
            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            commit('auth_success', {
              token: idToken,
              personID: personID,
              churchUsername: churchUsername
            })
            resolve()
          })
        }
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        var data = {
          UserPoolId: 'us-east-2_th6kgbG7W',
          ClientId: '40ljk2uqsfr2rhuqascb564rlq'
        }
        var userPool = new CognitoUserPool(data)
        cognitoUser = userPool.getCurrentUser()
        cognitoUser.signOut()

        delete axios.defaults.headers.common['Authorization']

        commit('logout')
        resolve()
      })
    }
  },
  getters: {
    authStatus: state => !!state.token,
    personID: state => state.personID,
    churchUsername: state => state.churchUsername
  }
})
