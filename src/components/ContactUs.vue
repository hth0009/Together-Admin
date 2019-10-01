<template>
  <div id="contact-container">
    <form @submit.prevent="sendMail" >
      <input id="form-name" class="gs-basic-input" name="name" type="text" v-model="name" required placeholder="Name">
      <input id="form-email" class="gs-basic-input" name="email" type="text" v-model="email" required placeholder="Email">
      <textarea id="form-message" class="gs-basic-input" name="message" v-model="message" required placeholder="Message"/>
      <button id="form-submit" class="gs-basic-button" type="submit">SUBMIT</button>
    </form>
  </div>    
</template>

<script>
import axios from 'axios'
// const nodemailer = require('nodemailer');
export default {
  data() {
    return {
      message: '',
      email: '',
      name: ''
    }
  },
  methods: {
    async sendMail(){
      // var API = axios.create({
      //   baseURL: 'https://togetheradmin-contactus.prod.with-datafire.io',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   }
      // })
      // API.post('contact', {
      //   message: this.message,
      //   email: this.email,
      //   name: this.name
      // })
      axios.create().post('https://togetheradmin-contactus.prod.with-datafire.io/contact', {
        name: this.name,
        email: this.email,
        message: this.message
      }).then(function () {
        alert('Your form was submitted!');
      }).error((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style>
#contact-container {
  width: 100%;
  max-width: 700px;
  margin: 0px auto;
}
#contact-container h1 {
   text-align: center;
   font-weight: 400;
   font-size: 2.75rem;
   margin-bottom: 50px;
}
#contact-container form {
  width: 100%;
   display: grid;
   grid-template-columns: 1fr 1fr;
   grid-template-rows: 1fr 5fr 1fr;
   grid-row-gap: 20px;
   grid-column-gap: 20px;
}
#contact-container .user-info:focus {
   border: 2px solid #00cec9;
}
#contact-container #form-name {
   grid-column: 1/2;
   grid-row: 1 / 1;
}
#contact-container #form-email {
   grid-column: 2/3;
   grid-row: 1 / 1;
}
#contact-container #form-message {
   grid-column: 1 / 3;
   grid-row: 2 / 2;
}
#contact-container #form-submit { 
   grid-column: 1 / 3;
   grid-row: 3 / 3;
   justify-self: center;
}
@media all and (max-width: 800px) {
      #contact-container form {
      grid-template-columns: 1fr 1fr;
   }
}
@media all and (max-width: 425px) {
   #contact-container form {
      display: flex;
      flex-direction: column;
   }
   #contact-container .user-info {
      margin-bottom: 20px;
   }
   #contact-container #form-message {
      height: 200px;
   }
}
</style>