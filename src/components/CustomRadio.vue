<template>
  <form class="radio-buttons noselect">
    <label v-for="(option, index) in options" :key="index" tabindex="0">
      <input type="radio" name="select"
        :value="index" v-model="selectedIndex" tabindex="0">
      <span>{{option}}</span>
    </label>
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
  }
}
</script>

<style scoped>

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
  background: #00cec9;
  text-shadow: 0px 1px 9px #00000041;
  color: #ffffff;
}

.radio-buttons label:focus {
  outline: none
}


</style>