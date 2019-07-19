<template>
  <div class="loading-container">
    <div id="loading-wrapper">      
      <transition name="fade-background">
        <div id="loading-screen" v-if="loading">
        </div>
      </transition>
      <transition name="rise">
        <div id="loading-widget"  v-if="loading">
          <!-- loading -->
          <img src="https://togethercdn.global.ssl.fastly.net/assets/t-logo-small-white.png" style="width: 60px; height: auto">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    loading: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>


.fade-background-enter-active, .fade-background-leave-active {
  transition: all .5s;
}
.fade-background-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.rise-enter-active, .rise-leave-active {
  transition: all .5s;
}
.rise-enter{
  opacity: .5;
  /* bottom: -40px; */
  /* height: 80px;
  width: 80px; */
}
.rise-leave-to  {
  opacity: 0;
  transform: scale(.75)
}

#loading-screen {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vw;
  background-color: #ffffffda;
  z-index: 999;
  animation: .75s ease-out 0s 1 fallIn;
  box-shadow: 0px 0px 1000px 0px white;
}

@keyframes fallIn {
  0% {
    top: -130%
  }
}

@keyframes fadeIn {
  0% {
    /* opacity: .5; */
    background: white;
    box-shadow: 0px -3px 0px -4px #00000049;
    width: 0px;
    height: 0px;
  }
  25% {   
    width: 50px;
    height: 50px;
    /* top: 55.75% */
  }
  45% {    
    /* top: 50.5%; */
    box-shadow: 0px -3px 0px -4px #00000049;
  }
  50% {    
    width: 120px;
    height: 120px;
  }
  65% {
    width: 100px;
    height: 100px;
  }
  100% {
    background: #0cd6d3;
    /* transform: translateZ(0px);   
    transform: translateY(0px); */
  }
}

#loading-widget {  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
  width: 100px;
  height: 100px;
  z-index: 1000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  border: 7px white solid;

  box-shadow: 0px 3px 12px -3px #00000048;

  background: linear-gradient(90deg, #0cd6d3, #0cd6d3, #05e0a2, #05e0a2, #0cd6d3, #0cd6d3);
  background-size: 500% 500%;

  -webkit-animation: 1s cubic-bezier(0,.25, 1,.75) infinite green-blue-gradient, .5s ease-out 0s 1 fadeIn;
  -moz-animation: 1s cubic-bezier(0,.25, 1,.75) infinite green-blue-gradient, .5s ease-out 0s 1 fadeIn;
  animation: 1s cubic-bezier(0,.25, 1,.75) infinite green-blue-gradient, .5s ease-out 0s 1 fadeIn;

}


@-webkit-keyframes green-blue-gradient {
    0%{
      background-position:100% 0%}
    100%{
      background-position:0% 100%
      }
}
@-moz-keyframes green-blue-gradient {
    0%{
      background-position:100% 0%}
    100%{
      background-position:0% 100%
      }
}
@keyframes green-blue-gradient { 
    0%{
      background-position:100% 0%}
    100%{
      background-position:0% 100%
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