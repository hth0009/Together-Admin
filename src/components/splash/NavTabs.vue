<template>
  <div id="navTabs">
    <a v-for="tab in tabs" :key="tab.id" v-show="tab.show" 
       class="nav-tab-button animated fadeInRight faster" :href="tab.href" :style="tab.style.backgroundColor">
      <span :style="tab.style.color">
        {{tab.title}}
      </span> 
    </a>
    <a :href="backHREF" class="nav-tab-button"  style="background-color: rgb(85, 192, 228, .25)" 
       v-show='showBack'>
      <span style="color: #55C0E4;">
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
  right: 0;
  top: 6em;
}
.nav-tab-button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 5em;
  width: 21em;
  border-radius: 2em;
  padding-left: 1em;
  margin-bottom: 8px;
  margin-right: -2em;
  font-size: 6pt;
  font-weight: 700;
  border: none;
  cursor: pointer;
}
</style>