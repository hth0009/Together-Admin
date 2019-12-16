<template>
  <div id="howDoesItWorkWrapper" class="animated fadeIn fast">
    <b-row id="description-row">
      <b-col sm="9" offset-sm="1">
        <p id="topicHeader"><strong>{{topics[selectedTopic].header}}</strong></p>
        <p class="description">{{topics[selectedTopic].description}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="1" class="switchTopicCardsCol">
        <div v-for="(value, key) in topicIcons" :key="key" class="switchTopicCardWrapper" 
             :class="{'gs-primary-bg': selectedTopic === key}">
          <div class="switchTopicCard" @click="chooseTopic(key)" >
            <font-awesome-icon :icon="[value.prefix, value.icon]" />
          </div>
        </div>
      </b-col>
      <b-col sm="9">
        <img id="image" :src="topics[selectedTopic].img" />
      </b-col>
    </b-row>
    <b-row>
      
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
            prefix: 'far',
            icon: 'heart'
          },
          2: {
            prefix: 'far',
            icon: 'heart'
          },
          3: {
            prefix: 'far',
            icon: 'heart'
          },
          4: {
            prefix: 'fab',
            icon: 'stripe-s'
          },
          5: {
            prefix: 'far',
            icon: 'heart'
          },
          6: {
            prefix: 'far',
            icon: 'paper-plane'
          },
          7: {
            prefix: 'fas',
            icon: 'filter'
          },
          8: {
            prefix: 'fas',
            icon: 'cross'
          },
          9: {
            prefix: 'far',
            icon: 'user'
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
  font-weight: 600;
}
#image {
  height: 60vh;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
}

.row {
  margin-bottom: 8px !important;
}

.switchTopicCardsCol {
  text-align: right;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}
.switchTopicCardWrapper {
  margin-bottom: 1vh;
  height: 2.5em;
  width: 3em;
  border-radius: .5em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.19);
  background-color: white;
  color: black;
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