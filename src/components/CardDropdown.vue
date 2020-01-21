<template>
  <div class="dropdown-wrapper" 
      v-on-clickaway="closeDropdown">
    <div class="input-wrapper"
      :class="{'item-selected': hasSelectedItem}"
    >   
      <avatar
        v-if="hasSelectedItem"
        class="profile-pic"
        :height="30"
        :url="selectedCard[fields.profile]"
        :title="selectedCard[profilePicFillerValue]"/>
      <input type="text" :class="inputCSSClass"
        :readonly="readonly"
        ref="searchInput"
        class="search-input"
        @focus="openDropdown"
        @keydown="cycleThroughList"
        v-on:keyup.enter="onCardSelected(filteredCards[focus])"
        v-model="listSearch"
      >
      <i class="material-icons clear-input noselect"
        v-show="hasSelectedItem && !readonly"
        @click="clearInput"
      >close</i>
    </div>
    <ul class="cards"
      :style="{boxShadow: hasShadow ? '': 'none'}"
      v-if="showDropdown"
      tabindex="0"
      ref="cardList"
    >
      <li        
        class="card-wrapper" v-for="(card, index) in filteredCards" :key="index"
        :ref="'items' + index"
        :class="{ focus: index === focus }"
      >
      <card
        :item="card"
        :fields="fields"
        @selected="onCardSelected"
      />
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Card from '@/components/Card'

import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'CardDropdown',
  data () {
    return {
      listSearch: '',
      showDropdown: false,
      filteredCards: [],
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
      selectedCard: {},
      hasSelectedItem: false,
      focus: null,
    }
  },
  components: {
    Avatar, Card
  },
  mixins: [clickaway],
  methods: {
    onCardSelected(item) {
      if (this.readonly) {
        return
      }
      this.listSearch = item[this.fields.title]
      this.selectedCard = {...item}
      this.hasSelectedItem = true
      this.closeDropdown()
      this.$refs.searchInput.blur()
      this.$emit('selected', item)  
    },
    clearInput() {
      this.selectedCard = {}
      this.listSearch = ''
      this.hasSelectedItem = false
    },
    openDropdown() {
      if (this.readonly) {
        return
      }
      this.showDropdown = true
    },
    closeDropdown() {
      this.showDropdown = false
    },
    cycleThroughList: function(event) {
      if (this.readonly) {
        return
      }
      switch (event.keyCode) {
        case 38:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus > 0) {
            this.focus--;
          }
          this.scrollToIndex('items', this.focus)
          break;
        case 40:
          if (this.focus === null) {
            this.focus = 0;
          } else if (this.focus < this.items.length - 1) {
            this.focus++;
          }
          this.scrollToIndex('items', this.focus)
          break;
      }
    },
    scrollToIndex(sufix, index) {
      const refTitle = sufix + index
      const element = this.$refs[refTitle][0]
      element.scrollIntoView({behavior: "smooth"})
    },
    async filterAndSearchCards() {
      if (this.listSearch == '') {
        this.filteredCards = [...this.items]
      }
      else {
        await this.$search(this.listSearch, this.items, this.searchOptions).then(results => {
          this.filteredCards = results
        })
      }
      if (this.alphabetical) {
        this.filteredCards.sort((a, b) => {
          var textA = a[this.fields.title].toUpperCase();
          var textB = b[this.fields.title].toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
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
  },
  props: {
    inputCSSClass: String,
    items: Array,    
    selectedItem: {
      defualt: {
        type: Object,
        default: () => {return {}}
      }
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
    loading: {
      type: Boolean,
      default: false
    },
    readonly: false,
    alphabetical: {
      type: Boolean,
      default: false
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
            selectedCard: 'Community Group',
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
    this.filteredCards = this.items
    this.filterAndSearchCards()
    this.selectedCard = {...this.selectedItem}
  },
  computed: {
  },
  watch: {
    selectedItem: {
      handler(n, o) {
        if (!n[this.fields.id]) {
          return
        }
        this.onCardSelected(n)
        this.selectedCard = {...n}
        console.log(n)
      }, deep: true
    },
    items: {
      handler(n, o) {
        this.filteredCards = [...this.items]
        this.filterAndSearchCards()
      }, deep: true
    },
    listSearch: {
      handler(n, o) {        
        this.filterAndSearchCards()
        if (this.hasSelectedItem && n != this.selectedCard[this.fields.title]) {
          this.hasSelectedItem = false
        }
        this.focus = 0
        this.$refs.cardList.scrollTop = 0
        console.log(this.$refs.cardList.scrollTop)
      }
    },
    selectedFilters: {
      handler(n) {
        this.filterAndSearchCards()
      }, deep: true
    },
    selectedItem: {
      handler(n) {
        if (n != undefined) {          
          this.hasSelectedItem = true
          this.listSearch = n[this.fields.title]
        }
        else {
          this.hasSelectedItem = false
          this.listSearch = ''
        }
        this.selectedCard = n
      }, deep: true
    }
  }
}
</script>

<style lang="scss" scoped>

.profile-pic {
  position: absolute;
  top: 14px;
  left: 14px;
}
.search-input {
  transition: all .3s ease, padding-left 0s
}
.input-wrapper.item-selected .search-input {
  padding: 20px 40px 20px 52.5px;
  line-height: 1rem;
  font-weight: 600;
}
.clear-input {
  position: absolute;
  top: 20px;
  right: 14px;
  font-size: 22px;
  cursor: pointer;
}
.dropdown-wrapper {
  position: relative;
}
.cards {
  max-height: 15rem;
  display: grid;
  // box-shadow: 0px 2px 7px 0px #00000049;
  box-shadow: 0px 5px 13px -2px #00000040;
  background: none;
  border-radius: 10px;
  border-bottom: 10px white solid;
  background: white;
  overflow-y: auto;
  /* border-right: 1px #E6E9EC solid; */
  
  position: absolute;
  width: 100%;
}
.card-boxes {
  overflow-y: auto;
  // height: 100%;
  overflow-x: visible;
  // margin-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}
.card-wrapper {
  position: relative;
  transition: all .3s ease;
}
.card-wrapper.focus {
  background: #eeeeee;
}
.nothing-here {
  text-align: center;
  padding: 150px 0px;
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