<template>
  <div id="joinGlobalChurchToday">
    <button id="joinTheGlobalChurchBtn" class="gs-basic-button inverted"
            @click="joinGlobalChurch()">
      Join the Global Church Today
    </button>
    <p id="joinTheGlobalChurchSubtext"> 30 Second Organization Sign Up. 5 Minute Learning Curve </p>
  </div>
</template>

<script>
export default {
  name: 'JoinGlobalChurch',
  methods: {
    joinGlobalChurch() {
      return;
    }
  },
}
</script>

<style scoped>
#joinTheGlobalChurchBtn {
  width: 20em;
  margin-bottom: 8px;
}
#joinTheGlobalChurchSubtext {
  font-size: 6pt;
  font-weight: 600;
}
</style>