<template>
  <form class="radio-buttons">
    <label v-for="(option, index) in options" :key="index">
      <input type="radio" name="select"
        :value="index" v-model="selectedIndex">
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
  padding: 7.5px 12.5px;
  color: white; 
  background: #b6b6b6;
  border-radius: 30px;
}
.radio-buttons input:checked ~ span{
  background: #00cec9;
}

</style>