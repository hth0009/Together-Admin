<template>
  <div class="app-page">
    <i class="material-icons animated fadeIn" v-show="drawerIsOpen" id="nav-arrow" @click="closeDrawer()">arrow_backwards</i>
    <i class="material-icons animated fadeIn" v-show="!drawerIsOpen" id="nav-arrow" @click="openDrawer()">arrow_forwards</i>
    <div id="side-nav">
      <a href="/#/app/people" id="people-nav-item">People</a>
      <a href="/#/app/teams">Teams</a>
      <a href="/#/app/this-sunday">This Sunday</a>
    </div>

    <div id="top-nav">
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

    <div id="app-page-content">
      <router-view></router-view>
      <div
        style="overflow-y: auto; height: calc(100vh - 40px)"
        v-if="$route.params.subpage == 'this-sunday'"
      >
        <event-details></event-details>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';
import Avatar from "@/components/Avatar";

export default {
  data() {
    return {
      showChurch: false,
      showName: false,
      drawerIsOpen: true,
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
    closeDrawer() {
      this.drawerIsOpen = false;
    },
    openDrawer() {
      this.drawerIsOpen = true;
    }
  },
  components: {
    Avatar,
  },
  computed: {
    ...mapState(['church', 'personID']),
    ...mapState('people', ['person']),
    routeNameWithoutListInName() {
      return this.$route.name.replace(' List', '');
    }
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
.app-page {
  height: 100%;
}

#nav-arrow {
  position: absolute;
  left: 1em;
  top: 1em;
  z-index: 99;
  cursor: pointer;
}

#side-nav {
  position: absolute;
  width: 10em;
  height: 95vh;
  background-color: #55C0E4;
  border-radius: 0 6em 6em 0;
  color: white;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  padding-right: 1em;
}
#side-nav > a {
  margin-bottom: 3em;
  color: white;
  font-weight: 600;
}
#people-nav-item {
  margin-top: 9em;
}

#top-nav {
  position: absolute;
  width: 100%;
  padding-left: 13em !important;
  padding-top: 3em !important;
}

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


#app-page-content {
  padding-left: 12em !important;
  padding-top: 8em !important;
}
#app-page-content >>> .main-wrapper {
  display: grid;
  grid-template-columns: 250px auto;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app-page-content >>> .page-wrapper {
  display: grid;
  grid-template-columns: 240px auto;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0px 3px;
}
#app-page-content >>> .page-wrapper.three-rows {
  grid-template-columns: 240px minmax(auto, 500px) auto;
}

  #app-page-content >>> .card-list-wrapper {
    overflow-y: auto;
    width: 100%;
    position: relative;
    padding: 0px 15px;
    /* border-right: 1px #E6E9EC solid; */
  }
  #app-page-content >>> .page-card-wrapper {
    height: calc(100vh - 0vh);
  }
  
  /* #app-page-content >>> .card-explanation ~ .card-header {
    margin-bottom: 0px;
  } */
#app-page-content >>> .card-explanation {
  font-size: 0.9rem;
  color: #a1a1a1;
  margin-bottom: 10px;
  font-weight: 500;
  opacity: inherit;
}
#app-page-content >>> .input-label {
  font-size: 0.8rem;
  color: #8d8d8d;
  margin-top: 10px;
  font-weight: 400;
  opacity: inherit;
}
#app-page-content >>> .section-header {
  color: #505050;
  font-size: 1rem;
  font-weight: 600;
  margin: 35px 0px 5px 0px;
}
#app-page-content >>> .section-info {
  color: #6b6b6b;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0px 0px 10px 0px;
}

#app-page-content >>> .card-item {
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-gap: 10px;
  align-items: center;
}
#app-page-content >>> .card-item .label {
  display: inline-flex;
  vertical-align: middle;

  color: #505050;
  font-size: 1rem;
  font-weight: 600;
  justify-self: flex-end;
}
#app-page-content >>> .card-item .label i {
  font-size: 1rem;
  margin-right: 2.5px;
  color: #d3d3d3;
  line-height: normal;
}
#app-page-content >>> .item-description {
  color: #6b6b6b;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 20px 0px 10px 0px;
}

#app-page-content >>> .selected-view {
  /* margin-top: 40px; */
  /* padding: 0px 15px; */
  position: relative;
  /* height: calc(100vh - 80px); */
  overflow-y: auto;
  /* max-width: 600px; */
  min-width: 490px;
}
#app-page-content >>> .selected-view h1,
#app-page-content >>> .selected-view h2,
#app-page-content >>> .selected-view h3,
#app-page-content >>> .selected-view h4,
#app-page-content >>> .selected-view h5 {
  font-weight: 600;
}
#app-page-content >>> .selected-view .header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 5px auto 15px auto 5px;
  margin: 40px 0px 0px 10px;
}
#app-page-content >>> .selected-view .static-header {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  align-items: center;
  padding: 15px 20px;
  width: 100%;
}
#app-page-content >>> .selected-view .header .profile-pic {
  grid-row: 1/5;

  margin: 7.5px;
  margin-right: 15px;
}

#app-page-content >>> .selected-view .header h3 {
  grid-row: 2;
  grid-column: 2;
  padding-top: 10px;
  font-size: 32px;
}

