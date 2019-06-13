<template>
  <div class="text-field-container">
    <h3>{{title}}</h3>
    <div class="text">
      <div v-if="!editing" class="ql-editor">
        <div v-html="text"></div>
      </div>
      <!-- <vue-editor class='' v-else v-model="text"></vue-editor> -->
    </div>
    <button class="basic-button"
        @click="editing = !editing">{{editing ? 'SAVE' : 'EDIT'}}</button>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  data () {
    return {
      title: 'Component Title',
      text: 'ENTER TEXT',
      editing: false
    }
  },
  components: {
  },
  methods: {
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
  h3 {
    margin-bottom: 10px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .text {
    padding: 10px;
    margin-bottom: 15px;
  }
</style>