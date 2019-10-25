<template>
  <div id="input-char-count-container">
    {{input ? input.length : 0}} / {{maxNumOfCharsAllowed}}
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "input-char-count",
  data() {
    return {
    }
  },
  props: [
    'input',
    'maxNumOfCharsAllowed'
  ]
}
</script>

<style>
#input-char-count-container {
  text-align: right;
  margin-top: 4px;
}

</style>