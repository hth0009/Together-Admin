<template>
  <div id="navTabs">
    <a v-for="tab in tabs" :key="tab.id" 
       :class="{'gs-active': '/#' + $route.path === tab.href, 'gs-inactive': '/#' + $route.path !== tab.href}"
       class="nav-tab-button animated fadeInRight faster" :href="tab.href">
        {{tab.title}}
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          title: 'PRODUCT',
          href: '/#/hello/product',
        },
        {
          title: 'PRICE',
          href: '/#/hello/price',
        },
        {
          title: 'QUESTIONS',
          href: '/#/hello/questions',
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
  justify-content: flex-end;
  margin-right: 4em;
}
.nav-tab-button {
  display: flex;
  justify-content: center;
  font-weight: 700;
  padding: 1em;
  border-radius: 4px;
}
</style>