<template>
  <div class="me-container">
    <div class="me-wrapper">
      <div class="me-header">
        <div></div>
        <div class="logout">
          <button @click="logout" class="basic-button">logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  components: {
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
        console.log('logged out')
      })
    }
  },
  props: {
  },
  mounted() {
  },
  computed: {
  }
}
</script>

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
.logout .basic-button {  
  color: #d63031;
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