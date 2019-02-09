<template>
  <div id="app">
    <app-header v-if="!$route.meta.noNav"></app-header>
    <div id="app-content" :class="$route.meta.noNav ? 'no-nav' : 'with-nav'">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
export default {
  name: 'App',
  components: {
    AppHeader
  }
}
</script>

<style>
  #app{
    width: 100%;
    height: 100%;
  }
  .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
  #app-content {
    /* height: calc(100% - 40px);
    position: relative; */
  }
  .with-nav {
    padding-top: 40px;
    /* position: fixed;
    overflow: auto;
    width: 100%;
    top: 40px;
    height: calc(100% - 40px); */
  }

  h3 {
    font-size: 20px;
  }

  .no-nav {
    width: 100%;
    height: 100%;
  }

  .basic-drag, .basic-input, .basic-textarea,  .basic-button{
    background: white;
    border: none;
    outline: none;
    padding: 10px 10px;
    /* box-shadow: 0px 4px 4px -3px rgba(128, 128, 128, 0.158); */
    transition: .3s box-shadow ease;
    margin-bottom: 5px;
    font-size: 13px;
  }
  .basic-button {
    /* border: #12b5e7 3px solid; */
    cursor: pointer;
    padding-top: 13px;
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .basic-input::placeholder, .basic-textarea::placeholder, .basic-button::placeholder{
    color: #7e7e7e;
  }
  .basic-input:hover, .basic-textarea:hover, .basic-button:hover{
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  }
  .basic-input:focus, .basic-textarea:focus, .basic-button:focus{
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  }
  .basic-button:hover {    
    box-shadow: 0px 4px 4px -3px rgba(128, 128, 128, 0.507);
    /* color: #fafafa */
  }
  .basic-button:active {    
    box-shadow: 0px 2px 3px -3px rgba(128, 128, 128, 0.507);
    /* color: #fafafa */
  }
  .basic-drag {
    cursor: grab;
    display: flex;
    flex-direction: column;
  }
  .basic-drag:hover {
    box-shadow: 0px 3px 5px -2px rgba(128, 128, 128, 0.507);
  }
  .basic-radio{
    appearance: none;
    outline: none;
    border-width: 3px;
    border-style: solid;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 0px 10px inset white;
    transition: all .2s;
  }
  .basic-radio:hover {
    box-shadow: 0px 0px 0px 4px inset white;
    border-width: 3px;
    border-color: white;
  }
  .basic-radio:checked {
    box-shadow: 0px 0px 0px 2px inset white;
    border-width: 2px;
  }
  .section-toggle {
    background: none;
    border: none;    
    display: inline-block;
    font-size: 15px;
    padding: 5px;
    width: 100%;
    text-align: left;
    cursor: pointer;
    outline: none;
  }
  .section-toggle::after {
    content: '+';  
  /* font-family: 'FontAwesome';
  content: '\f10e'; */
    vertical-align: middle;
    margin-left: 0.4em;
    color: #A0A3A6;
  }
</style>
