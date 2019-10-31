<template>
  <div id="howDoesItWorkWrapper" class="animated fadeIn fast">
    <b-row>
      <b-col sm="9">
        <p>{{topics[selectedTopic].header}}</p>
        <p class="description">{{topics[selectedTopic].description}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9">
        <div id="image">large image</div>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9">
        <div v-for="(value, key) in topicIcons" :key="key" class="switchTopicCardWrapper" :class="{'gs-primary-bg': selectedTopic === key}">
          <div class="switchTopicCard" @click="chooseTopic(key)" >
            <i class="material-icons">{{value.icon}}</i>
          </div>
        </div>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import { topics } from '@/factories/SplashMoreInfoTopics'; 
  export default {
    data() {
      return {
        selectedTopic: 1,
        topics,
        topicIcons: {
          1: {
            icon: 'favorite_border'
          },
          2: {
            icon: 'favorite_border'
          },
          3: {
            icon: 'favorite_border'
          },
          4: {
            icon: 'favorite_border'
          },
          5: {
            icon: 'favorite_border'
          },
          6: {
            icon: 'favorite_border'
          },
          7: {
            icon: 'favorite_border'
          },
          8: {
            icon: 'favorite_border'
          },
          9: {
            icon: 'favorite_border'
          },
        }
      };
    },
    methods: {
      chooseTopic(key) {
        this.selectedTopic = key; 
      }
    },
  }
</script>

<style lang="scss" scoped>
.description {
  min-height: 9vh;
}
#image {
  height: 60vh;
  background-color: black;
}

.row {
  margin-bottom: 2em !important;
}

.switchTopicCardWrapper {
  display: inline-block;
  margin-right: 3em;
  margin-bottom: 1em;
  height: 3em;
  width: 3em;
  border-radius: 1em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
.switchTopicCard {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  cursor: pointer;
}

</style>