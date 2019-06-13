<template>
  <form class="radio-buttons noselect">
      <div v-for="(option, index) in options"
        :key="index"
        tabindex="0"
        class="token"
        :class="{'selected': selectedOptions.indexOf(option) != -1}"
        :value="index"
        @click.prevent="toggleOption(option)">{{option}}</div>
  </form>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      selectedOptions: this.value,
    }
  },
  methods: {
    toggleOption(option) {
      const optionIndex = this.selectedOptions.indexOf(option)
      if (optionIndex < 0) {
        this.selectedOptions.push(option)
      }
      else {
        this.selectedOptions.splice(optionIndex, 1)
      }
      this.$emit('input', this.selectedOptions)
    },
  },
  watch: {
    value: {
      handler(n) {
        this.selectedOptions = [...n]
      }, deep: true
    }
  },
  props: {
    options: {
      type: Array,
      default: () => {return []}
    },
    value: {
      type: Array,
      default: () => {return []}
    },
  }
}
</script>

<style scoped>

.token {
  display: inline-block;
  cursor: pointer;
  margin: 0px 5px 15px 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  border-radius: 50px;
  background: #b2bec3;
  text-shadow: 0px 1px 8px #00000034;
  transition: all .2s ease-out
}
.token.selected {
  background: #05e0a2;
}
.token:focus {
  outline: none;
}


</style>