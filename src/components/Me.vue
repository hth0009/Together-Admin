<template>
  <div class="me-container">
    <div class="me-wrapper">
      <div class="header"> 
          <div class="profile-pic">
            <avatar
              :height="100"
              :url="me.personImageThumbnailURL"
              :title="me.fullName"/>
          </div>
          <h3>{{me.firstName + ' ' + me.lastName}}</h3>
          <h3>{{me.accountEmail}}</h3>
          <div class="subtitle" v-if="!!me.account">{{me.account.username !== '' ? '@' + me.account.username : ''}}</div>
      </div>
      <div class="me-header">
        <div></div>
        <div class="logout">
          <button @click="logout" class="basic-button red">LOGOUT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../store'
import People from '../services/people'
import Avatar from '../components/Avatar'
export default {
  name: '',
  data () {
    return {
      meID: '',
      myTeams: '',
      me: ''
    }
  },
  components: {
    Avatar
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
        console.log('logged out')
      })
    },
    async getMe () {
      const response = await People.getPerson(Store.state.personID)
      this.me = response['person']
    }
  },
  props: {
  },
  mounted() {
    this.getMe()
  },
  computed: {
    
  }
}
</script>

<style src="./../assets/css/general-style.css"></style> 

<style scoped>

.me-container {
  height: 100%;
}
.me-wrapper {
  display: grid;
  grid-template-rows: 50px auto;
}
.me-header {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px 1fr;
  padding: 10px 0px;
}
.logout {
  cursor: pointer;

  display: grid;
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
 }

@media all and (max-width: 480px) {
 }
</style>