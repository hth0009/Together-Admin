<template>
  <div class="cards">
    <div class="search-wrapper">
      <input type="text" class="basic-input"
        placeholder="search"
        v-model="cardSearch">
    </div>
    <div class="card-boxes" v-if="!loading">
    <div v-for="(card, index) in cardList" :key="card['id']">
      <div class="header"
        v-if="card['header'] && (index == 0 || cardList[index - 1].header != card.header)">{{card.header}}</div>
      <div
        class="card-box"
        :class="{
          unread: card['unread'] != undefined && card['unread'] > 0,
          selected: card['id'] == selectedID,
          'photo-header': card['photoHeader'] != undefined
        }"
        :style="{
          backgroundImage: card['photoHeader'] != undefined ? 'url(' + card['photoHeader'] + ')' : '',          
          color: card['color'] != undefined ? card['color'] : ''
        }"
        @click="selectCard(card['id'])">
          <div v-if="card['superscript']" class="superscript">{{card['superscript']}}</div>
          <div v-if="card['profile']" class="profile-pic" :style="{backgroundImage: 'url(' +  card['profile'] + ')'}"></div>
          <div class="card-info"
              :style="{
                backgroundImage: card['photoHeader'] != undefined ? 'url(' + card['photoHeader'] + ')' : ''
              }">
            <div class="title"> {{card['title']}} </div>
            <div v-if="card['subtext']" class="subtext"> {{card['subtext'].substring(0, 30) + ""}} </div>
            <div v-if="card['subtext2']" class="subtext-2"> {{card['subtext2'].substring(0, 30) + ""}} </div>
          </div>
          <div v-if="card['body']" class="body">
            {{card['body'].substring(0, 250) + ""}}
          </div>
          <div v-if="hasAddButtonOnCard"            
           :style="{
            boxShadow: card['color'] != undefined ? '0px 1px 4px ' + card['color'] + 'A5' : '',
            backgroundColor: card['color'] != undefined ? card['color'] : ''
            }" class="add-button">
            <i class="material-icons">add</i></div>
      </div>
    </div>
    </div>  
    <div class="card-boxes loading" v-if="loading">
      <div v-for="(card, index) in Array(17)" :key="index"
        class="card-box loading">
        <div class="profile-pic"></div>
      </div>
    </div>    
    <div id="add-new"
      v-if="hasAddNew"
      @click="addNew">
      <i class="material-icons noselect">add</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  data () {
    return {
      cardSearch: '',
    }
  },
  components: {
  },
  methods: {
    selectCard(id) {
      this.$emit('selected', id)
    },
    addNew() {
      this.$emit('onAddNew')
    }
  },
  props: {
    cardList: Array,
    selectedID: String,
    loading: {
      type: Boolean,
      default: true
    },
    hasAddNew: {
      type: Boolean,
      default: false
    },
    hasAddButtonOnCard: {
      type: Boolean,
      default: false
    },
    filters: {
      type: Array,
      default: function () { return [] }
    }
  },
  mounted() {    
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>

  .cards {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 48px auto;
    /* border-right: 1px #E6E9EC solid; */
  }
  .search-wrapper {
    /* border-bottom: 1px #E6E9EC solid; */
    height: 57px;
  }
  .search-wrapper .basic-input {
    margin-top: 10px;
    padding-left: 20px;
    width: calc(100% - 30px);
  }
  .card-boxes {
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 40px;
  }
  .card-boxes .header{
    /* text-align: center; */
    font-size: 18px;
    font-weight: 500;
    color: #636e72
  }
  .card-box {
    margin: 5px;
    /* height: 30px; */
    padding: 10px;
    border-radius: 5px;
    transition: all .3s ease;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    border-left: 2px white solid;
    cursor: pointer;
    position: relative;
    background-color: white;
  }
  .card-box.unread {
    border-left: 4px #69CDCF solid;
    padding-left: 8px;
  }
  .card-box.photo-header {
    padding: 0px;
    height: 150px;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    overflow: hidden;

    border-radius: 6px;
  }
  .card-box:hover {
    box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
  }
  .card-box.selected {
    box-shadow: 0px 2px 7px -1px rgba(128, 128, 128, 0.342);
  }
  .card-box .profile-pic {
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;

    margin-right: 10px;

    grid-column: 1/2;
    grid-row: 1/2;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .card-box .superscript {
    position: absolute;
    top: 3px;
    right: 3px;
    color: rgb(126, 126, 126);
    font-size: 12px;
  }
  .card-box .card-info{
    flex: 1;
    /* padding-left: 10px;  */

    grid-column: 2/3;
    grid-row: 1/2;
  }
  
  .card-box.photo-header .card-info{
    position: relative;
    z-index: 1;

    padding: 5px 10px;

    height: 100%;

    top: 105px;
    left: 0px;
    
    overflow: hidden;
  }
  .card-box .card-info::before{
    display: none;
  }
  .card-box.photo-header .card-info::before{
    width: 100%;
    height: 100%;
    overflow: hidden;
     
    z-index: 2;
    display: block;
    position: absolute;
    content: ' ';

    left: 0px;
    top: -5px;

    -webkit-filter: blur(6px);
    filter: blur(6px);
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.03);
    background-origin: center center;
    background-position: center -100px;
    opacity: 0.5;
    
    // transform: translateY(-100%) translateY(5em) translateZ(0);
    
    background-image: inherit;
  }
  .card-box .card-info::after{
    display: none;
  }
  .card-box.photo-header .card-info::after{
    width: 100%;
    height: 100%;
    overflow: hidden;
     
    z-index: 1;
    display: block;
    position: absolute;
    left: 0px;
    top: .25px;
    content: ' ';

    background: #464646;
  }
  
  .card-box .title{
    /* margin: 5px; */
    font-size: 12px;
    font-weight: 600;
    z-index: 10;
    position: relative;
    color: inherit;
  }
  .card-box.photo-header .title{
    font-weight: 600;
    font-size: 15px;
  }
  .card-box .subtext{
    font-size: 12px;
    z-index: 10;
    position: relative;
  }
  .card-box.photo-header .subtext{
    color: white;
    font-size: 10px;
    z-index: 10;
    position: relative;
  }
  .card-box.photo-header .subtext-2{
    color: white;
    font-size: 10px;
    opacity: .7;
    z-index: 10;
    position: relative;
  }
  .card-box .body {
    padding-top: 10px;

    grid-column: 2/3;
    grid-row: 2/3;

    font-size: .75em;
    z-index: 10;
    position: relative;
  }
  .card-box .add-button{
    background-color: inherit;
    color: white;
    height: 10px;
    width: 10px;
    border-radius: 8px;
    
    position: absolute;
    right: 10px;
    bottom: 12.5px;
    z-index: 50;

    padding: 8px;
    font-size: 10px;
  }
  .card-box .add-button i{
    font-size: 10px;
  }

  .card-wrapper {
    height: calc(100vh - 40px);
    position: relative;
    /* background: red; */
    flex: 1;
  }
  
#add-new {
  width: 25px;
  height: 25px;
  padding: 5px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #00cec9;
  border-radius: 50px;
  cursor: pointer;
  z-index: 100;
}

#add-new i {    
  color: white;
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
    cursor: default;
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
  .card-box.loading:nth-child(10) { animation-delay: 2.25s }
  .card-box.loading:nth-child(11) { animation-delay: 2.5s }
  .card-box.loading:nth-child(12) { animation-delay: 2.75s }
  .card-box.loading:nth-child(13) { animation-delay: 3s }
  .card-box.loading:nth-child(14) { animation-delay: 3.25s }
  .card-box.loading:nth-child(15) { animation-delay: 3.5s }
  .card-box.loading:nth-child(16) { animation-delay: 3.75s }
  .card-box.loading:nth-child(17) { animation-delay: 4s }
  .card-box.loading:nth-child(18) { animation-delay: 4.25s }
  .card-box.loading:nth-child(19) { animation-delay: 4.5s }
  .card-box.loading:nth-child(20) { animation-delay: 4.75s }
  .card-box.loading:nth-child(21) { animation-delay: 5s }
  .card-box.loading:nth-child(22) { animation-delay: 5.25s }
  .card-box.loading:nth-child(23) { animation-delay: 5.5s }

  
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