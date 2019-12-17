<template>
<div id="splash-view" class="animated fadeIn fast">
  <nav-bar class="mb2em"/>
  <div id="main-focus-view">
    <router-view/>
  </div>

</div>
</template>

<script>
import NavBar from '@/components/splash/Nav'
export default {
  components: {
    NavBar, 
  }
}
</script>

<style scoped>
#splash-view {
  min-height: 100%;
  padding: 0 10% !important;
  background: linear-gradient(#55C0E4, #004580);
}

</style>