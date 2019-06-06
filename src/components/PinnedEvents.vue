<template>
  <div class="pinned-events-container">
    <div class="list-wrapper">
      <card-list
        :cardList="events"
        :hasAddButtonOnCard="true"
        :loading="false"/>
    </div>
  </div>
</template>

<script>
import CardList from '@/components/CardList'

export default {
  name: '',
  data () {
    return {
      events: [
        {
          id: 1,
          title: 'Sunday Service',
          subtext: 'SEP 28',
          subtext2: '8AM, 10AM, 5PM',
          photoHeader: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          color: '#A29BFE'
        },        
        {
          id: 2,
          title: 'Sunday Service',
          subtext: 'SEP 28',
          subtext2: '8AM, 10AM, 5PM',
          photoHeader: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          color: '#A29BFE'
        },        
        {
          id: 3,
          title: 'Sunday Service',
          subtext: 'SEP 28',
          subtext2: '8AM, 10AM, 5PM',
          photoHeader: 'https://images.unsplash.com/photo-1522707294573-ac6be4588663?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
          color: '#A29BFE'
        }
      ]
    }
  },
  components: {
    CardList
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

.list-wrapper {
  width: 265px;
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
@media all and (min-width: 1024px) and (max-width: 1280px) {
 }

@media all and (min-width: 768px) and (max-width: 1024px) {
 }

@media all and (min-width: 480px) and (max-width: 768px) {
 }

@media all and (max-width: 480px) {
 }
</style>