<template>
  <div class="cards">
    <div class="search-wrapper">
      <input type="text" class="basic-input"
        placeholder="search"
        v-model="cardSearch">
    </div>
    <div class="card-boxes" v-if="!loading">
      <div v-for="card in cardList" :key="card['id']"
        class="card-box"
        :class="{unread: card['unread'] != undefined && card['unread'] > 0,
        selected: card['id'] === selectedCardID}"
        @click="selectCard(card['id'])">
          <div v-if="card['profile']" class="profile-pic" :style="{backgroundImage: 'url(' +  card['profile'] + ')'}"></div>
          <div class="card-info">
            <div class="sender"> {{card['title']}} </div>
            <div v-if="card['subtext']" class="message"> {{card['subtext'].substring(0, 30) + ""}} </div>
          </div>
      </div>
    </div>    
    <div class="card-boxes loading" v-if="loading">
      <div v-for="(card, index) in Array(15)" :key="index"
        class="card-box loading">
        <div class="profile-pic"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  data () {
    return {
      cardSearch: '',
      selectedCardID: '',
    }
  },
  components: {
  },
  methods: {
    selectCard(id) {
      this.selectedCardID = id
      this.$emit('selected', id)
    }
  },
  props: {
    cardList: Array,
    loading: {
      type: Boolean,
      default: true
    },
  },
  mounted() {    
  },
  computed: {
  }
}
</script>

<style scoped>


  .cards {
    height: 100%;
    width: 250px;
    /* border-right: 1px #E6E9EC solid; */
  }
  .search-wrapper {
    border-bottom: 1px #E6E9EC solid;
    height: 57px;
  }
  .search-wrapper .basic-input {
    margin: 10px 0px;
  }
  .card-boxes {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc( 100% - 58px);
  }
  .card-box {
    margin: 5px;
    height: 30px;
    padding: 10px;
    transition: all .3s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-left: 2px white solid;
    cursor: pointer;
  }  
  .card-box.unread {
    border-left: 2px #69CDCF solid;
  }
  .card-box:hover {
    box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
  }
  .card-box.selected {
    box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
  }
  .card-box .profile-pic {
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;
    display: inline-flex;
    flex: 1;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .card-box .card-info{
    flex: 1;
    padding-left: 10px;
  }
  .card-box .sender{
    /* margin: 5px; */
    font-size: 12px;
    font-weight: bold;
  }
  .card-box .message{
    font-size: 12px;
  }

  
  .card-wrapper {
    height: calc(100vh - 40px);
    position: relative;
    /* background: red; */
    flex: 1;
  }


  

/* //////////////////////////
////  LOADING ANIMATION /////
////////////////////////// */

  @keyframes shadowFade {    
    0% { 
      box-shadow: 0px 1px 2px -2px rgba(128, 128, 128, 0.507);    
      animation-timing-function: ease-in-out;
      opacity: .5;
    }
    20% { 
      box-shadow: 0px 3px 4px -1px rgba(128, 128, 128, 0.507);   
      animation-timing-function: ease-in;   
      opacity: 1;
    }
    40% { 
      box-shadow: 0px 2px 2px -2px rgba(128, 128, 128, 0.507);     
      animation-timing-function: ease-out; 
      opacity: .5;
    }
    100% { 
      box-shadow: 0px 1px 2px -2px rgba(128, 128, 128, 0.507);    
      opacity: .5;
    }
  }

  .card-box.loading {    
    opacity: .5;
    animation: shadowFade 4s infinite;
  }  
  .card-boxes.loading {
    overflow: hidden;
  }
  .card-box.loading:nth-child(2) { animation-delay: .25s }
  .card-box.loading:nth-child(3) { animation-delay: .5s }
  .card-box.loading:nth-child(4) { animation-delay: .75s }
  .card-box.loading:nth-child(5) { animation-delay: 1s }
  .card-box.loading:nth-child(6) { animation-delay: 1.25s }
  .card-box.loading:nth-child(7) { animation-delay: 1.5s }
  .card-box.loading:nth-child(8) { animation-delay: 1.75s }
  .card-box.loading:nth-child(9) { animation-delay: 2s }
  .card-box.loading:nth-child(10) { animation-delay: 2.5s }
  .card-box.loading:nth-child(11) { animation-delay: 2.5s }
  .card-box.loading:nth-child(12) { animation-delay: 2.5s }
  .card-box.loading:nth-child(13) { animation-delay: 2.5s }
  .card-box.loading:nth-child(14) { animation-delay: 2.5s }

  
  .card-box.loading .profile-pic{  
    background-color: #00cec9;
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