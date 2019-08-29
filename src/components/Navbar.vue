<template>
  <div id="navbar-wrapper">
    <img id="together-badge" src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"/>
    <div id="router-links">
      <h1 id="product">Product</h1>
      <h1 id="pricing">Pricing</h1>
      <h1 id="media">Media</h1>
      <h1 id="story">Story</h1>
      <h1 id="contact-us">Contact Us</h1>
    </div>
    <div id="signup-login">
      <button id="signup" class="navbar-button" @click="openRegisterWindow">Sign Up</button>
      <router-link to="login" id="login" class="navbar-button">Log In</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
   .navbar-button {
      font-family: 'Montserrat';
      font-size: 1.6rem;
      background: #00cec9;
      color: white;
      border: none;
      cursor: pointer;
      padding: 12px 25px 12px 25px;
      border-radius: 30px;
      transition: all .2s ease;
      font-weight: 600;
      margin-right: 30px;
   }
   #navbar-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
   }
   #together-badge {
      order: 0;
      height: 100px;
      margin: 20px 40px;
   }
   #signup-login {
      flex-grow: 1;
      display: flex;
      order: 2;
      justify-content: flex-end;
      align-items: center;
      font-size: 1.6rem;
   }
   #signup {
      
   }
   #login {
      background: white;
      color: #00cec9;
      border: 1px solid #00cec9;
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
      font-size: 1.6rem;
      font-weight: 500;
      margin: 0 2vw;
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