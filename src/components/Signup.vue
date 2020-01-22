<template>
  <div id="login-page">
    <div
      style="display:flex;flex-direction:column;justify-content:flex-start;padding-top:2rem;padding-left:3rem;"
    >
      <router-link to="/hello/welcome" id="back-to-landing">
        <i class="material-icons">arrow_back</i>
      </router-link>
      <h1>Create Your Organizational Together Account</h1>
    </div>
    <div id="form-wrapper">
      <div class="panel gs-container" style="display:block;">
        <label
          v-if="!loginSuccess"
          style="display:block;font-size:1rem;margin-bottom:0;text-align:center;margin-bottom:1rem;color:#004580;font-weight:700;"
        >PERSONAL ACCOUNT</label>
        <div v-if="!loginSuccess" id="signup-login-select">
          <label
            v-if="logInSelected"
            v-on:click="logInSelected=false"
            style="cursor:pointer;"
          >Sign Up</label>
          <label
            v-if="!logInSelected"
            v-on:click="logInSelected=false"
            style="color:#004580;cursor:pointer;"
          >Sign Up</label>
          <label
            v-if="logInSelected"
            v-on:click="logInSelected=true"
            style="color:#004580;cursor:pointer;"
          >Log In</label>
          <label
            v-if="!logInSelected"
            v-on:click="logInSelected=true"
            style="cursor:pointer;"
          >Log In</label>
        </div>
        <!-- <label>PERSONAL ACCOUNT</label> -->
        <div v-if="logInSelected && !loginSuccess">
          <label
            style="font-size:.7rem;color:#b2b2b2;width:100%;text-align:center;"
          >Already have a personal account? Sign in!</label>
          <form v-on:submit.prevent="login" style="margin:auto;">
            <div>
              <div class="gs-form-group">
                <input
                  type="username"
                  class="basic-input"
                  placeholder="Username"
                  v-model="username"
                  name="username"
                />
              </div>
              <div class="gs-form-group">
                <input
                  :type="passwordType"
                  class="basic-input"
                  placeholder="Password"
                  v-model="password"
                  name="password"
                />
                <!-- <i
                class="material-icons"
                id="password-eye-icon"
                @click="showPassword = !showPassword"
                >{{showPassword ? 'visibility' : 'visibility_off'}}</i>-->
              </div>
              <div id="enter-btn-wrapper">
                <button class="basic-button">Continue</button>
              </div>
              <div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">
                <!-- <div id="wrong-username-password" class="error" v-show="hasWrongUsernamePassword">
                  <i class="material-icons">error</i> Wrong password. Please try again.
                </div>
                <div id="user-not-found" class="error" v-show="userNotFound">
                  <i class="material-icons">error</i> This email or username was not found.
                </div>-->
              </div>
            </div>
          </form>
          <!-- <inline-loader v-show="loggingIn"></inline-loader> -->
        </div>
        <!-- <a @click="forgotPassword" id="forgot-password">Forgot password?</a> -->
        <div v-if="!logInSelected && !loginSuccess" style="text-align:center;">
          <div v-if="personSignUp">
            <label style="font-size:.7rem;color:#b2b2b2;width:100%;">
              Haven't created a personal account yet?
              <br />Go ahead and create one today.
            </label>
            <form v-on:submit.prevent="signup" style="margin:auto;">
              <div>
                <div class="gs-form-group">
                  <input type="text" class="basic-input" placeholder="First Name" name="firstName" v-model="firstName" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="basic-input" placeholder="Last Name" name="lastName" v-model="lastName" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="basic-input" placeholder="Email" name="Email" v-model="email" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="basic-input" placeholder="Username" name="Username" v-model="username" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="basic-input" placeholder="Password" name="Password" v-model="password" />
                </div>
                <div id="enter-btn-wrapper" class="gs-form-group">
                  <button class="basic-button">Continue</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div id="success" v-if="loginSuccess">
          <label style="color:#004580;font-size:1rem;">PERSONAL ACCOUNT</label>
          <label style="color:#004580;font-size:1.75rem;">CREATED</label>
        </div>
      </div>
      <div class="panel gs-container" style="display:block;" v-if="loginSuccess">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import InlineLoader from "@/components/InlineLoader";
