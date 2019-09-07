<template>
  <div class="contact-container">
    <div>
      <ejs-dropdownlist
        :dataSource='people' 
        :fields='dropDownField'
        floatLabelType="Auto" 
        :placeholder='"Select Contact"'
        :allowFiltering="true"
        :select="contactSelected"></ejs-dropdownlist>  
    </div>
    <transition
      name="fade">
      <div v-show="contact['fullName']" class="card-box noselect">
        <avatar
          v-if="!noProfile"
          class="card-profile-pic"
          :height="30"
          :url="contact['personImageThumbnailURL']"
          :title="contact['fullName']"/>
        <div class="card-info">
          <div v-if="!!contact['fullName']" class="title"> {{contact['fullName']}} </div>
          <div v-if="!!contact['account']" class="subtext"> {{contact['account'].username == '' ? '' : '@' + contact['account'].username}} </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import People from '@/services/people'
import CustomRadio from '@/components/CustomRadio'

export default {
  name: 'EventSpeaker',
  data () {
    return {
      contact: this.value,
      isInChurch: 0,
      people: [],      
      dropDownField: { value: 'id', text: 'fullName' },
    }
  },
  components: {
    Avatar, CustomRadio
  },
  methods: {
    async getPeople () {
      const response = await People.getPeople()
      this.people = response['person(s)']
    },
    contactSelected (event) {
      // this.contact = event.itemData
      this.$emit('input', event.itemData)
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {return {}}
    }
  },
  mounted() {
    this.getPeople()
  },
  computed: {
  },
  watch: {
    value: {
      handler(n) {
        this.contact = n
      }, deep: true
    }
  }
}
</script>

<style scoped>


  .card-box {
    margin-top: 25px;
  }
  .card-box {
    transition: all .3s ease;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    position: relative;
    background-color: white;
  }
  .card-box.selected {
    box-shadow: 0px 4px 7px -4px #80808057 inset;
    background: #f3f3f3;
  }
  .card-box .card-profile-pic {
    min-width: 30px;
    max-width: 30px;
    height: 30px;
    border-radius: 50%;

    margin-right: 10px;

    grid-column: 1/2;
    grid-row: 1/2;

    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .card-box .card-info{
    flex: 1;
    /* padding-left: 10px;  */

    grid-column: 2/3;
    grid-row: 1/2;
  }
    
  .card-box .title{
    /* margin: 5px; */
    font-size: 13px;
    font-weight: 600;
    z-index: 10;
    position: relative;
    color: inherit;
  }
  .card-box .subtext{
    font-size: 11px;
    z-index: 10;
    position: relative;
    margin-bottom: 2px;
    font-weight: 600;
    color: #303030;
  }
  .card-box .body {
    padding-top: 10px;

    grid-column: 2/3;
    grid-row: 2/3;

    font-size: .75em;
    z-index: 10;
    position: relative;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease, height .5s ease, margin .5s ease
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    height: 0px;
    margin: 0px;
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