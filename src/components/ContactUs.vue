<template>
    <div id="contact-container">
        <h1>CONTACT US</h1>
        <form action="https://togetheradmin-contactus.prod.with-datafire.io/contact" method="post">
           <input id="form-name" class="user-info" name="name" type="text" placeholder="Name">
           <input id="form-email" class="user-info" name="email" type="text" placeholder="Email">
           <textarea id="form-message" class="user-info" name="message" placeholder="Message"/>
           <input id="form-submit" class="user-info" type="submit" value="SUBMIT" @click="sendMail">
        </form>
    </div>
    
</template>

<script>
// const nodemailer = require('nodemailer');
export default {
   methods: {
      // sendMail(){
      //    var transporter = nodemailer.createTransport({
      //       service: 'gmail',
      //       auth: {
      //          user: 'droopydawg14@gmail.com',
      //          pass: 'Hammitime'
      //       }
      //    });
      //    var mailOptions = {
      //       from: 'droopydawg14@gmail.com',
      //       to: 'dhamiltonc00@gmail.com',
      //       subject: 'This a test',
      //       text: 'Dont believe me?'
      //    };
      //    transporter.sendMail(mailOptions, function(error, info){
      //       if (error) {
      //          console.log(error);
      //       } else {
      //          console.log('Email sent: ' + info.response);
      //       }
      //    });
      // }
   }
}
</script>

<style>
#contact-container h1 {
   text-align: center;
   font-weight: 400;
   font-size: 2.75rem;
   margin-bottom: 50px;
}
#contact-container form {
   display: grid;
   grid-template-columns: auto 20% 20% auto;
   grid-template-rows: 1fr 5fr 1fr;
   grid-row-gap: 20px;
   grid-column-gap: 20px;
}
#contact-container .user-info {
   border: 1px solid #707070;
   border-radius: 10px;
   font-family: 'Montserrat', sans-serif;
   font-size: 20px;
   padding: 15px;
   resize: none;
   outline: none;
   transition: border .2s ease;
}
#contact-container .user-info:focus {
   border: 2px solid #00cec9;
}
#contact-container #form-name {
   grid-column: 2 / 2;
   grid-row: 1 / 1;
}
#contact-container #form-email {
   grid-column: 3 / 3;
   grid-row: 1 / 1;
}
#contact-container #form-message {
   grid-column: 2 / 4;
   grid-row: 2 / 2;
}
#contact-container #form-submit {
   grid-column: 2 / 4;
   grid-row: 3 / 3;
   justify-self: center;
   background: white;
   padding: 15px 35px;
   border: 2px solid #00cec9;
   color: #00cec9;
   font-weight: 500;
   transition: background-color 0.2s ease;
}
#contact-container #form-submit:hover{
   color: white;
   background-color: #00cec9;
   cursor: pointer;
}
@media all and (max-width: 800px) {
      #contact-container form {
      grid-template-columns: auto 40% 40% auto;
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