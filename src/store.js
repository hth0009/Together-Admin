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
    user: {
      username: localStorage.getItem('username') || '',
      profileUrl: 'https://images.unsplash.com/photo-1476493279419-b785d41e38d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
    },
    churchProfile: 'http://static1.squarespace.com/static/563fb2d1e4b07f78f2db4c32/t/5c3621a9352f53339f36df51/1552577214769/?format=1500w'
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
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
        var userInfo = {
          username: username
        }
        cognitoUser = new CognitoUser(userData)
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            // Local Storage
            // var refreshToken = result.getRefreshToken().getToken()
            var idToken = result.getIdToken().getJwtToken()
            // localStorage.setItem('refreshToken', refreshToken)
            // localStorage.setItem('idToken', idToken)
            // localStorage.setItem('username', username)

            // Set Header
            axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`

            // Change State
            commit('auth_success', idToken, ...userInfo)
            resolve()
          },
          onFailure: function (err) {
            commit('auth_error')
            // localStorage.removeItem('refreshToken')
            // localStorage.removeItem('idToken')
            // localStorage.removeItem('username')
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
            console.log('session validity: ' + session.isValid())
            console.log(session)
            var idToken = session.getIdToken().getJwtToken()
            commit('auth_success', idToken, {})
            resolve()
          })
        }
      })
    },
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        // localStorage.removeItem('token')
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
    authStatus: state => state.status
  }
})
