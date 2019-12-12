<template>
  <div id="navTabs">
    <a v-for="tab in tabs" :key="tab.id" :class="{'active-bg': '/#' + $route.path === tab.href}"
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
      tabs: [
        {
          title: 'HOW DOES IT WORK',
          href: '/#/hello/how-does-it-work',
          style: {
            color: {
              'color': '#FDBCBC',
            },
          }
        },
        {
          title: 'WHAT DOES IT COST',
          href: '/#/hello/cost',
          style: {
            color: {
              'color': '#D2D1CC',
            },
          }
        },
        {
          title: 'STILL HAVE QUESTIONS',
          href: '/#/hello/still-have-questions',
          style: {
            color: {
              'color': '#FFFFFF',
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
  display: flex;
  justify-content: center;
  font-weight: 700;
  padding: 1em;
  border-radius: 4px;
}
.active-bg {
  background-color: #37474F;
}
</style>