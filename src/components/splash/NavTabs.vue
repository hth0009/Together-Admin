<template>
  <div id="navTabs">
    <a v-for="tab in tabs" :key="tab.id" 
       class="nav-tab-button animated fadeInRight faster" :href="tab.href" :style="tab.style.backgroundColor">
      <span :style="tab.style.color">
        {{tab.title}}
      </span> 
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBack: false,
      backHREF: '',
      tabs: [
        {
          title: 'HOW DOES IT WORK',
          href: '/#/hello/how-does-it-work',
          style: {
            color: {
              'color': '#6C5CE7',
            },
          }
        },
        {
          title: 'WHAT DOES IT COST',
          href: '/#/hello/cost',
          style: {
            color: {
              'color': '#D63031',
            },
          }
        },
        {
          title: 'STILL HAVE QUESTIONS',
          href: '/#/hello/still-have-questions',
          style: {
            color: {
              'color': '#00B894',
            },
          },
        },
      ],
    }
  },
}


</script>

<style scoped>
#navTabs {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-tab-button {
  margin: 0em 3em !important;
}
</style>