#app-page-content >>> .selected-view h3,
#app-page-content >>> .selected-view .subtitle {
  margin-left: 15px;
}
#app-page-content >>> .selected-view .profile-pic + h3,
#app-page-content >>> .selected-view .profile-pic + h3 + .subtitle {
  margin-left: 0px;
}
#app-page-content >>> .selected-view .subtitle {
  grid-row: 3;
  grid-column: 2;
  font-size: 18px;
  font-weight: 600;
  color: #707070;
}
#app-page-content >>> .selected-view .quick-actions {
  margin-left: 20px;
  display: flex;
  justify-content: flex-end;
}
#app-page-content >>> .selected-view .quick-actions button {
  background: none;
  box-shadow: none;
  text-shadow: none;
  color: #d3d3d3;
  padding: 0px;
  margin-right: 10px;
}
#app-page-content >>> .selected-view .quick-actions button:hover {
  color: #00cec9;
}
#app-page-content >>> .selected-view .quick-actions button.red:hover {
  color: #ff7675;
}
#app-page-content >>> .selected-view .details {
  max-width: 600px;
  min-width: 400px;
}
#app-page-content >>> .selected-view .panel {
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 25px;
  margin: 15px 12px;
  box-shadow: 0px 5px 13px -2px #00000040;
  max-width: 550px;
  min-width: 400px;
  background: white;

  /* ANIMATION */
  animation: 0.5s ease-out 0s 1 fadeIn;
}
#app-page-content >>> .fadeOut-leave-active {
  transition: opacity 1s ease, transform 1s ease-in;
}
#app-page-content >>> .fadeOut-leave-to {
  opacity: 0;
  transform: translateY(0px);
}

#app-page-content >>> .selected-view .panel h4 {
  font-size: 20px;
  color: #424242;
  margin-bottom: 10px;
  opacity: inherit;
}
#app-page-content >>> .selected-view .panel .explanation {
  font-size: 16px;
  color: #a1a1a1;
  margin-bottom: 10px;
  margin-left: 10px;
  opacity: inherit;
}
#app-page-content >>> .selected-view .panel .item {
  margin: 0px 0px 10px 10px;
  display: flex;
  align-items: flex-end;
  opacity: inherit;
}
#app-page-content >>> .selected-view .panel .item i {
  font-size: 18px;
  margin-right: 7.5px;
  color: #e7e7e7;
  margin-top: 1px;
}
#app-page-content >>> .selected-view .panel .item .label {
  font-size: 18px;
  display: inline-flex;
  vertical-align: middle;

  margin-right: 7.5px;
  color: #4e4e4e;
  font-weight: 500;
}
#app-page-content >>> .selected-view .panel .item .content {
  flex: 1;
}

#app-page-content >>> .new-item {
  display: grid;
  height: calc(100vh - 50px);
  grid-template-rows: 70px auto 70px;
  grid-template-columns: 1fr 15fr;
  align-items: center;
  /* justify-content: center; */
  margin: 25px;
  max-width: 600px;
}
#app-page-content >>> .new-item .title {
  grid-column: 1/3;
  grid-row: 1;
  font-size: 1.7rem;
  margin: 20px;
  color: #7a7a7a;
  font-weight: 600;
}
#app-page-content >>> .new-item .footer {
  height: 60px;
  padding: 5px;
  grid-row: 3;
  grid-column: 1/3;
  justify-self: flex-end;
}
#app-page-content >>> .new-item .details {
  overflow: hidden;
  grid-column: 2;
  grid-row: 2;
  width: 90%;
  max-width: 500px;
  max-height: 100%;
  /* overflow-y: auto; */
}
#app-page-content >>> .new-item .profile-pic {
  grid-row: 1/5;

  width: 65px;
  height: 65px;
  border-radius: 50%;

  margin: 7.5px;
  margin-right: 15px;

  background-color: red;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  cursor: pointer;
}

#app-page-content >>> .new-item .type {
  margin: 10px 0px;
  width: 100%;
}
#app-page-content >>> .new-item .new-item-card {
  height: 350px;
}
#app-page-content >>> .new-item .section-header {
  /* margin-top: 10px;
    color: #555555;
    font-size: 2rem;
    font-weight: 600; */
}
#app-page-content >>> .new-item .section-header-info {
  margin-bottom: 20px;
  padding-top: 5px;
  color: #818181;
  font-size: 0.9rem;
  font-weight: 600;
}
#app-page-content >>> .new-item .item-description {
  margin-bottom: 20px;
  color: #9c9c9c;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 5px;
}

#app-page-content >>> .editing-panel-wrapper {
  height: 100vh;
  overflow: auto;
}

#app-page-content >>> .editing-panel {
  position: relative;
  /* left: 30px; */
  border-radius: 10px;
  padding: 25px;
  margin: 5vh 12px 4vh 12px;
  /* height: calc(90vh - 60px); */
  box-shadow: 0px 3px 13px -2px #00000040;
  max-width: 550px;
  min-width: 350px;
  background: white;
}

/* //////////////////////////
//////  MEDIA QUERIES ///////
////////////////////////// */

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - desktop (default grid)
   1024-768    - tablet landscape
   768-480     - tablet 
   480-less    - phone landscape & smaller
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
}

@media all and (min-width: 768px) and (max-width: 1024px) {
}

@media all and (min-width: 480px) and (max-width: 768px) {
  #app-page-content >>> .card-list-wrapper {
    padding-top: 35px;
  }
}

@media all and (max-width: 480px) {
  #app-page-content >>> .main-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  #app-page-content >>> .page-wrapper {
    grid-template-columns: 1fr 0px;
    height: calc(100vh - 35px);
    margin-top: 35px;
  }
  #app-page-content >>> .page-card-wrapper {
    padding-top: 0px;
  }
  #app-page-content >>> .card-list-wrapper {
    margin-top: 35px;
  }
  #app-page-content >>> .card-list-wrapper.inactive {
    margin-top: 0px;
    display: none;
  }
}
</style>