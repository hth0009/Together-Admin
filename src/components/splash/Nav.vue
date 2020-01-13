<template>
  <div id="nav" class="gs-flex-row">
    <div @click="goToWelcomePage" id="logo" class="gs-flex-row">
      <img id="together-badge"
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"
      />
      <div id="mvp-tag">BETA</div>
    </div>

    <div id="nav-tabs-wrapper">
      <nav-tabs v-show="showNavTabs"/>
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
  data() {
    return {
      showNavTabs: false,
    }
  },
  methods: {
    goToWelcomePage() { this.$router.push('/hello/welcome'); },
    setShowNavTabsBasedOnRoute(routeName) { this.showNavTabs = routeName !== 'Welcome'; }
  },
  components: {
    NavTabs
  },
  mounted () {
    this.setShowNavTabsBasedOnRoute(this.$route.name);
  },
  watch: {
    $route(to) {
      this.setShowNavTabsBasedOnRoute(to.name); 
    },
  }
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
#together-badge {
  order: 0;
  height: 70px;
}
#mvp-tag {
  color: white;
  background-color: darkslategray;
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