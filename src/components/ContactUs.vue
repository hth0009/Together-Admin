<template>
  <div id="contact-container">    
    <form @submit.prevent="sendMail" >
      <input id="form-name" class="gs-basic-input" name="name" type="text" v-model="name" required placeholder="Name">
      <input id="form-email" class="gs-basic-input" name="email" type="email" v-model="email" required placeholder="Email">
      <input id="form-org-name" class="gs-basic-input" name="org-name" type="text" v-model="orgName" placeholder="Organization Name">
      <textarea id="form-message" class="gs-basic-input" name="message" v-model="message" required placeholder="Message"/>
      <inline-loader v-show="loggingIn"></inline-loader>
      <button id="form-submit" class="gs-basic-button" type="submit">SUBMIT</button>
    </form>
  </div>    
</template>

<script>
import axios from 'axios'
import { SweetModal } from 'sweet-modal-vue'
import InlineLoader from '@/components/InlineLoader'

export default {
  data() {
    return {
      message: '',
      email: '',
      orgName: '',
      name: '',
      loggingIn: false
    }
  },
  components: {
    SweetModal,
    InlineLoader
  },
  methods: {
    async sendMail(){
      this.loggingIn = true;
      try {
        await axios.create().post('https://togetheradmin-contactus.prod.with-datafire.io/contact', {
          name: this.name,
          email: this.email,
          message: this.message
        });
        this.$emit('successfullySent')        
        window.scrollTo(0,0);
        this.message = ''
        this.email = ''
        this.orgName = ''
        this.name = ''
      }
      catch{(error) => {
        throw error;
      }}
      finally {
        this.loggingIn = false;
      }
    }
  }
}
</script>

<style >
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
   grid-template-rows: 1fr 1fr 5fr;
   grid-row-gap: 20px;
   grid-column-gap: 20px;
}
#contact-container .user-info:focus {
   border: 2px solid #55C0E4;
}
#contact-container #form-name {
   grid-column: 1/2;
   grid-row: 1 / 2;
}
#contact-container #form-email {
   grid-column: 2/3;
   grid-row: 1 / 2;
}
#contact-container #form-org-name {
   grid-column: 1 / 3;
   grid-row: 2 / 3;
}
#contact-container #form-message {
   grid-column: 1 / 3;
   grid-row: 3 / 4;
}
.inline-loader-container {
   grid-column: 1 / 3;
   grid-row: 4 / 5;
   justify-self: center;
}
#contact-container #form-submit { 
   grid-column: 1 / 3;
   grid-row: 5 / 6;
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