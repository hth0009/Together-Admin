<template>
  <div class="prayer-container">
    <div class="prayer-wrapper">  
      <div class="prayer-card-wrapper">
        <cards
          :cardList="formattedPrayers"
          :loading="prayersLoading"
          @selected="recieveID"/>
      </div>
      <div class="prayer-view" v-if="selectedID != ''">
        <!-- <div class="prayer-header"> 
          <div :style="{backgroundImage: 'url(https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1)'}"
          class="profile-pic"></div> -->
          <!-- <div :style="{backgroundImage: 'url(' +  selectedTeam.iconURL + ')'}"
          class="profile-pic"></div> -->
          <!-- <h3>{{selectedTeam.name}}</h3>
          <div class="prayer-type noselect serve" v-if="selectedTeam.isServe">Serve Team</div>
          <div class="prayer-type noselect annonymous" v-if="selectedTeam.isAnnonymous">Annonymous</div>
        </div>
        <div class="prayer-info"> -->
          <!-- <div class="annonymous-prayer"
            v-if="selectedTeam.isAnnonymous">            
            <div class="description-panel">
              <h4>Description</h4>
              <p>{{selectedTeam.description}}</p>
            </div>            
            <div class="contact-panel">
              <h4>Contact</h4>
              <p>Please email us at: herchoicetoheal.acc@gmail.com</p>
            </div>
          </div>
          <div v-else>
            <div class="description-panel">
              <h4>Description</h4>
              <p>{{selectedTeam.description}}</p>              
            </div>     -->
            <!-- <div class="prayer-leader-panel">   
              <h4>Team Leader</h4>           
                <div class="people-box">
                  <div class="icon" :style="{backgroundImage: 'url(' +  selectedTeam.leader.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{selectedTeam.leader.name}}</div>
                  </div>
                </div>
                <p>Reach out to John at (606) 637-0799</p>
            </div> -->
            <!-- <div class="people-list-panel">
              <h4>Members <span>| {{selectedTeam.members.total}}</span></h4>
              <div class="people">
                <div class="people-box" v-for="person in selectedTeam.members['prayerMembers(s)']" :key="person.personID">
                  <div class="icon" :style="{backgroundImage: 'url(' +  person.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{person.firstName + " " + person.lastName}}</div>
                  </div>
                </div>
              </div>
            </div>    -->
          <!-- </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Prayers from '@/services/prayers'
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
      selectedID: -1
    }
  },
  components: {
    Cards
  },
  methods: {
    recieveID(id) {
      this.selectedID = id
      this.getPrayer()
    },
    async getPrayers() {
      const response = await Prayers.getPrayers()
      console.log(response)
      this.prayers = response['prayer(s)']
    },    
    async getPrayer() {
      const response = await Prayers.getPrayer(this.selectedID)
      console.log(response)
      this.selectedPrayer = response['prayer']
    }
  },
  props: {
  },
  mounted() {  
    this.prayersLoading = true 
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
          profile:'https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          subtext: ''
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
  height: calc(100vh - 40px);
  width: 250px;
  position: relative;
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
  height: calc(100vh - 80px);
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
.prayer-header {  
  position: relative;
}
.prayer-header h3 {
  display: inline;
  padding: 10px;
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
    height: calc(100vh - 75px);    
    padding-top: 35px;
  }
 }

@media all and (max-width: 480px) {
  .prayer-wrapper {
    grid-template-columns: 1fr;
  }
 }
</style>