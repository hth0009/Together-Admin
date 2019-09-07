<template>
<!--  this is an idea i have to abstract the info of every
      page into one component -->
  <div class="item-page">
    <div class="item-container">
      <div class="header">
      </div>
    </div>
    <slot name="card"></slot>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  name: '',
  data () {
    return {}
  },
  components: {
    Avatar
  },
  methods: {
  },
  props: {
    values: {
      type: Object,
      default: function () {
        return {
          title: 'title',
          subtitle: 'subtitle',
          icon: 'icon',
        }
      }
    },
    mainInfo: {      
      type: Object,
      default: function () {
        return {
        }
      }
    }
  },
  mounted() {
  },
  computed: {
  }
}
</script>

<style scoped>
  
  .item-page {
    /* padding-left: 35px; */
    /* grid-gap: 35px; */
    display: flex;
    flex-direction: row;
    grid-template-columns: 240px auto;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    padding: 0px 3px;
    /* overflow-x: auto; */
  }
  .item-page.three-rows {
    grid-template-columns: 240px minmax(auto, 500px) auto;
  }

  .card-list-wrapper {
    overflow-y: auto;
    width: 100%;
    position: relative;
    padding: 0px 15px;
    /* border-right: 1px #E6E9EC solid; */
  }
  .page-card-wrapper {
    height: calc(100vh - 4vh);
    padding: 4vh 0px 0px 0px;
  }
  
  .card-header{
    color: #555555;
    font-size: 1.15rem;
    font-weight: 600;
    margin-bottom: 5px
  }
  /* .card-explanation ~ .card-header {
    margin-bottom: 0px;
  } */
  .card-explanation{
    font-size: .9rem;
    color: #a1a1a1;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .section-header{
    color: #505050;
    font-size: 1rem;
    font-weight: 600;
    margin: 35px 0px 5px 0px
  }
  .section-info{
    color: #6b6b6b;
    font-size: .85rem;
    font-weight: 500;
    margin: 0px 0px 10px 0px
  }

  .card-item {
    display: grid;
    grid-template-columns: 2fr 5fr;
    grid-gap: 10px;
    align-items: center;
  }
  .card-item .label{
    display: inline-flex;
    vertical-align: middle;
    
    color: #505050;
    font-size: 1rem;
    font-weight: 600;
    justify-self: flex-end;
  }
  .card-item .label i{
    font-size: 1rem;
    margin-right: 2.5px;
    color: #d3d3d3;
    line-height: normal;
  }
  .item-description{
    color: #6b6b6b;
    font-size: .85rem;
    font-weight: 500;
    margin: 20px 0px 10px 0px
  }

  .selected-view {
    /* margin-top: 40px; */
    /* padding: 0px 15px; */
    position: relative;
    /* height: calc(100vh - 80px); */
    overflow-y: auto;
    /* max-width: 600px; */
    min-width: 490px;
  }
  .selected-view h1,
  .selected-view h2,
  .selected-view h3,
  .selected-view h4,
  .selected-view h5 {
    font-weight: 600
  }
  .selected-view .header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 5px auto 15px auto 5px;
    margin: 40px 0px 00px 10px;
  }
  .selected-view .profile-pic {
    grid-row: 1/5;

    margin: 7.5px;
    margin-right: 15px;
  }

  .selected-view  h3 {
    grid-row: 2;
    grid-column: 2;
    padding-top: 10px;
    font-size: 32px;
  }

  .selected-view h3,
  .selected-view .subtitle {
    margin-left: 15px;
  }
  .selected-view .profile-pic + h3,
  .selected-view .profile-pic + h3 + .subtitle {
    margin-left: 0px; 
  }
  .selected-view .subtitle {
    grid-row: 3;
    grid-column: 2;
    font-size: 18px;
    font-weight: 600;
    color: #707070;
  }  
  .selected-view .quick-actions {
    margin-left: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .selected-view .quick-actions button{
    background: none;
    box-shadow: none;
    text-shadow: none;
    color: #d3d3d3;
    padding: 0px;
    margin-right: 10px;
  }
  .selected-view .quick-actions button:hover{
    color: #00cec9;
  }
  .selected-view .quick-actions button.red:hover{
    color: #ff7675;
  }
  .selected-view .details {
    max-width: 600px;
    min-width: 400px;
    margin: 15px 0px calc(4.5vh + 10px) 0px;
  }
  .selected-view .panel {
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 25px;
    margin: 15px 7.5px;
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 550px;
    min-width: 400px;
  }
  .selected-view .panel h4{
    font-size: 20px;
    color: #424242;
    margin-bottom: 10px;
  }
  .selected-view .panel .explanation{
    font-size: 16px;
    color: #a1a1a1;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .selected-view .panel .item{
    margin: 0px 0px 10px 10px;
    display: flex;
    align-items: flex-end;
  }
  .selected-view .panel .item i{
    font-size: 18px;
    margin-right: 7.5px;
    color: #e7e7e7;
    margin-top: 1px;
  }
  .selected-view .panel .item .label{
    font-size: 18px;
    display: inline-flex;
    vertical-align: middle;
    
    margin-right: 7.5px;
    color: #4e4e4e;
    font-weight: 500;
  }
  .selected-view .panel .item .content{
    flex: 1;
  }
  
  .new-item {
    display: grid;
    height: calc(100vh - 50px);
    grid-template-rows: 70px auto 70px;
    grid-template-columns: 1fr 15fr;
    align-items: center;
    /* justify-content: center; */
    margin: 25px;
    max-width: 600px;
  }
  .new-item .title{
    grid-column: 1/3;
    grid-row: 1;
    font-size: 1.7rem;
    margin: 20px;
    color: #7a7a7a;
    font-weight: 600;
  }
  .new-item .footer {
    height: 60px;
    padding: 5px;
    grid-row: 3;
    grid-column: 1/3;
    justify-self: flex-end;
  }
  .new-item .details{    
    overflow: hidden;
    grid-column: 2;
    grid-row: 2;
    width: 90%;
    max-width: 500px;
    max-height: 100%;
    /* overflow-y: auto; */
  }
  .new-item .profile-pic {
    grid-row: 1/5;

    width: 65px;
    height: 65px;
    border-radius: 50%;

    margin: 7.5px;
    margin-right: 15px;

    background-color: red;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;

    cursor: pointer;
  }

  .new-item .type{
    margin: 10px 0px;
    width: 100%;
  }
  .new-item .new-item-card{
    height: 350px;
  }
  .new-item .section-header{
    /* margin-top: 10px;
    color: #555555;
    font-size: 2rem;
    font-weight: 600; */
  }
  .new-item .section-header-info{
    margin-bottom: 20px;
    padding-top: 5px;
    color: #818181;
    font-size: .9rem;
    font-weight: 600;
  }
  .new-item .item-description{
    margin-bottom: 20px;
    color: #9c9c9c;
    font-size: .9rem;
    font-weight: 600;
    padding: 5px;
  }


  .editing-panel-wrapper {
    height: 100vh;
    overflow: auto;
  }

  .editing-panel {
    position: relative; 
    /* left: 30px; */
    border-radius: 10px;
    padding: 25px;
    margin: 5vh 20px 4vh 7.5px;
    /* height: calc(90vh - 60px); */
    box-shadow: 0px 3px 13px -2px #00000040;
    max-width: 550px;
    min-width: 350px;
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