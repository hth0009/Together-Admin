<template>
  <div class="progress-bar-container">
    <div class="background-bar bar"></div>
    <div class="progress-bar bar"
      :style="{
        background: color,
        width: percent * 100 + '%',        
        'box-shadow': '0px 0px 8px 2px ' + color + '7c'
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  components: {
  },
  methods: {
  },
  props: {
    color: {
      type: String,
      default: '#0CD6D3'
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>

.progress-bar-container {
  position: relative;
  height: 7px;
}
.bar {
  height: 100%;
  border-radius: 10px;
  position: absolute;
  left: 0px;
  top: 0px;
}
.background-bar {
  background: #dddddd;
  width: 100%;
  z-index: 0;
}
.progress-bar {
  z-index: 20;
  transition: width .5s ease-in-out;
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