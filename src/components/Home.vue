<template>
  <div id='home'>
    <h1>home</h1>
    <div id="home-cards">
      <div class="card large">
        <notifications/>
      </div>
      <div class="card medium">
        <h4>People</h4>
        <people/>
      </div>
      <div class="card medium">
        <h4>Pinned Events</h4>
        <pinned-events/>
      </div>
    </div>
  </div>
</template>

<script>

import Notifications from '@/components/Notifications'
import People from '@/components/People'
import PinnedEvents from '@/components/PinnedEvents'

  export default {
    name: 'Home',
    data () {
      return {
        teams: [],
        fields: { value: 'id',  text: 'name', index: 'selectedIndex'},
      }
    },
    components: {
      Notifications, People, PinnedEvents
    }
  }
</script>

<style scoped>
#home {
  height: 100%;
  overflow-y: auto;
  padding: 4% 2.5%;
}
#home-cards {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.card {  
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 30px 30px;
  margin: 10px;
  box-shadow: 0px 2px 10px -1px #0000003d;
}
.card h4{  
  font-weight: 600;
  font-size: 20px;
  color: #424242;
}
.card.large{
  grid-column: 1/-1;
}
.card.medium{
  grid-column-end: span 6;
}
.card.small{
  grid-column-end: span 4;
}
</style>