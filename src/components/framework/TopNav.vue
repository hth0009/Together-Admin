<template>
  <div id="top-nav" 
       :class="{'open': $store.state.drawerIsOpen, 'collapsed': !$store.state.drawerIsOpen}">
    <b-row style="align-items: center;" class="animated fadeIn faster">
      <b-col md="6" id="nav-page-header">

        <div id="nav-name-title" class="gs-flex-row animated fadeIn faster" v-show="showName">
          <div>
            <h3 class="black">{{person.fullName}}</h3>
            <p class="black pl4"><strong>Your Page</strong></p>
          </div>
          <button @click="logoutAndGoBackToLogin()" class="gs-basic-button red ml4em">LOG OUT</button>
        </div>

        <div id="nav-church-title" v-show="showChurch">
          <h3 class="black">{{church.name}}</h3>
          <p class="black pl4"><strong>{{routeNameWithoutListInName}}</strong></p>
        </div>

      </b-col>
      <b-col md="6" class="black" id="nav-top-right">
        <strong style="font-size: 14pt !important">Welcome Back, {{ person.firstName }}</strong>
        <img
          class="noselect ml1em"
          id="app-page-logo"
          :height="50"
          src="https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small-noborder.png"
        />
        <router-link to="/app/my-church" class="noselect">
          <avatar :height="50" class="ml1em" :url="church.churchImageThumbnailURL" :title="church.nickname" />
        </router-link>
        <div id="message-circle-wrapper">
          <i class="material-icons">send</i>
        </div>
        <router-link to="/app/me" class="noselect">
          <avatar :height="70" :url="person.personImageThumbnailURL" :title="person.personName" />
        </router-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

import Avatar from "@/components/Avatar";

export default {
  name: 'TopNav',
  data() {
    return {
      showChurch: false,
      showName: false,
    }
  },
  watch: {
    $route(to, from) {
      this.setShowChurchAndShowNameBasedOnRouteName(to.name);
    }
  },
  methods: {
    ...mapActions(['getChurch', 'logout']),
    ...mapActions('people', ['getPerson']),
    ...mapMutations('people', ['setPerson']),
    setShowChurchAndShowNameBasedOnRouteName(routeName) {
      if(routeName === 'Me') { 
        this.showName = true;
        this.showChurch = false;
        return;
      }
      this.showName = false;
      this.showChurch = true;
    },
    logoutAndGoBackToLogin() {
      this.logout();
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(['church', 'personID']),
    ...mapState('people', ['person']),
    routeNameWithoutListInName() {
      return this.$route.name.replace(' List', '');
    }
  },
  components:{
    Avatar,
  },
  async mounted () {
    this.setShowChurchAndShowNameBasedOnRouteName(this.$route.name);
    this.getChurch();
    await this.getPerson(this.personID);
    this.setPerson(this.person.people)
  },
}
</script>

<style scoped>
#top-nav {
  position: absolute;
  width: 100%;
  padding-top: 3em !important;
}
#top-nav.open { padding-left: 13em !important; }
#top-nav.collapsed { padding-left: 7em !important; }

#nav-top-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-flow: row nowrap;
  padding-right: 2em;
}

#nav-top-right > #message-circle-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1.5em;
  width: 60px;
  height: 60px;
  border-radius: 6em;
  box-shadow: 0px 5px 13px -2px #00000040;
}
</style>