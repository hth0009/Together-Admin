<template>
  <div id="nav" class="gs-flex-row">
    <div id="logo" class="gs-flex-row">
      <img id="together-badge"
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"
      />
      <div id="mvp-tag">BETA</div>
    </div>

    <div id="signup-login" class="gs-flex-row">
      <button id="signup" class="navbar-button gs-basic-button inverted"
              >
        SIGN UP
      </button>
      <router-link to="login" id="login" class="navbar-button gs-basic-button">LOGIN</router-link>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style scoped>
#nav {
  padding-top: 2em;
  height: 4em;
  width: 100%;
}
#logo {
  width: 20%;
  justify-content: flex-start;
  margin-left: 4em;
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
  margin-left: 1em;
}
#signup-login {
  width: 80%;
  justify-content: flex-end;
  margin-right: 4em;
}
</style>