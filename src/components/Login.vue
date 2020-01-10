<template>
  <div id="login-page">
    <router-link to="/hello/welcome" id="back-to-landing">
      <i class="material-icons">arrow_back</i>
    </router-link>
    <div id="form-wrapper">
      <div class="panel gs-container" style="display:block;">
        <div id="signup-login-select">
          <label
            v-if="logInSelected"
            v-on:click="logInSelected=false"
            style="cursor:pointer;"
          >Sign Up</label>
          <label
            v-if="!logInSelected"
            v-on:click="logInSelected=false"
            style="color:#55C0E4;cursor:pointer;"
          >Sign Up</label>
          <label
            v-if="logInSelected"
            v-on:click="logInSelected=true"
            style="color:#55C0E4;cursor:pointer;"
          >Log In</label>
          <label
            v-if="!logInSelected"
            v-on:click="logInSelected=true"
            style="cursor:pointer;"
          >Log In</label>
        </div>
        <!-- <label>PERSONAL ACCOUNT</label> -->
        <div v-if="logInSelected">
          <form v-on:submit.prevent="login" style="margin:auto;">
            <div>
              <div class="gs-form-group">
                <input
                  type="username"
                  class="gs-basic-input"
                  placeholder="Username"
                  v-model="username"
                  name="username"
                />
              </div>
              <div class="gs-form-group">
                <input
                  :type="passwordType"
                  class="gs-basic-input"
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
              <div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">
                <div id="enter-btn-wrapper">
                  <button class="gs-basic-button">ENTER</button>
                </div>
                <div id="wrong-username-password" class="error" v-show="hasWrongUsernamePassword">
                  <i class="material-icons">error</i> Wrong password. Please try again.
                </div>
                <div id="user-not-found" class="error" v-show="userNotFound">
                  <i class="material-icons">error</i> This email or username was not found.
                </div>
              </div>
            </div>
          </form>
          <inline-loader v-show="loggingIn"></inline-loader>
        </div>
        <!-- <a @click="forgotPassword" id="forgot-password">Forgot password?</a> -->
        <div v-if="!logInSelected" style="text-align:center;">
          <div v-if="personSignUp">
            <label style="display:block;font-size:1rem;margin-bottom:0;">PERSONAL ACCOUNT CREATION</label>
            <label
              v-on:click="personSignUp = false"
              style="font-size:.7rem;cursor:pointer;text-decoration:underline #55C0E4;color:#55C0E4;"
            >registering an organization?</label>
            <form v-on:submit.prevent="login" style="margin:auto;">
              <div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="Name" name="Name" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="Email" name="Email" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="Username" name="Username" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="Password" name="Password" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="Birthday" name="Birthday" />
                </div>
                <div id="enter-btn-wrapper">
                  <button class="gs-basic-button">CONTINUE</button>
                </div>
              </div>
            </form>
          </div>
          <div v-if="!personSignUp">
            <label style="display:block;font-size:1rem;margin-bottom:0;">ORGANIZATION CREATION</label>
            <label
              v-on:click="personSignUp = true"
              style="font-size:.7rem;cursor:pointer;text-decoration:underline #55C0E4;color:#55C0E4;"
            >signing up as a user?</label>
            <form v-on:submit.prevent="login" style="margin:auto;">
              <div>
                <div class="gs-form-group">
                  <input
                    type="text"
                    class="gs-basic-input"
                    placeholder="Organization Name"
                    name="Organization Name"
                  />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="City" name="City" />
                </div>
                <div class="gs-form-group">
                  <input type="text" class="gs-basic-input" placeholder="State" name="State" />
                </div>
                <div class="gs-form-group">
                  <input
                    type="text"
                    class="gs-basic-input"
                    placeholder="501C3 Number"
                    name="501C3 Number"
                  />
                </div>
                <div
                  class="gs-form-group"
                  style="padding-top:0;display:flex;align-items:center;justify-content:center;"
                >
                  <input type="checkbox" />
                  <label style="font-size:.6rem;display:inline-block;margin:0 1rem;">
                    I've read and accept the
                    <span
                      style="cursor:pointer;text-decoration:underline #55C0E4;color:#55C0E4;"
                    >Terms and Conditions</span>
                  </label>
                </div>
                <div id="enter-btn-wrapper">
                  <button class="gs-basic-button">CONTINUE</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InlineLoader from "@/components/InlineLoader";
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
      showPassword: false,
      logInSelected: true,
      personSignUp: true,
      hasWrongUsernamePassword: false,
      userNotFound: false,
      loggingIn: false
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
        .then(() => this.$router.push("/app/people"))
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
    forgotPassword() {
      const { lowerCaseUsername, password } = this;
      const authenticationData = {
        Username: lowerCaseUsername,
        Password: password
      };
      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );
      const poolData = {
        UserPoolId: "us-east-2_th6kgbG7W",
        ClientId: "40ljk2uqsfr2rhuqascb564rlq"
      };
      const userPool = new CognitoUserPool(poolData);
      const userData = {
        Username: lowerCaseUsername,
        Pool: userPool
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.forgotPassword({
        onSuccess: function(result) {
          console.log("call result: " + result);
        },
        onFailure: function(err) {
          alert(err);
        },
        inputVerificationCode() {
          var verificationCode = prompt("Please input verification code ", "");
          var newPassword = prompt("Enter new password ", "");
          cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
      });
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
  /* background: url(https://s3.wasabisys.com/cdn.togetheradmin.com/login.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: left center;
  padding-top: 30vh; */
}
#back-to-landing {
  position: absolute;
  left: 2rem;
  top: 2rem;
  color: black;
  cursor: pointer;
  font-size: 1rem;
}
h1 {
  font-family: "Abril Fatface", serif;
  /* font-family: 'Sorts Mill Goudy', serif; */
  letter-spacing: 3px;
  font-weight: 100;
  color: #55c0e4;
  text-align: center;
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
  justify-content: flex-end;
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
  height: 100%;
}
#signup-login-select {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
}
#form-inputs {
  /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
}
.panel {
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 25px;
  margin: 15px 12px;
  box-shadow: 0px 5px 13px -2px #00000040;
  max-width: 550px;
  min-width: 400px;
  background: white;
  /* ANIMATION */
  animation: 0.5s ease-out 0s 1 fadeIn;
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
