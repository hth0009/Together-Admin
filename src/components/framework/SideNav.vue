<template>
  <div id="side-nav-wrapper">
    <i class="material-icons animated fadeIn black" v-show="drawerIsOpen" id="nav-arrow" @click="setDrawerIsOpen(false)">arrow_backwards</i>
    <i class="material-icons animated fadeIn black" v-show="!drawerIsOpen" id="nav-arrow" @click="setDrawerIsOpen(true)">arrow_forwards</i>
    <div id="side-nav" class="open" :class="{'open': drawerIsOpen, 'collapsed': !drawerIsOpen}">
      <a href="/#/app/people" :class="{'black': $route.path.startsWith('/app/people')}" id="people-nav-item">People</a>
      <a href="/#/app/teams" :class="{'black': $route.path.startsWith('/app/teams')}">Teams</a>
      <a href="/#/app/this-sunday" style="text-align: center" 
         :class="{'black': $route.path.startsWith('/app/this-sunday')}">This Sunday</a>
      <a href="/#/app/giving" :class="{'black': $route.path.startsWith('/app/giving')}">
        <i v-if='!drawerIsOpen' class="material-icons">favorite</i>
        <span v-else>Giving</span>
      </a>
      <a href="/#/app/more" :class="{'black': $route.name.startsWith('/app/more')}">
        <i v-if='!drawerIsOpen' class="material-icons">menu</i>
        <span v-else>More</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'SideNav',
  methods: {
    ...mapMutations(['setDrawerIsOpen']),
  },
  computed: {
    ...mapState(['drawerIsOpen']),
  }
}
</script>

<style scoped>
#nav-arrow {
  position: absolute;
  left: 1em;
  top: 1em;
  z-index: 99;
  cursor: pointer;
}

#side-nav {
  position: absolute;
  height: 95vh;
  background-color: #55C0E4;
  color: white;
  display: flex;
  flex-flow: column;
}
#side-nav.open {
  width: 10em;
  border-radius: 0 6em 6em 0;
  padding-right: 1em;
  align-items: flex-end;
}
#side-nav.collapsed {
  width: 5em;
  border-radius: 0 6em 6em 0;
  padding-right: 0em;
  align-items: center;
}
#side-nav > a {
  margin-bottom: 3em;
  color: white;
  font-weight: 600;
}
#people-nav-item {
  margin-top: 9em;
}
</style>