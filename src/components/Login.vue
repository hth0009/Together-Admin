<template>
  <div id="login-page">
    <router-link to="/hello"  id="back-to-landing"><i class="material-icons">arrow_back</i></router-link>
    <h1 class="noselect">together</h1>
    <div id="login-form">
      <form v-on:submit.prevent="login">
        <label for="username">username:</label>
        <input v-model="username" type="username" name="username" required placeholder="username">
        <div>
          <label for="password">password:</label>
          <input v-model="password" :type="passwordType" name="password" required placeholder="password" autocomplete="password">
          <i class="material-icons" id="password-eye-icon" @click="showPassword = !showPassword">
            {{showPassword ? 'visibility' : 'visibility_off'}}
          </i>
        </div>
        <button class="gs-basic-button">ENTER</button>
      </form>      
      <!-- <a @click="forgotPassword" id="forgot-password">forgot password?</a> -->
      <inline-loader v-show="loggingIn"></inline-loader>
    </div>    
    <div id="wrong-username-password" class="error" v-show="hasWrongUsernamePassword">
      <i class="material-icons">error</i> Wrong password. Please try again.
    </div>
    <div id="user-not-found" class="error" v-show="userNotFound">
      <i class="material-icons">error</i> This email or username was not found.
    </div>
  </div>
</template>

<script>

import InlineLoader from '@/components/InlineLoader'
import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      showPassword: false,
      hasWrongUsernamePassword: false,
      userNotFound: false,
      loggingIn: false
    }
  },
  components: {
    InlineLoader
  },
  methods: {
    login: function () {
      this.resetErrors()
      
      this.loggingIn = true

      const {lowerCaseUsername, password} = this
      const username = lowerCaseUsername
      this.$store.dispatch('login', { username, password })
      .then(() => this.$router.push('/app/people'))
      .catch(err => {
        if (err.code == "NotAuthorizedException") {
          this.hasWrongUsernamePassword = true;
        }
        if (err.code == "UserNotFoundException") {
          this.userNotFound = true;
        }
      }).then(() => {
        this.loggingIn = false
      })
    },
    forgotPassword() {      
      const {lowerCaseUsername, password} = this
      var authenticationData = {
        Username: lowerCaseUsername,
        Password: password
      }
      var authenticationDetails = new AuthenticationDetails(authenticationData)
      var poolData = {
        UserPoolId: 'us-east-2_th6kgbG7W',
        ClientId: '40ljk2uqsfr2rhuqascb564rlq'
      }
      var userPool = new CognitoUserPool(poolData)
      var userData = {
        Username: lowerCaseUsername,
        Pool: userPool
      }
      var cognitoUser = new CognitoUser(userData)
      cognitoUser.forgotPassword({
        onSuccess: function (result) {
          console.log('call result: ' + result);
        },
        onFailure: function(err) {
          alert(err);
        },
        inputVerificationCode() {
          var verificationCode = prompt('Please input verification code ' ,'');
          var newPassword = prompt('Enter new password ' ,'');
          cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
      });
    },
    resetErrors() {
      this.hasWrongUsernamePassword = false
      this.userNotFound = false
    }
  },
  computed: {
    lowerCaseUsername() {
      return this.username.toLowerCase()
    },
    passwordType() {
      return this.showPassword ? 'text' : 'password';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login-page{
    width: 100%;
    height: 100%;
    background: url(https://s3.wasabisys.com/cdn.togetheradmin.com/login.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left center;
    padding-top: 30vh;
  }
  #back-to-landing {
    position: absolute;
    left: 2rem;
    top: 2rem;
    color: black;
    cursor: pointer;
    font-size: 1rem;
  }
  h1{
    font-family: 'Abril Fatface', serif;
    /* font-family: 'Sorts Mill Goudy', serif; */
    letter-spacing: 3px;
    font-weight: 100;
    color: #00cec9;
    text-align: center;
  }
  #login-form{
    margin-top: 5vh;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #login-form form{
    width: 500px;
    color: #595C5F;
  }
  #login-form br{
    padding-bottom: 10px;
  }
  #login-form label{
    display: inline-block;
    padding-right: 10px;
    margin-bottom: 10px;
    width: 40%;
    text-align: right;
    font-size: 13px;
  }
  #login-form input{
    background: none;
    border: none;
    outline: none;
    padding-left: 10px;
    margin-bottom: 10px;
    width: 40%;
    font-size: 13px;    
  }
  #password-eye-icon{
    margin-left: 8px;
    cursor: pointer;
    font-size: 1em;
    position: absolute;
  }
  #login-form input::placeholder{
    color: #86898C;
  }
  #login-form button{
    margin-top: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
  #login-footer {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    margin: 0px;
    color: #434649;
    display: flex;
    direction: row;
  }
  #login-footer a{
    color: #303336;
    text-decoration: none;
    margin: 5px;
  }
  /* Change the white to any color ;) */
  @-webkit-keyframes autofill {
    to {
      /* color: ; */
      background: transparent;
    }
  }

  input:-webkit-autofill {
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }

  #forgot-password{
    color: gray;
    cursor: pointer;
    font-size: .8rem;
  }

  .error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;    
    color: #ff7675;
    border: 1px #ff7675 solid;
    border-radius: 7px;

    width: 90%;
    max-width: 400px;
    margin: 1rem auto;
    padding: 1rem;

    font-size: .9rem;
  }
  .error i{
    margin-right: 1rem;
  }

  
/* //////////////////////////
//////  MEDIA QUERIES ///////
////////////////////////// */

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - desktop (default grid)
   1024-768    - tablet landscape
   768-480     - tablet 
   480-less    - phone landscape & smaller
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
} 

@media all and (min-width: 480px) and (max-width: 768px) {
  #login-page{
    /* background: white; */
    background-size: 50%;
    background-size: cover;
    background-position: center center;
  }
}

@media all and (max-width: 480px) {
  #login-page{
    /* background: white; */
    background-size: 50%;    
    background-size: cover;
    background-position: center center;
  }
}

</style>
