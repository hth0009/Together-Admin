<template>
  <div id="navTabs">
    <a v-for="tab in tabs" :key="tab.id" v-show="tab.show" 
       class="nav-tab-button animated fadeInRight faster" :href="tab.href" :style="tab.style.backgroundColor">
      <span :style="tab.style.color">
        {{tab.title}}
      </span> 
    </a>
    <a :href="backHREF" class="back-button animated fadeInRight faster"  
       style="background-color: rgb(85, 192, 228, .25); color: #55C0E4;" 
       v-show='showBack'>
      <i class="material-icons" id="back-arrow">arrow_backward</i>
      <span>
        BACK
      </span> 
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBack: false,
      tabsToShow: [],
      backHREF: '',
      tabs: [
        {
          title: 'HOW DOES IT WORK ???',
          href: '/#/hello/how-does-it-work',
          show: true,
          style: {
            backgroundColor: {
              'background-color': 'rgb(93, 0, 255, .25)',
            },
            color: {
              'color': '#6C5CE7',
            },
          }
        },
        {
          title: 'WHAT DOES IT COST ???',
          href: '/#/hello/cost',
          show: true,
          style: {
            backgroundColor: {
              'background-color': 'rgb(255, 0, 137, .25)',
            },
            color: {
              'color': '#D63031',
            },
          }
        },
        {
          title: 'STILL HAVE QUESTIONS ???',
          href: '/#/hello/still-have-questions',
          show: true,
          style: {
            backgroundColor: {
              'background-color': 'rgb(85, 239, 196, .25)',
            },
            color: {
              'color': '#00B894',
            },
          },
        },
      ],
    }
  },
  mounted() {
    this.filterTabs(this.$route);
  },
  methods: {
    filterTabs(to) {
      this.showBack = to.name !== 'Welcome';
      if(to.name === 'Welcome') { 
        this.setTabsShowAttr(true, true, true, false)
      }
      if(to.name === 'How Does It Work') { 
        this.setTabsShowAttr(false, true, true, '/#/hello/welcome')
      }
      if(to.name === 'Cost') {
        this.setTabsShowAttr(false, false, true, this.tabs[0].href)
      }
      if(to.name === 'Still Have Questions') { 
        this.setTabsShowAttr(false, false, false, this.tabs[1].href)
      }
    },
    setTabsShowAttr(tab0Show, tab1Show, tab2Show, backHREF) {
      this.tabs[0].show = tab0Show;
      this.tabs[1].show = tab1Show; 
      this.tabs[2].show = tab2Show;
      this.backHREF = backHREF;
    }
  },
  watch: {
    $route (to) {
      this.filterTabs(to);
    }
  }
}


</script>

<style scoped>
#navTabs {
  overflow: hidden;
  position: absolute;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  right: 0;
  top: 6em;
}
.nav-tab-button, .back-button {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 6em;
  border-radius: 2em;
  padding-left: 1em;
  margin-bottom: 8px;
  margin-right: -5em;
  font-size: 9pt;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
.nav-tab-button { 
  width: 22em;
}
.back-button {
  width: 16em;
  margin-left: 6em;
}
#back-arrow {
  width: 1.5em;
  font-size: 12pt;
}
</style>