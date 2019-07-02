<template>
  <div class="event-teams-container">
    <div class="event-teams">
      <custom-radio v-model="teamIndex" :chips="true" :options="teamNames"></custom-radio>
    </div>
    <button class="basic-button icon"
      @click="addTeamToEvent()"><i class="material-icons">add</i></button>
  </div>
</template>

<script>
import CustomRadio from '@/components/CustomRadio'

export default {
  name: 'EventTeams',
  data () {
    return {
      selectedTeam: {},
      teams: this.value,
      teamIndex: 0,
      teamNames: []
    }
  },
  components: {
    CustomRadio
  },
  methods: {
    addTeamToEvent() {
      this.$root.$emit('addTeamToEvent', this.selectedTeam)
      this.$root.$emit('currentlyEditing', 'EVENT_TEAMS')
    },
    assignTeams(n) {
      this.teams = n
      this.teamNames = []
      for (let index = 0; index < n.length; index++) {
        const team = n[index];
        this.teamNames.push(team.teamName)
      }
    }
  },
  props: {
    value: {
      defualt: {
        type: Array,
        default: () => {return []}
      }
    }
  },
  mounted() {
    this.assignTeams(this.value)
  },
  computed: {
  },
  watch: {
    value: {
      handler(n) {
        this.assignTeams(n)
      }, deep: true
    }
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