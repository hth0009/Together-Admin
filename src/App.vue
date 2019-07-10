<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css';
@import '../node_modules/@syncfusion/ej2-vue-popups/styles/material.css'; 
@import '../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
@import "../node_modules/@syncfusion/ej2-vue-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-inplace-editor/styles/material.css";
</style>

<style src="./assets/css/material.css"></style> 

<style>
  #app{
    width: 100%;
    height: 100%;    
    -webkit-overflow-scrolling: touch;
    /* background: red; */
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
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #fafafa;
  }
  ::-webkit-scrollbar-track {
    /* box-shadow: 0px 0px 6px 0px #0000004d; */
    opacity: 0;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #e2e2e2;
    border-radius: 10px;
    /* outline: 1px solid slategrey; */
  }

  #app-content {
    height: 100%;
    position: relative;
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

  .basic-drag, .basic-input, .basic-textarea {
    background: white;
    border: none;
    outline: none;
    padding: 10px 10px;
    /* box-shadow: 0px 4px 4px -3px rgba(128, 128, 128, 0.158); */
    transition: .3s box-shadow ease;
    margin-bottom: 5px;
    font-size: 13px;
    width: calc(100% - 20px);
    resize: none;
  }
  .basic-button {
    /* border: #12b5e7 3px solid; */
    background: #00cec9;
    color: white;
    text-shadow: 0px 1px 8px #00000034;
    box-shadow: 0px 1px 6px 2px #00cecb69;
    outline: none;
    appearance: none;
    width: auto;
    border: none;
    cursor: pointer;
    padding: 12px 14px 11px 14px;
    font-size: .8rem;
    border-radius: 30px;
    /* line-height: 1; */
    transition: all .2s ease;
    font-weight: 600;    
    line-height: inherit;
    margin: 2.5px;

    
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  }
.basic-button.icon{
  width: 30px;
  height: 30px;
  padding: 5px 3px 3px 3px;
  /* border-radius: 50%; */
}
.basic-button.icon i{
  font-size: 20px;
}
  .basic-button:hover,
  .basic-button:focus {
    background: #0cd6d3;
    box-shadow: 0px 4px 8px 0px #01d3cfd8;
  }
  .basic-button.orange {
    background: #e17055;
    box-shadow: 0px 1px 8px 2px #e1715569;
  }
  .basic-button:hover.orange,
  .basic-button:focus.orange {
    background: #f37556;
    box-shadow: 0px 4px 8px 0px #e17155b7;
  }
  .basic-button.purple {
    background: #6c5ce7;
    box-shadow: 0px 1px 8px 2px #6c5ce77c;
  }
  .basic-button.red {
    background: #ff7675;
    box-shadow: 0px 1px 8px 2px #ff76757c;
  }
  .basic-button:hover.red,
  .basic-button:focus.red {
    background: #ff7f7f;
    box-shadow: 0px 4px 8px 0px #ff7575dc;
  }
  .basic-button.green {
    background: #05e0a2;
    box-shadow: 0px 1px 8px 2px #05e0a286;
  }
  .basic-button:hover.green,
  .basic-button:focus.green {
    background: #00eca9;
    box-shadow: 0px 4px 8px 0px #05e0a2ce;
  }
  .basic-input::placeholder, .basic-textarea::placeholder, .basic-button::placeholder{
    color: #7e7e7e;
  }
  /* .basic-input:hover, .basic-textarea:hover, .basic-button:hover{
    box-shadow: 0px 4px 4px -5px rgba(128, 128, 128, 0.507);
  } */
  /* .basic-input:focus, .basic-textarea:focus, .basic-button:focus{
    box-shadow: 0px 5px 6px -2px rgba(128, 128, 128, 0.507);
  } */
  .basic-button:hover {
    /* padding: 20px 23px;
    transform: translateY(-2px) */
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
  .basic-inline {
    width: 100%;
    min-height: 2.2rem;
    /* margin-bottom: 10px; */
  }
  .basic-inline .e-editable-value-wrapper{
    padding: .4rem .2rem .4rem 0px;
  }
  .basic-inline .e-editable-value-wrapper{
    padding: .4rem .2rem .4rem 0px;
  }
  
  .basic-radio{
    border-color: #00cec9;
    background: #00cec9;

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
    /* border-color: white; */
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



  /* /////////////////////////////
  ///////////People List//////////
  ///////////////////////////// */
/*   
.people-list-panel .people {
  max-height: 400px;
  overflow-y: auto;
  margin-right: 15px;
}
.people-list-panel .people-box {
  margin: 5px;
  padding: 10px;
  transition: all .3s ease;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-left: 2px white solid;
  cursor: pointer;
}  
.people-list-panel .people-box.unread {
  border-left: 2px #69CDCF solid;
}
.people-list-panel .people-box:hover {
  box-shadow: 0px 2px 4px -2px rgba(128, 128, 128, 0.507);    
}
.people-list-panel .people-box.selected {
  box-shadow: 0px 4px 5px -3px rgba(128, 128, 128, 0.507);
}
.people-list-panel .people-box .icon {
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  flex: 1;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.people-list-panel .people-box .person-info{
  flex: 1;
  padding-left: 10px;
} */

  /* /////////////////////////////
  ////////////Checkbox////////////
  ///////////////////////////// */
  

  .basic-checkbox{
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
  .basic-checkbox:hover {
    box-shadow: 0px 0px 0px 4px inset white;
    border-width: 3px;
    border-color: white;
  }
  .basic-checkbox:checked {
    box-shadow: 0px 0px 0px 2px inset white;
    border-width: 2px;
  }
</style>
