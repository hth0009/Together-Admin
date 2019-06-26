<template>
  <div class="avatar-container noselect"
    :class="{'white-background': (url == '' || url == undefined) && title == ''}"
    :style="{
      height: height + 'px',
      width: height + 'px',
      backgroundImage: url != '' && url != undefined ?
        'url(' + url + ')' :
        gradients[(title.length % 6)]
    }">
    <div class="text" v-if="url == '' || url == undefined"
      :style="{
        fontSize: height / 2.5 + 'px'
      }">
      {{abbreviation}}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      divHeight: this.height,
      gradients: [
        'linear-gradient(36deg, rgba(187,226,41,1) 20%, rgba(39,219,255,1) 80%)',
        'linear-gradient(317deg, rgba(226,190,41,1) 20%, rgba(233,16,115,1) 80%)',
        'linear-gradient(209deg, rgba(242,19,245,1) 20%, rgba(16,233,52,1) 80%)',
        'linear-gradient(255deg, rgba(41,157,226,1) 20%, rgba(132,16,233,1) 80%)',
        'linear-gradient(60deg, #00b5ff 20%, #f41d1d 80%)',
        'linear-gradient(120deg, #00ffbc 25%, #808080 75%)'
      ]
    }
  },
  components: {
  },
  methods: {
  },
  props: {
    title: {
      default: '',
      type: String
    },
    url: String,
    height: {
      default: 45,
      type: Number
    }
  },
  mounted() {
  },
  computed: {    
    abbreviation() {
      var abbr = ""
      const words = this.title.split(' ')
      for (const key in words) {
        if (key > 2) {
          break
        }
        abbr += words[key].charAt(0)
      }
      return abbr
    }
  }
}
</script>

<style scoped>

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: grey; */
  border-radius: 50%;
  
  background-color: #eeeeee;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.avatar-container .text{
  color: white;
  opacity: .9;
  font-weight: 600;
  text-transform: uppercase;
}
.avatar-container.white-background {
  background-image: none !important;
  background-color: #ffffff00 !important;
}

</style>