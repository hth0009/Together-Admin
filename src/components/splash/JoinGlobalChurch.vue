<template>
  <div id="joinGlobalChurchToday">
    <button id="joinTheGlobalChurchBtn" class="gs-basic-button inverted"
            @click="$router.push('/signup')">
      Join the Global Church Today
    </button>
    <p id="joinTheGlobalChurchSubtext" class="white"> 30 Second Organization Sign Up. 5 Minute Learning Curve </p>
  </div>
</template>

<script>
export default {
  name: 'JoinGlobalChurch',
}
</script>

<style scoped>
#joinGlobalChurchToday {
  display: flex;
  flex-flow: column;
  align-items: center;
}
#joinTheGlobalChurchBtn {
  width: 20em;
  margin-bottom: 8px;
  height: 3.5em;
}
#joinTheGlobalChurchSubtext {
  font-size: .8rem;
  font-weight: 600;
}
</style>