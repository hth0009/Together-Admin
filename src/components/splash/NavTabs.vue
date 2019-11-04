<template>
  <div id="navTabs">
    <a href="/#/hello/how-does-it-work" class="nav-tab-button" style="background-color: rgb(93, 0, 255, .25)">
      <span style="color: #6C5CE7;">
        HOW DOES IT WORK ???
      </span> 
    </a>
    <a href="/#/hello/cost" class="nav-tab-button" style="background-color: rgb(255, 0, 137, .25)">
      <span style="color: #D63031;">
        WHAT DOES IT COST ???
      </span> 
    </a>
    <a href="/#/hello/still-have-questions" class="nav-tab-button"  style="background-color: rgb(85, 239, 196, .25)">
      <span style="color: #00B894;">
        STILL HAVE QUESTIONS ???
      </span> 
    </a>
    <a @click="goBack()" class="nav-tab-button"  style="background-color: rgb(85, 239, 196, .25)" 
       v-if='showBack'>
      <span style="color: #00B894;">
        BACK
      </span> 
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBack: false,
    }
  },
  mounted() {

  },
  watch: {
    $route (to, from) {
      console.log(to);
      console.log(from);
      if(this.to === '') {
        this.showBack = true;
      }
    }
  }
}
</script>

<style scoped>
#navTabs {
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-flow: column;
  right: 0;
  top: 6em;
}
.nav-tab-button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 5em;
  width: 21em;
  border-radius: 2em;
  padding-left: 1em;
  margin-bottom: 8px;
  margin-right: -2em;
  font-size: 6pt;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
</style>