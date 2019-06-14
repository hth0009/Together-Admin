<template>
  <div class="prayer-container">
    <div class="prayer-wrapper">  
      <div class="page-card-wrapper">
        <cards
          :cardList="formattedPrayers"
          :loading="prayersLoading"
          :selectedID="selectedID + ''"
          :hasAddNew="true"
          @selected="recieveID"
          @onAddNew="createNewItem"/>
      </div>
      <div class="selected-view" v-if="selectedID != -1 && !creatingNewItem">
        <div class="header"> 
          <div :style="{backgroundImage: 'url(https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)'}"
          class="profile-pic"></div>
          <!-- <div :style="{backgroundImage: 'url(' +  selectedPrayer.iconURL + ')'}"
          class="profile-pic"></div> -->
          <h3 class="">{{selectedPrayer.subject}}</h3>
          <div class="subtitle" v-if="selectedPrayer.isAnonymousPrayer">Annonymous</div>
        </div>
        <div class="prayer-info">
          <p>{{selectedPrayer.content}}</p>
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
    }
  },
  components: {
    Cards, CustomRadio
  },
  methods: {
    recieveID(id) {
      if (id == undefined) {
        return
      }
      this.creatingNewItem = false
      this.$router.push(`/app/prayer/${id}`)
      this.selectedID = id
      this.selectedID = id
      this.getPrayer()
    },
    createNewItem() {
      this.selectedID = -1;
      this.$router.push(`/app/prayer/`)

      this.creatingNewItem = !this.creatingNewItem
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
h2 {
  padding-top: 30px;
  /* padding-left: 20px; */
  height: 40px;
}
.prayer-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}
.prayer-card-wrapper {
  overflow-y: auto;
  width: 100%;
  position: relative;
  /* border-right: 1px #E6E9EC solid; */
}

#add-new-prayer {
  width: 25px;
  height: 25px;
  padding: 7.5px;
  position: absolute;
  top: 40px;
  right: 15px;
  background: #00cec9;
  border-radius: 50px;
  cursor: pointer;
}
#add-new-prayer i {    
  color: white;
}

.prayer-view {  
  /* width: 100%; */
  height: 100%;
  position: relative;
  padding-left: 30px;
  height: 100vh;
  overflow-y: auto;
  padding-top: 40px;
}
.prayer-view::before {
  content: '';
  border-left: 1px solid #f0f0f0 ;
  position: absolute;
  height: 20vh;
  left: 0;
  top: 0%;
}
.prayer-header .prayer-type{
  font-size: 11px;
  font-weight: lighter;
  padding: 2.5px 5px;
  border-radius: 3px;
  display: inline;
}
.prayer-header .prayer-type.anonymous{
  border: 2px #69CDCF solid;
}
.prayer-header {  
  position: relative;
}
.prayer-header h3 {
  display: inline;
  padding: 10px;
}
.prayer-header .profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-flex;
  flex: 1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  /* position: absolute;
  right: 20px;
  top: 0px; */
}
.prayer-info h4{
  margin-top: 20px; 
  margin-bottom: 15px;
}
.prayer-info p{
  margin: 10px 10px;
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
  .prayer-card-wrapper {
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
  .prayer-wrapper {
    grid-template-columns: 1fr;
    height: calc(100% - 35px);    
    margin-top: 35px;
  }
 }
</style>