<template>
  <div class="event-teams-container">
    <add-team-to-event
      v-if="addingTeam"/>
  </div>
</template>

<script>

import AddTeamToEvent from '@/components/AddTeamToEvent'  

export default {
  name: 'EventTeams',
  data () {
    return {
      addingTeam: true,
    }
  },
  components: {
    AddTeamToEvent
  },
  methods: {
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