<template>
  <div class="times-container width-override-full">
    <div class="selected-times">
      <div class="time noselect"
        v-for="(time, index) in times"
        v-bind:key="index">
          <input class="basic-input" type="time" v-model="times[index]">
          <span @click="removeTime(index)">&#10005;</span> 
        </div>        
    </div>
    <form  @submit.prevent="addTime()" class="new-time">
        <input type="time" v-model="newTime">
      <button class="basic-button"
        @click="addTime()">+</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Times',
  data () {
    return {
      times: ['09:00', '10:30', '17:00'],
      newTime: ''
    }
  },
  components: {
  },
  methods: {
    removeTime (index) {
      this.times.splice(index, 1)
    },
    addTime () {
      if (this.newTime == '' || this.times.indexOf(this.newTime) >= 0) return
      this.times.push(this.newTime)
      this.sortTimes()
    },
    sortTimes () {
      this.times = this.times.sort(function (a, b) {
        return parseInt(a.slice(0, 2) + a.slice(3,6)) - parseInt(b.slice(0, 2) + b.slice(3,6))
      })
    }
  },
  props: {
  }, 
  mounted() {    
  },
  computed: {
  }
}
</script>

<style scoped>
.times-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.times-container h3{
  width: 100%;
}
.selected-times {    
  /* border: 1px #D0D3D6 solid; */
  margin-top: 10px;
  /* height: 30px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  flex: 1;
}
.times-container button{   
  justify-self: flex-end;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  padding: 5px;
  margin: 0px;
}
.time {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.time input {
  width: 85px;
}
.new-time input[type="time"]::-webkit-clear-button,
.time input[type="time"]::-webkit-clear-button {
    display: none;
}
.time span {
  cursor: pointer;
  font-size: 10px;
  padding-left: 4px;
  vertical-align: center;
}
.new-time {
  border: 1px #D0D3D6 solid;
  border-radius: 30px;
  padding-left: 8px;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
}
.new-time input {
  margin: 0px  5px;
}
.new-time input:active,
.new-time input:enabled,
.new-time input::selection {
  outline: none;
}

</style>