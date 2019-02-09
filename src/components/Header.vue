<template>
  <div id="navbar">
    <router-link to="" class="noselect brand"><img :src="'/static/image/white-logo.png'" alt=""></router-link>
      <div id="navbar-buttons">
      <router-link to="/home" class="noselect">home</router-link>
      <span>|</span>
      <router-link to="/app" class="noselect">app</router-link>
      <span>|</span>
      <router-link to="/calendar" class="noselect">events</router-link>
      <span>|</span>
      <router-link to="/categories" class="noselect">categories</router-link>
    </div>
    <!-- <span>|</span><router-link to="sermons" class="noselect">sermons</router-link>
    <span>|</span><router-link to="groups" class="noselect">groups</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#navbar {
  width: 100%;
  height: 40px;
  /* padding-top: 10px; */
  display: flex;
  background: #f8f7f6;
  position: fixed;
  top: 0px;
  flex-direction: row;
  box-shadow: 0px 7px 11px -6px rgba(53, 53, 53, 0.295);
  z-index: 900;
}
#navbar-buttons {  
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;  
  margin-right: 25px;
}
#navbar-buttons a{
  color: #444444;
  text-decoration: none;
  margin: 5px;
  display: inline-block;
  font-size: 15px;
}
#navbar-buttons span{
  color: #cfcfcf;
  padding: 0px 3px;
  font-size: 20px;
}
#navbar .brand{
  background: #1b1b1b;
  /* background: black; */
  justify-self: flex-start;
  position: absolute;
  height: 40px;
  width: 40px;
  margin-left: 15px;
}
#navbar .brand img{
  height: 20px;
  width: 20px;
  margin-left: 10px;
  margin-top: 10px;
  image-rendering: crisp-edges;
}
</style>
