<template>
  <div class="input-list noselect">
    <h3>{{title}}</h3>
    <form action="" class="new-list-item" v-on:submit.prevent='addNewItem'>
      <textarea rows="3" v-model="newItem.message"></textarea>
      <!-- <date-picker class="" 
        :calendar-button="true"
        v-model="newItem.time"/>        -->
      <button class="">+</button>
    </form>
    <ul>
      <li v-for="(item, index) in reverseItems"
      tabindex="0"
      v-bind:value="item.message"
      v-bind:key="item.message"
      v-bind:data-index="index"
      v-on:keyup.enter="selected(option)"
      @click="selected(option)">  
        {{item.message}}
      </li>
      
    </ul>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import DatePicker from 'vuejs-datepicker';

export default {
  name: 'InputList',
  data () {
    return {
      selectedVal: this.value,
      newItem: {
        message: '',
        time: ''
      },
    }
  },
  mixins: [clickaway],
  components: {
    DatePicker
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    title: {
      type: String,
      default: 'List'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    addNewItem: function () {
      if (this.newItem.message == '') {
        return
      }
      var emptyItem = {
        message: ''
      }
      this.list.push(this.newItem)
      this.newItem = emptyItem;
    }
  },
  computed: {
    reverseItems() {
      return this.list.slice().reverse();
    }     
  },
  watch: {
    list: {
      handler (n, o) {
        this.$emit('input', this.selectedVal)
      }
    }
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    padding: 10px 5px;
    color: #fdfdfd;
    font-weight: lighter;
    background: #4bbcdf;
  }
  .input-list {
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .new-list-item {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .new-list-item button {
    background: none;
    padding: 10px;
    border: none;
    text-align: end;
    resize: none;
    cursor: pointer;
    font-weight: bold;
  }
  .new-list-item textarea {
    flex: 100;
    padding: 10px;
    width: calc(100% - 20px);
    resize: none;
  }
  .new-list-item button:focus {
    outline: none;
    text-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .new-list-item textarea:focus{
    outline: none;
  }
  .dropdown:focus .dropdown-placeholder{
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .dropdown-placeholder {
    color: #7e7e7e;
    padding: 10px 10px;
    height: 14px;
    transition: .3s box-shadow ease;
    background: white;
    z-index: 100;
  }
  .dropdown-placeholder:hover {
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  }
  .dropdown-placeholder.selected {
    color: #2b2b2b;
  }
  li {
    padding: 10px 10px;
    box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);
    /* border-bottom: rgba(128, 128, 128, 0.411) 1px solid; */
    overflow-wrap: break-word;
  }
  li:focus {
    padding: 10px 10px;
    height: 12px;
    outline: none;
    box-shadow: 0px 6px 6px -4px rgba(128, 128, 128, 0.678);
    /* border-bottom: rgba(128, 128, 128, 0.411) 1px solid; */
  }
  .dropdown-options {
    position: absolute;
    top: -5px;
    z-index: 1000;
    width: 100%;
  }
  .dropdown-options li {
    margin-top: 5px;
    background: white;
    color: #2b2b2b;
    transition: .2s box-shadow ease;
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:hover {
    box-shadow: 0px 5px 4px -4px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:focus {
    outline: none;
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .dropdown-options li:active {
    box-shadow: 0px 0px 0px 0px rgba(128, 128, 128, 0.507);
  }
  /* Transititon */
  /* Enter and leave animations can use different */
/* durations and timing functions.              */
/* .slide-fade-enter-active ul li{
  transition: all .2s ease-out;
}
.slide-fade-leave-active ul li{
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
} */
</style>
