<template>
  <div class="this-sunday-container">
      <div class="new-item">
        <div class="title">This Sunday</div>
        <div class="details">
          <div class="profile-pic"></div>
          <div>
            <ejs-textbox floatLabelType="Auto" placeholder="Name"
            required name="none"></ejs-textbox>
          </div>
          <div>
            <ejs-textbox floatLabelType="Auto" placeholder="Description"
            required name="none"></ejs-textbox>
          </div>
          <div class="type">            
            <custom-radio v-model="newItemType" :options="['public', 'private', 'anonymous']"></custom-radio>
          </div>
          <div class="detailed public" v-if="newItemType == 0">
            <div class="section">
              Leader
            </div>
              <ejs-dropdownlist
                :dataSource='formatedPeople' 
                :fields="{ value: 'name'}"
                floatLabelType="Auto" 
                :placeholder='"Select Leader"'
                :allowFiltering="true"
                :select="assignMember"></ejs-dropdownlist>
            <div>
              <ejs-textbox floatLabelType="Auto" placeholder="Address"
              name="none"></ejs-textbox>
            </div>
            <div>
              <ejs-textbox floatLabelType="Auto" placeholder="Location Description"
              name="none"></ejs-textbox>
            </div>
            <ejs-recurrenceeditor id='editor' ref="EditorObj" :selectedType='selectedType' :change="onChange"></ejs-recurrenceeditor>
            <image-uploader field="img"
              v-model="uploadingPhoto"
              :width="300"
              :height="300"
              url="/upload"
              lang-type="en"
              :params="{}"
              :headers="{}"
              :noSquare="true"
              img-format="png"></image-uploader>
          </div>
        </div>
        <div class="footer">
          <button class="basic-button red" @click="creatingNewItem = false">CANCEL</button>
          <button class="basic-button green">CREATE</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ThisSunday',
  data () {
    return {}
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