import People from "@/services/people";
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser
} from "amazon-cognito-identity-js";

import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      showPassword: false,
      logInSelected: true,
      personSignUp: true,
      hasWrongUsernamePassword: false,
      userNotFound: false,
      loggingIn: false,
      loginSuccess: false
    };
  },
  components: {
    InlineLoader
  },
  methods: {
    ...mapActions({ storeLogin: "login" }),
    login() {
      this.resetErrors();

      this.loggingIn = true;

      const username = this.lowerCaseUsername;
      this.storeLogin({ username, password: this.password })
        .then(() => {
          this.$router.push("/signup/org-creation");
          this.loginSuccess = true;
        })
        .catch(err => {
          if (err.code == "NotAuthorizedException") {
            this.hasWrongUsernamePassword = true;
          }
          if (err.code == "UserNotFoundException") {
            this.userNotFound = true;
          }
        })
        .finally(() => {
          this.loggingIn = false;
        });
    },
    signup() {
      const personInfo = {
        accountEmail: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      }
      People.postPerson(personInfo);
    },
    resetErrors() {
      this.hasWrongUsernamePassword = false;
      this.userNotFound = false;
    }
  },
  computed: {
    lowerCaseUsername() {
      return this.username.toLowerCase();
    },
    passwordType() {
      return this.showPassword ? "text" : "password";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-page {
  width: 100%;
  height: 100%;
  background: linear-gradient(#55C0E4, #004580);
  /* background: url(https://s3.wasabisys.com/cdn.togetheradmin.com/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
  padding-top: 30vh; */
}
#back-to-landing {
  color: black;
  cursor: pointer;
  font-size: 1rem;
}
h1 {
  font-family: Montserrat;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.23;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
}
#login-form {
  margin-top: 5vh;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#login-form form {
  width: 500px;
  color: #595c5f;
}
#login-form br {
  padding-bottom: 10px;
}
#login-form label {
  display: inline-block;
  padding-right: 10px;
  margin-bottom: 10px;
  width: 40%;
  text-align: right;
  font-size: 13px;
}
#login-form input {
  background: none;
  border: none;
  outline: none;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 40%;
  font-size: 13px;
}
#password-eye-icon {
  margin-left: 8px;
  cursor: pointer;
  font-size: 1em;
  position: absolute;
}
#login-form input::placeholder {
  color: #86898c;
}
#login-form button {
  margin-top: 10px;
  background: none;
  border: none;
  cursor: pointer;
}
#enter-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
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
#login-footer a {
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

#forgot-password {
  color: gray;
  cursor: pointer;
  font-size: 0.8rem;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  color: #ff7675;
  border: 1px #ff7675 solid;
  border-radius: 7px;
  max-width: 400px;
  margin: 1rem auto;
  padding: 1rem;

  font-size: 0.9rem;
}
.error i {
  margin-right: 1rem;
}
#form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 89%;
}
#signup-login-select {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
#signup-login-select label {
  font-weight: 700;
}
.basic-input {
  background: white;
  color: #b2b2b2;
  font-weight: 600;
  outline: none;
  width: 100%;
  padding: 0.45rem 0.7rem;
  font-size: 11px;
  line-height: 1.3;
  margin-bottom: 5px;
  resize: none;
  border-bottom: 2px #d4d4d4 solid;
  display: block;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}
.basic-input:focus {
  border-bottom: 3px solid #55c0e4;
}
.panel {
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 25px;
  margin: 15px 12px;
  box-shadow: 0px 5px 13px -2px #00000040;
  min-width: 350px;
  max-width: 350px;
  /* min-height: 600px; */
  background: white;
  /* ANIMATION */
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.basic-button {
  padding: 4px 38px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #55c0e4;
  text-decoration: none;
  outline: none;
}
#success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 550px;
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
  #login-page {
    /* background: white; */
    background-size: 50%;
    background-size: cover;
    background-position: center center;
  }
}

@media all and (max-width: 480px) {
  #login-page {
    /* background: white; */
    background-size: 50%;
    background-size: cover;
    background-position: center center;
  }
}
</style>
