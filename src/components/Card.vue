<template>
  <div class="my-card">
    <div class="card-wrapper">
      <div class="header"
        v-if="item['header'] && (index == 0 || filteredCards[index - 1][fields.header] != item[fields.header])">{{item.header}}</div>
      <div
        class="card-box noselect"
        :class="{
          'not-selectable': !cardSelectable,
          'unread': item[fields.unread] != undefined && item[fields.unread],
          'photo-header': item[fields.photoHeader] != undefined
        }"
        :style="{
          backgroundImage: item[fields.photoHeader] != undefined ? 'url(' + item[fields.photoHeader] + ')' : '',          
          color: item['color'] != undefined ? item['color'] : ''
        }"
        @click="selectCard(item)">
          <avatar
            v-if="!noProfile"
            class="profile-pic"
            :height="30"
            :url="item[fields.profile]"
            :title="item[profilePicFillerValue]"/>
          <div class="card-info"
              :style="{
                backgroundImage: item[fields.photoHeader] != undefined ? 'url(' + item[fields.photoHeader] + ')' : ''
              }">
            <div class="title"> {{item[fields.title]}} </div>
            <div v-if="item[fields.subtitle]" class="subtext"> {{item[fields.subtitle].substring(0, 30) + ""}} </div>
            <div v-if="item[fields.subtitle2]" class="subtext-2"> {{item[fields.subtitle2].substring(0, 30) + ""}} </div>
          </div>
          <!-- <div v-if="hasButtonOnCard && !!!buttonColor"         
            @click="$emit('buttonClicked', item[fields.id])"   
          :style="{
            boxShadow: item[fields.color] != undefined ? '0px 1px 4px ' + item[fields.subtitle] + 'A5' : '',
            backgroundColor: item[fields.color] != undefined ? item[fields.color] : ''
            }" class="add-button">
            <i class="material-icons">{{buttonIcon}}</i></div> -->
          <!-- <div v-else-if="hasButtonOnCard"         
            @click="$emit('buttonClicked', item[fields.id])"   
          :style="{
            color: buttonColor,
            backgroundColor: item[fields.color] != undefined ? item[fields.color] : ''
            }" class="card-button">
            <i class="material-icons">{{buttonIcon}}</i></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'Card',
  data () {
    return {
      highlighted: false,
    }
  },
  components: {
    Avatar
  },
  methods: {
    selectCard(item) {
      this.$emit('selected', this.item)
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
      },
    fields: 
    {
      type: Object,
      default: () => ({
        id: 'id',
        title: 'title',
        subtitle: 'subtext',
        subtitle2: 'subtext2',
        color: 'color',
        profile: 'profile',
        header: 'header',
        unread: 'unread',
        photoHeader: 'photoHeader'
      })
    },
    noProfile: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: 'nothing here',
    },
    inline: {
      type: Boolean,
      default: false
    },
    hasDates: {
      type: Boolean,
      default: false
    },
    profilePicFillerValue: {
      type: String,
      default: 'title'
    },
    cardSelectable: {
      type: Boolean,
      default: true
    },
  },
  mounted() {
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>

  .card-boxes {
    overflow-y: auto;
    // height: 100%;
    overflow-x: visible;
    padding-bottom: 40px;
    // margin-bottom: 10px;
    -webkit-overflow-scrolling: touch;
  }
  .cards.inline .card-boxes{
    padding-bottom: 0px;
  }
  .nothing-here {
    text-align: center;
    padding: 150px 0px;
  }
  .card-boxes .header{
    /* text-align: center; */
    font-size: .9rem;
    font-weight: 600;
    color: #636e72;
    padding: 5px 10px;
  }
  .card-wrapper {
    overflow: visible;
    background: inherit;
  }
  // .card-wrapper:last-child {
  //   padding-bottom: 30px;
  //   border-bottom-right-radius: 10px;
  //   border-bottom-left-radius: 10px;
  //   margin-bottom: 40px;
  // }
  .card-box {
    // margin: 5px 0px;
    /* height: 30px; */
    padding: 14px;
    overflow: hidden; 
    // border-radius: 5px;
    transition: all .3s ease;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    // border-left: 2px white solid;
    cursor: pointer;
    position: relative;
    background-color: inherit;
  }
  .card-box.unread {
    border-left: 2px #69CDCF solid;
    padding-left: 10px;
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
    background-color: #f3f3f3;
    box-shadow: 0px 3px 7px -6px #8080804f;
  }
  .card-box.not-selectable {
    padding-left: 0px;
    cursor: default;
  }
  .card-box.not-selectable:hover {
    background-color: white;
    box-shadow: 0px 3px 7px -6px #8080804f;
  }
  .card-box.selected {
    box-shadow: 0px 4px 7px -4px #80808057 inset;
    background: #f3f3f3;
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
    color: #7e7e7e;
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
    font-size: 13px;
    font-weight: 600;
    z-index: 10;
    position: relative;
    color: inherit;
  }
  .card-box.photo-header .title{
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 2px;
  }
  .card-box .subtext{
    font-size: 12px;
    z-index: 10;
    position: relative;
    margin-bottom: 2px;
    font-weight: 500;
    color: #303030;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap;
  }
  .card-box .subtext-2{
    font-size: 10px;
    z-index: 10;
    position: relative;
    margin-bottom: 2px;
    font-weight: 600;
    color: #838383;
  }
  .card-box.photo-header .subtext{
    color: white;
    font-size: 10px;
    z-index: 10;
    font-weight: 600;
    position: relative;
  }
  .card-box.photo-header .subtext-2{
    color: white;
    font-size: 10px;
    opacity: .7;
    z-index: 10;
    font-weight: 500;
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
  .card-box .card-button{
    
    position: absolute;
    right: 10px;
    bottom: 12.5px;
    z-index: 50;

    padding: 8px;
    cursor: pointer;
  }
  .cards.inline .card-box .card-button{
    right: 0px;
  }
  .card-box .card-button i{
    font-size: 1rem;
    font-weight: bold;
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