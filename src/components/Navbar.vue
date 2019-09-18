<template>
   <div id="navbar-wrapper" :class="{'has-shadow': showShadow}">
      <img id="together-badge" src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"/>
      <div id="router-links">
         <h1 id="product">Product</h1>
         <h1 id="pricing">Pricing</h1>
         <h1 id="media">Media</h1>
         <h1 id="story">Story</h1>
         <h1 id="contact-us">Contact Us</h1>
      </div>
      <div id="signup-login">
         <button id="signup" class="navbar-button" @click="openRegisterWindow">SIGN UP</button>
         <router-link to="login" id="login" class="navbar-button">LOGIN</router-link>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {
         showShadow: false
      }
   },
   methods: {
    onParentScroll(topScroll) {
       console.log(topScroll)
       console.log(this.displayScrollValue)
       console.log(this.showShadow)
      if (topScroll < this.displayScrollValue) {
        this.showShadow = false
      }
      else {
        this.showShadow = true
      }
    }
  },
   props: {
      displayScrollValue: {
         type: Number,
         default: 0
      },
      parentDivID: {
         type: String,
         default: ''
      }
   },
   mounted() {
      this.$nextTick(function() {
      this.parentDiv = document.getElementById(this.parentDivID)
      this.onParentScroll(this.parentDiv.scrollTop)
      this.parentDiv.addEventListener('scroll', function() {
        this.onParentScroll(this.parentDiv.scrollTop)
      }.bind(this), false)
      console.log(this.parentDiv)
   }.bind(this))
   }
};
</script>

<style>
   .navbar-button {
      outline: none;
      font-family: 'Montserrat';
      font-size: 1.4rem;
      background: #00cec9;
      color: white;
      border: none;
      cursor: pointer;
      padding: 8px 18px 8px 18px;
      border-radius: 12px;
      transition: all .2s ease;
      font-weight: 500;
      margin-right: 30px;
   }
   #navbar-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      background-color: white;
      position: fixed;
      width: 100%;
      z-index: 900;
   }
   .has-shadow {
      box-shadow: 3px 1px 5px #888888;
   }
   #together-badge {
      order: 0;
      height: 50px;
      margin: 15px 20px 15px 100px;
   }
   #signup-login {
      flex-grow: 1;
      display: flex;
      order: 2;
      justify-content: flex-end;
      align-items: center;
      font-size: 1.4rem;
      margin-right: 100px;
   }
   #signup {
      
   }
   #login {
      background: white;
      color: #00cec9;
      border: 2px solid #00cec9;
      text-decoration: none;
   }
   #router-links {
      order: 1;
      flex-grow: 2;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
   }
   #router-links h1 {
      color: #00cec9;
      font-size: 1.4rem;
      font-weight: 500;
      margin: 0 1vw;
   }
   #product {
      order: 0;
   }
   #pricing {
      order: 1;
   }
   #media {
      order: 2;
   }
   #story {
      order: 3;
   }
   #contact-us {
      order: 4;
   }
</style>