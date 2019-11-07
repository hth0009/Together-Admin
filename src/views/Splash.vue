<template>
<div id="splash-view" class="animated fadeIn fast">
  <nav-bar class="mb2em"/>
  <div id="main-focus-view">
    <router-view/>
    <nav-tabs></nav-tabs>
  </div>

</div>
</template>

<script>
import NavBar from '@/components/splash/Nav'
import NavTabs from '@/components/splash/NavTabs'
export default {
  components: {
    NavBar, NavTabs
  }
}
</script>

<style scoped>
#splash-view {
  min-height: 100%;
}
#main-focus-view {
  width: 85%;
  height: 80vh !important;
  margin-left: 5%;
}

</style>