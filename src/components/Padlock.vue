<template>
  <div class="lock-container">
    <div>
    <div class="lock"
      tabindex="0"
       @click="toggleLock"
       v-on:keyup.enter="toggleLock"
      :class="{
        'unlocked': !locked,
        'disabled': disabled}"
    ></div>
    </div>
    <div class="lock-label" v-show="locked">{{lockedLabel}}</div>
    <div class="lock-label" v-show="!locked">{{unlockedLabel}}</div>
  </div>
</template>

<script>
export default {
  name: 'Padlock',
  data () {
    return {
      locked: this.value
    }
  },
  components: {
  },
  methods: {
    toggleLock() {
      if (this.disabled) {
        return
      }
      if (this.locked) {
        this.unlock()
      }
      else {
        this.lock()
      }
    },
    unlock() {
      this.locked = false
      this.$emit('input', false)
      this.$emit('unlocked')
    },
    lock() {
      this.locked = true
      this.$emit('input', true)
      this.$emit('locked')
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lockedLabel: {
      type: String,
      default: ''
    },
    unlockedLabel: {
      type: String,
      default: ''
    }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
    value: {
      handler(n, o) {
        this.locked = n
      }
    }
  }
}
</script>

<style scoped>
.lock-container, .lock {
  margin: 0;
  padding: 0;
  --locked-color: #5fadbf;
  --unlocked-color: #05e0a2;
}
.lock.disabled {  
  --locked-color: grey;
  --unlocked-color: grey;
  cursor: default;
}
/* Locked */
.lock-container {
  height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.lock-label {
  margin-left: 10px;
  font-weight: 600;
}
.lock {
  width: 24px;
  height: 21px;
  border: 3px solid var(--locked-color);
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  margin-top: 10px;
}
.lock:after {
  content: "";
  display: block;
  background: var(--locked-color);
  width: 3px;
  height: 7px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -3.5px 0 0 -2px;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.lock:before {
  content: "";
  display: block;
  width: 16px;
  height: 13px;
  bottom: 100%;
  position: absolute;
  left: 50%;
  margin-left: -8px;
  border: 3px solid var(--locked-color);
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom: 0;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
/* Locked Hover */
.lock:focus {
  outline: none
}
.lock:focus:before,
.lock:hover:before {
  height: 15px;
}
.lock.disabled:focus:before,
.lock.disabled:hover:before {
  height: 13px;
}
/* Unlocked */
.unlocked {
  transform: rotate(10deg);
}
.unlocked:before {
  bottom: 130%;
  left: 31%;
  margin-left: -11.5px;
  transform: rotate(-45deg);
}
.unlocked,
.unlocked:before {
  border-color: var(--unlocked-color);
}
.unlocked::before {
  height: 15px;
}
.unlocked:after {
  background: var(--unlocked-color);
}
/* Unlocked Hover */
.unlocked:focus,
.unlocked:hover {
  transform: rotate(3deg);
}
.unlocked:focus:before,
.unlocked:hover:before {
  height: 15px;
  left: 40%;
  bottom: 124%;
  transform: rotate(-30deg);
}

.disabled.unlocked:focus,
.disabled.unlocked:hover {
  transform: rotate(10deg);
}
.disabled.unlocked:focus:before,
.disabled.unlocked:hover:before {
  height: 15px;
  bottom: 130%;
  left: 31%;
  transform: rotate(-45deg);
}
</style>