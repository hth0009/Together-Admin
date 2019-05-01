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
    personID: 1,
    churchProfile: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3621a9352f53339f36df51/1552577214769/?format=1500w'
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.personID = payload.personID
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
        var poolData = { UserPoolId: 'us-east-2_0Uo7x0QxS',
          ClientId: '1jevotv2ihv5u4kvn5kj8c62cq'
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

            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            // Change State
            commit('auth_success', {
              token: idToken,
              personID: 1
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
          UserPoolId: 'us-east-2_0Uo7x0QxS',
          ClientId: '1jevotv2ihv5u4kvn5kj8c62cq'
        }
        var userPool = new CognitoUserPool(data)
        cognitoUser = userPool.getCurrentUser()

        if (cognitoUser != null) {
          cognitoUser.getSession(function (err, session) {
            if (err) {
              reject(err)
            }
            var idToken = session.getIdToken().getJwtToken()
            commit('auth_success', {
              token: idToken,
              personID: 1
            })
            resolve()
          })
        }
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        cognitoUser.deleteUser(function (err, result) {
          if (err) {
            reject(err)
          }
        })
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    personID: state => state.personID
  }
})
