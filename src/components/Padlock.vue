<template>
  <div class="lock-container">
    <sweet-modal icon="error" ref="cannotUnlockModal">
      <h3>{{cantUnlockMessage}}</h3>
    </sweet-modal>
    <sweet-modal icon="warning" ref="lockWarningModal">
      <h3>{{lockWarning}}</h3>
      <button slot="button" class="gs-basic-button red" @click="closeLockWarning">CANCEL</button>      
      <button slot="button" class="gs-basic-button" @click="lock(true); closeLockWarning()">LOCK</button>      
    </sweet-modal>
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
import { SweetModal } from "sweet-modal-vue";
import { timeout } from 'q';

export default {
  name: 'Padlock',
  data () {
    return {
      locked: this.value
    }
  },
  components: {
    SweetModal
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
      if (!this.canBeUnlocked) {
        this.$refs.cannotUnlockModal.open()
        setTimeout(()=>{
          this.$refs.cannotUnlockModal.close()
        },2500);
        return
      }
      this.locked = false
      this.$emit('input', false)
      this.$emit('unlocked')
    },
    lock(bypassWarning = false) {
      if (!!this.lockWarning && !bypassWarning) {
        this.$refs.lockWarningModal.open()
        return
      }
      this.locked = true
      this.$emit('input', true)
      this.$emit('locked')
    },
    closeLockWarning() {
      this.$refs.lockWarningModal.close()
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
    canBeUnlocked: {
      type: Boolean,
      default: true
    },
    lockedLabel: {
      type: String,
      default: ''
    },
    unlockedLabel: {
      type: String,
      default: ''
    },
    cantUnlockMessage: {
      type: String,
      default: 'This cannot be unlocked'
    },
    lockWarning: {
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
  height: 25px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}
.lock-label {
  margin-left: 10px;
  font-weight: 600;
}
.lock {
  width: 17px;
  height: 15px;
  border: 2px solid var(--locked-color);
  border-radius: 3px;
  position: relative;
  cursor: pointer;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  margin-top: 5px;
}
.lock:after {
  content: "";
  display: block;
  background: var(--locked-color);
  width: 2px;
  height: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -1.75px 0 0 -1px;
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}
.lock:before {
  content: "";
  display: block;
  width: 10px;
  height: 8px;
  bottom: 100%;
  position: absolute;
  left: 50%;
  margin-left: -5px;
  border: 2px solid var(--locked-color);
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
  height: 10px;
}
.lock.disabled:focus:before,
.lock.disabled:hover:before {
  height: 8px;
}
/* Unlocked */
.unlocked {
  transform: rotate(10deg);
}
.unlocked:before {
  bottom: 117%;
  left: 31%;
  margin-left: -6.5px;
  transform: rotate(-45deg);
}
.unlocked,
.unlocked:before {
  border-color: var(--unlocked-color);
}
.unlocked::before {
  height: 10px;
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
  height: 10px;
  left: 35%;
  bottom: 115%;
  transform: rotate(-30deg);
}

.disabled.unlocked:focus,
.disabled.unlocked:hover {
  transform: rotate(10deg);
}
.disabled.unlocked:focus:before,
.disabled.unlocked:hover:before {
  height: 10px;
  bottom: 117%;
  left: 31%;
  transform: rotate(-45deg);
}
</style>