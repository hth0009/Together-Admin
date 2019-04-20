<template>
  <div class="prayer-container">
    <div class="prayer-wrapper">  
      <div class="prayer-table-wrapper">
        <h2>Prayer</h2>        
        <!-- <div id="add-new-prayer"
          @click="show">
          <i class="material-icons noselect">add</i>
        </div> -->
        <input type="text" class="basic-input" placeholder="search" v-model="prayersSearch">
        <vue-table
          :data="computedPrayers"
          :columns="gridColumns"
          :column-type="columnType"
          :filter-key="prayersSearch"
          :id-key="'id'"
          :highlighted-entry="selectedID"
          @value="recieveID"></vue-table>
      </div>
      <div class="prayer-view" v-if="selectedID != ''">
        <div class="prayer-header"> 
          <div :style="{backgroundImage: 'url(https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1)'}"
          class="profile-pic"></div>
          <!-- <div :style="{backgroundImage: 'url(' +  selectedTeam.iconURL + ')'}"
          class="profile-pic"></div> -->
          <h3>{{selectedTeam.name}}</h3>
          <div class="prayer-type noselect serve" v-if="selectedTeam.isServe">Serve Team</div>
          <div class="prayer-type noselect annonymous" v-if="selectedTeam.isAnnonymous">Annonymous</div>
        </div>
        <div class="prayer-info">
          <div class="annonymous-prayer"
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
            </div>    
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
            <div class="people-list-panel">
              <h4>Members <span>| {{selectedTeam.members.total}}</span></h4>
              <div class="people">
                <div class="people-box" v-for="person in selectedTeam.members['prayerMembers(s)']" :key="person.personID">
                  <div class="icon" :style="{backgroundImage: 'url(' +  person.icon + ')'}"></div>
                  <div class="person-info">
                    <div class="name">{{person.firstName + " " + person.lastName}}</div>
                  </div>
                </div>
              </div>
            </div>   
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueTable from '@/components/Table'

export default {
  name: 'Prayer',
  data () {
    return {
      searchQuery: '',
      gridColumns: ['profile', 'name', 'prayer'],
      // gridColumns: ['name', 'type'],
      // columnType: {name: 'text', type: 'text'},
      columnType: {profile: 'profile', name: 'text', type: 'text'},
      prayers: [
        {
          profile: '',
          name: 'Harrison Haigler',
          prayer: 'Trust in the Lord\'s promises'
        }
      ],
      prayersSearch: '',
      selectedID: '',
      selectedPrayer: {},
      selectedID: 0
    }
  },
  components: {
    VueTable
  },
  methods: {
  },
  props: {
  },
  mounted() {    
  },
  computed: {    
    computedPrayers() {
      const newPrayers = []

      for (let index = 0; index < this.prayers.length; index++) {
        const prayer = this.prayers[index];

        newPrayers.push({
          name: prayer.name,
          id: prayer.id,
          prayer: prayer.prayer
        })
      }
      return newPrayers
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
  grid-template-columns: 1fr 1fr;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  /* overflow-x: auto; */
}

.prayer-table-wrapper {
  padding: 20px 30px;
  height: calc(100%);
  overflow-y: auto;
  height: calc(100vh - 80px);
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
 }

@media all and (max-width: 480px) {
  .prayer-wrapper {
    grid-template-columns: 1fr;
  }
 }
</style>