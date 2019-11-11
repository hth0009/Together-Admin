<template>
  <div id="howDoesItWorkWrapper" class="animated fadeIn fast">
    <b-row id="description-row">
      <b-col sm="9">
        <p id="topicHeader"><strong>{{topics[selectedTopic].header}}</strong></p>
        <p class="description">{{topics[selectedTopic].description}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9">
        <img id="image" :src="topics[selectedTopic].img" />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9">
        <div v-for="(value, key) in topicIcons" :key="key" class="switchTopicCardWrapper" 
             :class="{'gs-primary-bg': selectedTopic === key}">
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
        imgUrl: '',
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
            icon: 'event_seat'
          },
          5: {
            icon: 'favorite_border'
          },
          6: {
            icon: 'send'
          },
          7: {
            icon: 'system_update'
          },
          8: {
            icon: 'favorite_border'
          },
          9: {
            icon: 'people'
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
#topicHeader {
  font-size: 10pt;
  margin-bottom: 4px;
}
.description {
  min-height: 10vh;
  margin-bottom: 0;
  font-size: .8rem;
  font-weight: 500;
}
#image {
  height: 60vh;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}

.row {
  margin-bottom: 8px !important;
}

.switchTopicCardWrapper {
  display: inline-block;
  margin-right: 1em;
  margin-bottom: 1em;
  height: 2.5em;
  width: 3em;
  border-radius: .5em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}
.switchTopicCard {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  cursor: pointer;
}
.switchTopicCard .material-icons {
  font-size: 20px;
}

</style>