<template>
  <div class="cards"
    :style="{maxHeight: 'calc(' + maxHeight + '% - 10px)',
      boxShadow: hasShadow ? '': 'none'}"
    :class="{'inline': inline}"
  >
    <div class="search-wrapper">
      <input type="text" class="basic-input"
        placeholder="search"
        v-if="hasSearch"
        v-model="cardSearch">
      <div class="filter-section-toggle" v-if="filters.length > 0">
        <i class="material-icons noselect" @click="toggleFilterSection = !toggleFilterSection"
          :class="{selected: toggleFilterSection}">filter_list</i>
      </div>
    </div>
    <div class="filter-wrapper">
      <div class="selected-filters" :class="{toggled: toggleFilterSection}">
        <div class="filters">
          <div v-for="(filterKey, index) in Object.keys(selectedFilters)" :key="index" class="filter" @click="toggleFilter(filterKey, selectedFilters[filterKey], '', '', '')"
            >
            <ejs-tooltip :position="'BottomCenter'" :content="filterHash[filterKey + selectedFilters[filterKey]].title">
              <i v-show="filterHash[filterKey + selectedFilters[filterKey]].icon != ''" class="material-icons noselect selected">{{filterHash[filterKey + selectedFilters[filterKey]].icon}}</i>
              <div class="short selected" v-show="filterHash[filterKey + selectedFilters[filterKey]].icon == ''">{{filterHash[filterKey + selectedFilters[filterKey]].short}}</div>
            </ejs-tooltip>
          </div>
        </div>
        <div class="clear" v-show="Object.keys(selectedFilters).length != 0" @click="selectedFilters = {}"><i class="material-icons noselect">close</i></div>
      </div>
      <div class="all-filters" :class="{toggled: toggleFilterSection}">
        <h3>Filters</h3>
        <div v-for="filterType in listFilters" :key="filterType.type">
          <h4> {{ filterType.type }}</h4>          
          <div class="filters">
            <div v-for="filter in filterType.options" :key="filter.value" class="filter" @click="toggleFilter(filterType.key, filter.value, filter.icon, filter.title, filter.short)">
              <ejs-tooltip :position="'BottomCenter'" :content="filter.title">
                <i v-show="filter.icon != ''" class="material-icons noselect"
                  :class="{selected: selectedFilters[filterType.key] === filter.value}">{{filter.icon}}</i>
                <div v-show="filter.icon == ''" class="short noselect"
                  :class="{selected: selectedFilters[filterType.key] === filter.value}">{{filter.short}}</div>
              </ejs-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-simplebar class="card-boxes"
      v-if="!loading"
      v-on:scroll="manageScroll">
    <div class="nothing-here noselect" v-if="filteredCards.length == 0 && !!!cardSearch">
      {{emptyMessage}}
    </div>
    <div class="card-wrapper" v-for="(card, index) in filteredCards" :key="card[fields.id]">
      <div class="header"
        v-if="card['header'] && (index == 0 || filteredCards[index - 1][fields.header] != card[fields.header])">{{card.header}}</div>
      <div
        class="card-box noselect"
        :class="{
          'not-selectable': !cardSelectable,
          unread: card[fields.unread] != undefined && card[fields.header] > 0,
          selected: card[fields.id] == highlightedID,
          'photo-header': card[fields.photoHeader] != undefined
        }"
        :style="{
          backgroundImage: card[fields.photoHeader] != undefined ? 'url(' + card[fields.photoHeader] + ')' : '',          
          color: card['color'] != undefined ? card['color'] : ''
        }"
        @click="selectCard(card['id'], card)">
          <!-- <div v-if="card['superscript']" class="superscript">{{card['superscript']}}</div> -->
          <avatar
            v-if="!noProfile"
            class="profile-pic"
            :height="30"
            :url="card[fields.profile]"
            :title="card[profilePicFillerValue]"/>
          <div class="card-info"
              :style="{
                backgroundImage: card[fields.photoHeader] != undefined ? 'url(' + card[fields.photoHeader] + ')' : ''
              }">
            <div class="title"> {{card[fields.title]}} </div>
            <div v-if="card[fields.subtitle]" class="subtext"> {{card[fields.subtitle].substring(0, 30) + ""}} </div>
            <div v-if="card[fields.subtitle2]" class="subtext-2"> {{card[fields.subtitle2].substring(0, 30) + ""}} </div>
          </div>
          <!-- <div v-if="card['body']" class="body">
            {{card['body'].substring(0, 250) + ""}}
          </div> -->
          <div v-if="hasButtonOnCard && !!!buttonColor"         
            @click="$emit('buttonClicked', card[fields.id])"   
           :style="{
            boxShadow: card[fields.color] != undefined ? '0px 1px 4px ' + card[fields.subtitle] + 'A5' : '',
            backgroundColor: card[fields.color] != undefined ? card[fields.color] : ''
            }" class="add-button">
            <i class="material-icons">{{buttonIcon}}</i></div>
          <div v-else-if="hasButtonOnCard"         
            @click="$emit('buttonClicked', card[fields.id])"   
           :style="{
            color: buttonColor,
            backgroundColor: card[fields.color] != undefined ? card[fields.color] : ''
            }" class="card-button">
            <i class="material-icons">{{buttonIcon}}</i></div>
      </div>
    </div>
    </div>  
    <div class="card-boxes loading" v-if="loading">
      <div v-for="(card, index) in Array(17)" :key="index"
        class="card-box loading">
        <div class="profile-pic"></div>
      </div>
    </div>    
    <div class="add-new"
      v-if="hasAddNew"
      @click="addNew">
      <i class="material-icons noselect">add</i>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: 'CardList',
  data () {
    return {
      cardSearch: '',
      filteredCards: [],
      maxHeight: 100,
      previousScroll: -1,
      highlightedID: -1,
      searchOptions: {
        shouldSort: true,
        threshold: .4,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [{
          name: this.fields.title,
          weight: 0.7
        }, {
          name: this.fields.subtitle,
          weight: 0.4
        }, {
          name: this.fields.subtitle2,
          weight: 0.3
        }]
      },
      listFilters: this.filters,
      selectedFilters: {},
      filterHash: {},
      toggleFilterSection: false
    }
  },
  components: {
    Avatar
  },
  methods: {
    selectCard(id, item) {
      if (!this.cardSelectable) {
        return
      }
      if (this.selectedID == id) {
        this.$emit('selected', '-1')
        return
      }
      this.highlightedID = id
      if (!this.returnObject) {
        this.$emit('selected', id)
      }
      else {
        this.$emit('selected', item)
      }
    },
    addNew() {
      this.$emit('onAddNew')
    },
    manageScroll({target: { scrollTop, clientHeight, scrollHeight}}) {
      const maxHeightFloor = 92.5;

      // Get Speed 
      const pad = 7.5
      const previousScroll = this.previousScroll === -1 ? 0 : this.previousScroll  
      const speed = Math.max(Math.abs(previousScroll - scrollTop) / 5, .5)
      // console.log(speed)
      if (scrollTop + clientHeight >= scrollHeight - 1 && this.maxHeight > maxHeightFloor) {
        this.maxHeight -= speed;
      }
      else if (scrollTop + clientHeight  <= scrollHeight - 40 && this.maxHeight < 100) {
        this.maxHeight += speed;
      }
      this.maxHeight = Math.max(Math.min(this.maxHeight, 100), maxHeightFloor)
      this.previousScroll = scrollTop
    },
    toggleFilter(key, value, icon, title, short) {
      console.log(key)
      if (this.selectedFilters[key] == value) {
        delete this.selectedFilters[key]
      }
      else {
        this.selectedFilters[key] = value
        this.filterHash[key + value] = {
          icon: icon,
          title: title,
          short: short
        }
      }
      this.selectedFilters = {...this.selectedFilters}
    },
    async filterAndSearchCards() {
      if (this.cardSearch == '') {
        this.filteredCards = this.cardList
      }
      else {
        await this.$search(this.cardSearch, this.cardList, this.searchOptions).then(results => {
          this.filteredCards = results
        })
      }
      if (this.hasDates) {
        this.filteredCards.sort(function(a, b) {
          a = new Date(a['startTime'])
          b = new Date(b['startTime'])
          return a - b
        });
      }
      this.filteredCards = this.filteredCards.filter(function(item) {
        for (var key in this.selectedFilters) {
          if (item[key] === undefined || item[key] != this.selectedFilters[key])
            return false;
        }
        return true;
      }.bind(this));
    }
    // manageScroll(event) {
    //   console.log(event)
    //   console.log('---------------')
    // }
  },
  props: {
    cardList: Array,
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
    selectedID: String,
    loading: {
      type: Boolean,
      default: true
    },
    noProfile: {
      type: Boolean,
      default: false,
    },
    emptyMessage: {
      type: String,
      default: 'nothing here',
    },
    hasShadow: {
      type: Boolean,
      default: true
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    hasAddNew: {
      type: Boolean,
      default: false
    },
    hasButtonOnCard: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: ''
    },
    buttonIcon: {
      type: String,
      default: 'add'
    },
    hasDates: {
      type: Boolean,
      default: false
    },
    profilePicFillerValue: {
      type: String,
      default: 'title'
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    cardSelectable: {
      type: Boolean,
      default: true
    },
    /*[
      {
        type: 'Type',
        key: 'subtext',
        options: [
          {
            value: 'Community Group',
            title: 'Public',
            icon: 'public'
          },
        ]
      }
    ]*/
    filters: {
      type: Array,
      default: function () { return [] }
    }
  },
  mounted() {
    this.filteredCards = this.cardList
  },
  computed: {
  },
  watch: {
    cardList: {
      handler(n, o) {
        this.filteredCards = this.cardList
        this.filterAndSearchCards()
      }, deep: true
    },
    cardSearch() {
      this.filterAndSearchCards()
    },
    selectedFilters: {
      handler(n) {
        this.filterAndSearchCards()
      }, deep: true
    },
    selectedID: {
      handler(n) {
        this.highlightedID = n
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .cards {
    max-height: calc(100% - 10px);
    margin: 10px 12px 0px 12px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0px, auto) auto minmax(0, 1fr);
    // box-shadow: 0px 2px 7px 0px #00000049;
    box-shadow: 0px 5px 13px -2px #00000040;
    background: none;
    border-radius: 10px;
    position: relative;
    border-bottom: 10px white solid;
    background: white;
    /* border-right: 1px #E6E9EC solid; */
  }
  .cards.inline {
    margin: 0px;
    border: none;
    // box-shadow: 0px 2px 7px 0px #00000049;
  }
  .search-wrapper {
    /* border-bottom: 1px #E6E9EC solid; */
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: grid;
    grid-template-columns: auto 50px;
  }
  .search-wrapper:empty {
    height: 0px;
  }
  .search-wrapper .basic-input {
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 0px;
    border-top-left-radius: 10px;
    // height: 30px;
  }
  .cards.inline .search-wrapper .basic-input {
    margin-top: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    border-top-left-radius: 0px;
  }
  .search-wrapper .filter-section-toggle {
    // padding-top: 5px;
    color: #00cec9;;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-wrapper .filter-section-toggle i{
    transition: all .3s ease;
    cursor: pointer;
  }
  .search-wrapper .filter-section-toggle .selected {
    transform: rotate(180deg)
  }
  .filters {
    padding: 5px;
    color: grey;
    display: grid;    
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    grid-auto-rows: 25px;
  }
  .filters:empty {
    padding: 0px;
  }
  .selected-filters {  
    display: grid;  
    grid-template-columns: auto 50px;
    grid-auto-rows: 1fr;
  }
  .selected-filters .clear{  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected-filters .clear i{  
    font-size: 15px;
    color: #666666
  }
  .all-filters {
    max-height: 0px;
    margin-bottom: 0px;
    padding: 0px;
    transition: max-height 0.15s ease-out, overflow-y 1s 1s ease, margin .15s ease-out, padding .0s .15s ease-in-out;
    overflow: hidden;
  }
  .all-filters.toggled {
    max-height: 500px;
    overflow-y: auto;
    margin-bottom: 25px;
    padding: 5px;
    transition: max-height 0.25s ease-in, overflow-y 1s 1s;
  }
  .all-filters h3, h4 {
    padding-left: 5px;
    margin-bottom: 5px;
    font-weight: 600;
    color: #555555
  }
  .filter {
    cursor: pointer;
  }
  .filter > div{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .filter .short {
    // font-size: 24px;
    font-weight: 500
  }
  .filter .short,
  .filter i {
    transition: color .2s ease;
    font-size: 22px;
  }
  .filter i.selected,
  .filter .short.selected {
    color: #00cec9;
  }
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
    background: white;
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
    // border-radius: 5px;
    transition: all .3s ease;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    // border-left: 2px white solid;
    cursor: pointer;
    position: relative;
    background-color: white;
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
    font-size: 11px;
    z-index: 10;
    position: relative;
    margin-bottom: 2px;
    font-weight: 600;
    color: #303030;
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
  
.add-new {
  width: 25px;
  height: 25px;
  padding: 5px;
  position: absolute;
  bottom: 10px;
  right: 20px;
  background: #00cec9;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
}

.add-new i {    
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