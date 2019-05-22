<template>
  <div id='home'>
    <notifications/>
  </div>
</template>

<script>

import Notifications from '@/components/Notifications'

  export default {
    name: 'Home',
    data () {
      return {
        teams: [],
        fields: { value: 'id',  text: 'name', index: 'selectedIndex'},
      }
    },
    components: {
      Notifications
    }
  }
</script>

<style scoped>
#home {
  padding: 30px
}
</style>