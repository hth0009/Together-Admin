<template>
  <div id="nav" class="gs-flex-row">
    <div @click="goToWelcomePage" id="logo" class="gs-flex-row">
      <div class="blue-circle-logo">
        <img id="together-badge"
            src="https://togethercdn.global.ssl.fastly.net/assets/t-logo-small-white.png"
        />
      </div>
      <div id="mvp-tag">BETA</div>
    </div>

    <div id="nav-tabs-wrapper">
      <nav-tabs/>
    </div>

    <div id="signup-login" class="gs-flex-row">
      <router-link to="/signup" id="signup" class="navbar-button gs-basic-button inverted"
              >
        SIGN UP
      </router-link>
      <router-link to="/login" id="login" class="navbar-button gs-basic-button">LOGIN</router-link>
    </div>
  </div>
</template>
<script>
import NavTabs from '@/components/splash/NavTabs'
export default {
  methods: {
    goToWelcomePage() { this.$router.push('/hello/welcome'); },
  },
  components: {
    NavTabs
  },
}
</script>

<style scoped>
#nav {
  padding-top: 2em;
  height: 6em;
  width: 100%;
}
#logo {
  flex: 1 1 1;
  justify-content: flex-start;
  cursor: pointer;
}
.blue-circle-logo {
  height: 40px;
  padding: 10px;
  background-color: #00C2E8;
  border-radius: 1em;
}
#together-badge {
  order: 0;
  height: 20px;
}
#mvp-tag {
  color: white;
  padding: 4px;
  font-size: .7em;
  font-weight: 500;
  border-radius: 6px;
  margin-left: 1em;
}
#nav-tabs-wrapper {
  flex: 1 1 0;
}
#signup-login {
  justify-content: flex-end;
  flex: 1 1 1;
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
}

@media all and (max-width: 480px) {
}
</style>