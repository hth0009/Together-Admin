<template>
  <div id='home'>
    <div id="home-cards">
      <div class="card medium">
        <h4>Carousel</h4>
        <carousel>
          <div>hi
            <h1>hi</h1>
          </div>
          <div>hello</div>
          <div>bye</div>
          <input type="text" v-model="hi">
        </carousel>
      </div>
      <div class="card large">
        <notifications/>
      </div>
      <div class="card medium">
        <h4>People</h4>
        <people/>
      </div>
      <div class="card small">
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
import Carousel from '@/components/Carousel'
import Avatar from '@/components/Avatar'

  export default {
    name: 'Home',
    data () {
      return {
        teams: [],
        hi: 'hello',
        fields: { value: 'id',  text: 'name', index: 'selectedIndex'},
      }
    },
    components: {
      Notifications, People, PinnedEvents, Carousel, Avatar
    }
  }
</script>

<style scoped>
#home {
  height: 100%;
  overflow-y: auto;
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
  grid-column-end: span 3;
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
@media all and (max-width: 1600px) {
  .card.medium{
    grid-column-end: span 8;
  }
  .card.small{
    grid-column-end: span 4;
  }
}
@media all and (max-width: 1280px) {
  .card.card.medium{
    grid-column: 1 / -1;
  }
  .card.small{
    grid-column-end: span 6;
  }
}

@media all and (max-width: 1024px) {
  .card.small{
    grid-column: span 8;
  }
}

@media all and (max-width: 768px) {
  .card.card.small{
    grid-column: 1 / -1;
  }
}

@media all and (max-width: 480px) {
}
</style>