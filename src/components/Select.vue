<template>
  <div class="dropdown noselect"
    v-on:keyup.enter="display = true"
    tabindex="0"
    v-on-clickaway="away">
    <ul><li class="dropdown-placeholder"
    @click="display = true"
    :class="{'selected' : selectedVal.name != undefined && selectedVal.name != ''}"
     v-bind:style="{ borderLeft: selectedVal['color'] ? selectedVal.color + ' 3px solid': 'none' }"
     >{{selectedVal.name == undefined || selectedVal.name == '' ? placeholder : selectedVal.name}}</li></ul>
    <transition-group
    name="staggered-fade"
    class="dropdown-options"
    v-bind:css="false"
    appear
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
    tag="ul">
      <li v-for="(option, index) in options"
      tabindex="0"
      v-show="display"
      v-bind:value="option.value"
      v-bind:key="option.value"
      v-bind:data-index="index"
      v-on:keyup.enter="selected(option)"
      @click="selected(option)"
      v-bind:style="{ borderLeft: option['color'] ? option.color + ' 3px solid': 'none' }">
        {{option.name}}
       </li>
    </transition-group>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

const Velocity = window.Velocity
export default {
  name: 'Select',
  data () {
    return {
      selectedVal: this.value,
      display: false,
      height: '14px'
    }
  },
  mixins: [clickaway],
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    value:{
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    away: function () {
      this.display = this.display ? false : this.display
    },
    selected: function (value) {
      this.selectedVal = value
      this.display = !this.display
      this.$emit('input', this.selectedVal)
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter: function (el, done) {
      var delay = el.dataset.index * 100
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: this.height },
          { complete: done }
        )
      }.bind(this), delay)
    },
    leave: function (el, done) {
      var delay = el.dataset.index * 10
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>

<style scoped>
  .dropdown {
    font-size: 13px;
    cursor: pointer;
    position: relative;
    height: 30px;
    margin-bottom: 5px;
  }
  .dropdown:focus {
    outline: none;
  }
  .dropdown:focus .dropdown-placeholder{
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .dropdown-placeholder {
    color: #7e7e7e;
    padding: 10px 10px;
    height: 14px;
    transition: .3s box-shadow ease;
    background: white;
    z-index: 100;
  }
  .dropdown-placeholder:hover {
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  }
  .dropdown-placeholder.selected {
    color: #2b2b2b;
  }
  li {
    padding: 10px 10px;
    height: 12px;
  }
  .dropdown-options {
    position: absolute;
    top: -5px;
    z-index: 1000;
    width: 100%;
  }
  .dropdown-options li {
    margin-top: 5px;
    background: white;
    color: #2b2b2b;
    transition: .2s box-shadow ease;
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:hover {
    box-shadow: 0px 5px 4px -4px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:focus {
    outline: none;
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:active {
    box-shadow: 0px 0px 0px 0px rgba(128, 128, 128, 0.507);
  }
  /* Transititon */
  /* Enter and leave animations can use different */
/* durations and timing functions.              */
/* .slide-fade-enter-active ul li{
  transition: all .2s ease-out;
}
.slide-fade-leave-active ul li{
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
} */
</style>
