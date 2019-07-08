<template>
  <transition name='fadeSlide'>
    <div class="static-header-container noselect" v-if="showHeader">
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      showHeader: this.display,
      parentDiv: null
    }
  },
  components: {
  },
  methods: {
    onParentScroll(topScroll) {
      if (topScroll < this.displayScrollValue) {
        this.showHeader = false
      }
      else {
        this.showHeader = true
      }
    }
  },
  props: {
    display: {
      type: Boolean,
      default: true
    },
    displayScrollValue: {
      type: Number,
      default: 0
    },
    parentDivID: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.parentDiv = document.getElementById(this.parentDivID)
    this.onParentScroll(this.parentDiv.scrollTop)
    this.parentDiv.addEventListener('scroll', function() {
      this.onParentScroll(this.parentDiv.scrollTop)
    }.bind(this), false)
  },
  created() {
    if (this.displayScrollValue > 0) {
      this.showHeader = false
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.static-header-container {
  background: #fffffff2;
  position: fixed;
  padding: 2em;
  left: inherit;
  right: inherit;
  top: 0%;
  z-index: 100;
  /* width: 50%; */
  backdrop-filter: blur(5px);
  /* box-shadow: 9px 2px 10px -1px #00000036; */
  /* clip-path:inset(0 0 -20px 0) */
  /* transform: translateX(-50%); */
}

.fadeSlide-enter-active, .fadeSlide-leave-active {
  transition: all .3s ease;
}

.fadeSlide-enter, .fadeSlide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  top: -40px;
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