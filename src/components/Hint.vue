<template>
  <div id="hint-container">
    {{input.length}} / {{maxNumOfCharsAllowed}}
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "gsHint",
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
#hint-container {
  text-align: right;
  margin-top: 4px;
}

</style>