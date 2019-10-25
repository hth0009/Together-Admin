<template>
  <div class="prayer-container">
    <div class="page-wrapper">  
      <div class="page-card-wrapper">
        <cards
          :cardList="formattedPrayers"
          :loading="prayersLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          :profilePicFillerValue="'subtext'"
          @selected="recieveID"
          @onAddNew="createNewItem"/>
      </div>
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem">
        <div class="header"> 
          <!-- <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}"
          class="profile-pic"></div> -->
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPrayer.iconURL + ')'}"
          class="profile-pic"></div> -->
          <div class="profile-pic">
            <avatar
              :height="60"
              :title="selectedPrayer.personName"/>
          </div>
          <h3 class="">{{selectedPrayer.subject}}</h3>
          <div class="subtitle" v-if="selectedPrayer.isAnonymousPrayer">Annonymous</div>
          <div class="subtitle" v-else>{{selectedPrayer.personName}}</div>
        </div>
        <div class="details">
          <div class="panel">
            <div class="prayer-info">
              <p>{{selectedPrayer.content}}</p>
            </div>
            <div class="response" :class="{'responding': response.length > 0}">
              <input type="text" v-model="response" class="basic-input" placeholder="Message">
              <button class="basic-button icon"><i class="material-icons">send</i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="new-item" v-if="creatingNewItem">
        <div class="title">New Prayer</div>
        <div class="details">
          <div>
            <ejs-textbox autocomplete="off" floatLabelType="Auto" placeholder="Title"
            required name="none"></ejs-textbox>
          </div>
          <div>
            <ejs-textbox autocomplete="off" floatLabelType="Auto" :multiline="true" placeholder="Prayer"
            required name="none"></ejs-textbox>
          </div>
        </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Prayers from '@/services/prayers'
import CustomRadio from '@/components/CustomRadio'
import Cards from '@/components/CardList'
import Avatar from '@/components/Avatar'

export default {
  name: 'Prayer',
  data () {
    return {
      prayers: [
      ],
      prayersLoading: false,
      prayersSearch: '',
      selectedID: '',
      selectedPrayer: {},
      selectedID: -1,
      creatingNewItem: false,
      newItemType: 0,
      response: ''
    }
  },
  components: {
    Cards, CustomRadio, Avatar
  },
  methods: {
    recieveID(id) {
      if (!id) {
        return
      }
      if (id == '-1') {
        this.selectedID = id
        this.$router.push(`/app/prayer/`)
        return
      }
      this.creatingNewItem = false
      this.$router.push(`/app/prayer/${id}`)
      this.selectedID = id
      this.selectedID = id
      this.response = ''
      this.getPrayer()
    },
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/prayer/`)

      this.creatingNewItem = true;
    },
    async getPrayers() {
      const response = await Prayers.getPrayers()
      this.prayers = response['prayer(s)']
    },    
    async getPrayer() {
      const response = await Prayers.getPrayer(this.selectedID)
      this.selectedPrayer = response['prayer']
    }
  },
  props: {
  },
  mounted() {  
    this.prayersLoading = true 
    this.recieveID(this.$route.params.id)
    this.getPrayers().then(() => {this.prayersLoading = false})
  },
  computed: {   
    formattedPrayers() {
      var prayers = Array(this.prayers.length)
      for (let index = 0; index < this.prayers.length; index++) {
        const prayer = this.prayers[index];
        const newPrayer = {
          id: prayer.id,
          title: prayer.subject,         
          // profile:'https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          // subtext: prayer.personID + '',
          subtext: prayer.personName,
          // body: prayer.content
        }
        prayers[index] = newPrayer
      }
      return prayers
    }
  }
}
</script>

<style scoped>

.prayer-container {
  height: 100%;
}
.response {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 40px;
  padding-top: 30px;
}
.response input{
  padding: 0px;
}
.response button i{
  font-size: inherit;
}
.response:not(.responding) button{
  font-size: 5px;
  width: 0px;
  height: 0px;
  padding: 0px;
  opacity: 0;
  visibility: hidden;
  transition: width .3s ease-out, height .3s ease-out, opacity .3s ease-out, visibility .3s, font-size .3s;
}
.response.responding button{  
  font-size: 15px;
  transition: width .3s ease-out, height .3s ease-out, opacity .3s ease-out, visibility .3s step-start
}
/* //////////////////////////
//////  MEDIA QUERIES ///////
////////////////////////// */

/*------------------------------------------
  Responsive Grid Media Queries - 1280, 1024, 768, 480
   1280-1024   - desktop (default grid)
   1024-768    - tablet landscape
   768-480     - tablet 
   480-less    - phone landscape & smaller
--------------------------------------------*/
@media all and (min-width: 1024px) and (max-width: 1280px) {
 }

@media all and (min-width: 768px) and (max-width: 1024px) {
 }

@media all and (min-width: 480px) and (max-width: 768px) {
 }

@media all and (max-width: 480px) {
 }
</style>