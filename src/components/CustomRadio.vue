<template>
  <form class="radio-buttons noselect" :class="{'chips': chips, 'overflow': overflow}">
    <label v-for="(option, index) in options" :key="index" tabindex="0">
      <input type="radio" name="select"
        :value="index" v-model="selectedIndex" tabindex="0">
      <span>{{option}}</span>
    </label>
    <div v-if="overflow" class="overflow-shadow"></div>
  </form>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selectedIndex: this.value
    }
  },
  watch: {
    selectedIndex() {
      this.$emit('input', this.selectedIndex)
      this.$emit('changed', this.selectedIndex)
    }
  },
  props: {
    options: {
      type: Array,
      default: []
    },
    value: {
      type: Number,
      default: 0
    },
    chips: {
      tpye: Boolean,
      default: false
    },
    overflow: {
      tpye: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

.radio-buttons.overflow{
  overflow-x: auto;
  overflow-y: hidden;
  display: block;
  white-space: nowrap;
  /* box-shadow: 0px 0px 17px 10px inset red; */
  /* box-shadow: -13px 0px 17px -20px inset white; */
  position: relative;
}
.radio-buttons.overflow::after{
  content: '';
  /* position: absolute; */
  /* top: -75%; */
  /* left: 0px; */
  /* position: relative; */
  width: 100%;
  height: 250%;
  box-shadow: 0px 0px 17px 10px inset red;
  z-index: 100
}
.radio-buttons label{
  position: relative;
  cursor: pointer;
}
.radio-buttons label input{
  display: none;
  /* width: 100%; */
}
.radio-buttons label span{
  display: inline-block;
  margin: 5px 0px 10px 0px;
  font-size: .8rem;
  padding: 10px 10px;
  background: #f0f0f0;
  color: #797979;
  font-weight: 500;
  transition: all .2s ease-in;
  /* border-radius: 30px; */
}
.radio-buttons label:first-child span{
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
  padding-left: 15px;
}
.radio-buttons label:last-child span{
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  padding-right: 15px;
}
.radio-buttons input:checked ~ span{
  background: #55C0E4;
  text-shadow: 0px 1px 9px #00000041;
  color: #ffffff;
}

.radio-buttons label:focus {
  outline: none
}

.radio-buttons.chips label span{
  border-radius: 30px;
  margin-right: 5px;
  padding: 10px 15px;
}


</style>