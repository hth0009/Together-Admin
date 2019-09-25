<template>
  <div id="login-page">
    <router-link to="/hello"  id="back-to-landing"><i class="material-icons">arrow_back</i></router-link>
    <h1 class="noselect">together</h1>
    <div id="login-form">
      <form v-on:submit.prevent="login">
        <label for="username">username:</label>
        <input v-model="username" type="username" name="username" placeholder="username">
        <br>
        <label for="password">password:</label>
        <input v-model="password" type="password" name="password" placeholder="password" autocomplete="password">
        <br>
        <button class="gs-basic-button">ENTER</button>
      </form>
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

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      hasWrongUsernamePassword: false,
      userNotFound: false,
    }
  },
  methods: {
    login: function () {
      this.resetErrors()
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
      })
    },
    resetErrors() {
      this.hasWrongUsernamePassword = false
      this.userNotFound = false
    }
  },
  computed: {
    lowerCaseUsername() {
      return this.username.toLowerCase()
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
  #login-form input::placeholder{
    color: #86898C;
  }
  #login-form button{
    margin-top: 10px;
    margin-right: 10px;
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
