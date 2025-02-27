<template>
  <div class="carousel-container">
    <div class="carousel-buttons noselect">
      <div v-for="index in numberOfCards" 
        :key="index" 
        class="carousel-button"
        :class="{
          'selected': index == selectedCard,
          'queued': selectedCard < index
          }"
        @click="changeCard(index)">
        {{ index }}
      </div>
    </div>
    <div class="carousel-cards-wrapper" ref="carouselCardWrapper">
      <div class="carousel-cards" ref="carousel"
        :style="{
          width: carouselWidth,
          left: xCoordinate,
          height: cardHeight != undefined ? cardHeight + 'px' : ''}"
        v-on:keydown.tab="stopScroll"
        v-on:scroll="stopScroll">
        <slot class="carousel-card"></slot>
      </div>
    </div>
    <div class="card-navigation">
      <button class="basic-button back" v-if="selectedCard > 1"
        @click="changeCard(selectedCard - 1)">
        < BACK
      </button>
      <button tabindex="0" class="basic-button next" v-if="selectedCard != numberOfCards"
        @click="changeCard(selectedCard + 1)">
        NEXT >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      numberOfCards: 0,
      carouselWidth: '100%',
      selectedCard: this.value,
      isMounted: false
    }
  },
  components: {
  },
  methods: {
    changeCard(index) {
      this.selectedCard = index
      this.$emit('input', this.selectedCard)
    },
    stopScroll(event) {
      var wrapperElement = this.$refs.carouselCardWrapper
      wrapperElement.scrollLeft = 0;
    },
    resize() {
      this.$nextTick(() => {
        this.numberOfCards = this.$refs.carousel.children.length
        this.carouselWidth = (this.numberOfCards * 100) + "%"
      })
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    cardHeight: Number
  },
  mounted() {
    this.resize()
  },
  computed: {
    xCoordinate() {
      return "-" + ((this.selectedCard - 1) * 100) + "%"
    }
  }
}
</script>

<style scoped>

.carousel-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.carousel-buttons {
  position: relative;
  padding-top: 10px; 
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10px;
}
.carousel-button {
  font-size: 14px;
  width: 30px;
  height: 30px;
  border-radius: 20px;

  margin-right: 10px;

  color: white;
  background-color: #55C0E4;
  
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: normal;

  cursor: pointer;

  transition: all .1s ease-out;
}
.carousel-button.selected {
  box-shadow: 0px 1px 6px 2px #00cecb77;
  background-color: #00dad6;
  margin-left: 3px; 
}
.carousel-button.queued {
  background: #81eeec;
  font-size: 12px;
  width: 25px;
  height: 25px;
  /* box-shadow: 0px 0px 0px 4px white inset; */
}
.carousel-button.queued:hover {  
  background-color: #55C0E4;
}
.carousel-cards-wrapper {
  width: 100%;
  position: relative;

  overflow: hidden;
}
.carousel-cards {
  display: flex;
  align-items: stretch;

  position: relative;
  left: 0%;

  transition: left .3s ease-out;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}
.carousel-cards > * {
  width: 100%;
  scroll-snap-align: center;
}
.card-navigation {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin-top: 20px;
}
.card-navigation .back{
  margin-right: auto;
}
.card-navigation .next {
  margin-left: auto;
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