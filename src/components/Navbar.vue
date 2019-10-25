<template>
  <div id="navbar-container" v-bind:class="{'has-shadow': showShadow}">
    <div id="navbar-wrapper">
      <img
        id="together-badge"
        src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"
      />
      <div id="mvp-tag">MVP</div>
      <div id="router-links">
        <!-- <h1 id="product">Product</h1>
          <h1 id="pricing">Pricing</h1>
          <h1 id="media">Media</h1>
          <h1 id="story">Story</h1>
        <h1 id="contact-us">Contact Us</h1>-->
      </div>
      <div id="signup-login">
        <button
          id="signup"
          class="navbar-button gs-basic-button inverted"
          @click="openRegisterWindow"
        >SIGN UP</button>
        <router-link to="login" id="login" class="navbar-button gs-basic-button">LOGIN</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showShadow: false
    };
  },
  methods: {
    openRegisterWindow() {},
    onParentScroll(topScroll) {
      if (topScroll < this.displayScrollValue) {
        this.showShadow = false;
      } else {
        this.showShadow = true;
      }
    }
  },
  props: {
    displayScrollValue: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(
      function() {
        this.onParentScroll(window.scrollY);
        window.addEventListener(
          "scroll",
          function() {
            this.onParentScroll(window.scrollY);
          }.bind(this),
          false
        );
      }.bind(this)
    );
  }
};
</script>

<style>
#navbar-container {
  width: 100%;
  position: fixed;
  z-index: 900;
  box-shadow: 0px -1px 5px -5px #888888;
  transition: all 0.75s ease;
  background-color: white;
}
#navbar-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  max-width: calc(80rem - 7.5%);
  margin: 0px auto;
  padding: 10px 7.5%;
}
.has-shadow {
  box-shadow: 0px 1px 5px 0px #00000033 !important;
}
#together-badge {
  order: 0;
  height: 40px;
}
#mvp-tag {
  color: white;
  background-color: darkslategray;
  padding: 4px;
  font-size: .5em;
  font-weight: 500;
  border-radius: 6px;
}
#signup-login {
  flex-grow: 1;
  display: flex;
  order: 2;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.4rem;
}
#signup {
}
#login {
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
  font-size: 1rem;
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