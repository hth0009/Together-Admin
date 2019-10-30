<template>
  <div id="navTabs">
    <button class="nav-tab-button" style="background-color: rgb(93, 0, 255, .25)">
      <span style="color: #6C5CE7;">
        HOW DOES IT WORK ???
      </span> 
    </button>
    <button class="nav-tab-button" style="background-color: rgb(255, 0, 137, .25)">
      <span style="color: #D63031;">
        WHAT DOES IT COST ???
      </span> 
    </button>
    <button class="nav-tab-button" style="background-color: rgb(85, 239, 196, .25)">
      <span style="color: #00B894;">
        STILL HAVE QUESTIONS ???
      </span> 
    </button>
  </div>
</template>

<style scoped>
#navTabs {
  position: absolute;
  display: flex;
  flex-flow: column;
  right: 0;
  top: 6em;
}
.nav-tab-button {
  height: 5em;
  width: 21em;
  border-radius: 2em;
  margin-bottom: 8px;
  margin-right: -2em;
  font-size: 6pt;
  font-weight: 700;
  border: none;
}
</style>