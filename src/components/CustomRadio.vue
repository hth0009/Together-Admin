<template>
  <form class="radio-buttons">
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
  margin: 5px 10px 5px 0px;
  font-size: .9rem;
  text-shadow: 0px 1px 9px #0000006c;
  padding: 10px 15px;
  color: white; 
  background: #b6b6b6;
  border-radius: 30px;
}
.radio-buttons input:checked ~ span{
  background: #00cec9;
}

.radio-buttons label:focus {
  outline: none
}


</style>