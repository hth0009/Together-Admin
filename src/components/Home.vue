<template>
  <div id='home'>
    <!-- <input-list class='col'></input-list>
    <input-list class='col'></input-list>
    <input-list class='col'></input-list> -->
  </div>
</template>

<script>
import InputList from '@/components/InputList'
  export default {
    name: 'Home',
    data () {
      return {
        
      }
    },
    components: {
      InputList
    }
  }
</script>

<style scoped>
#home {
  display: flex;
  direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 1%;
}
.col {
  width: 32%;
  margin: 20px 0px;
}
@media (max-width: 600px) {
  #home {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .col {
    width: 95%;
  }
}
</style>