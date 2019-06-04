<template>
  <div id="splash-container">
    <div id="video-board">
      <div id="main-video-container">
      <!-- <video-bg :sources="[mainVideoURL]" :img="mainImageURL"></video-bg> -->
      <video autoplay muted loop id="main-video" type="video/mp4" src="/static/video/background.mp4"></video>      
        <!-- <img id="main-video" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"> -->
      </div>
      <div id="main-title" class="">
        <h1 id="bringing">BRINGING YOUR CHURCH</h1>
        <h1 id="together">TOGETHER</h1>
        <div id="join" class="noselect">
          JOIN
        </div>
      </div>
      <div class="next-page noselect">
        <i class="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
    <div id="mockups">
      <div class="floating-image"></div>
    </div>
    <!-- <div id="mission-vision" class='parallax-container'>
      <div class="cards forefront-element parallax">
        <div class="card one">
          <h2>ORGANIZE</h2>
            <div class="info">
              <div class="svg-wrapper">
                <svg height="135" width="225" transform="rotate()">
                  <defs> 
                    <linearGradient id="lgrad1" x1="0%" y1="100%" x2="100%" y2="0%" > 
                      <stop offset="0%" style="stop-color:rgb(38,255,172);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(151,172,232);stop-opacity:1" />
                    </linearGradient> 
                    <linearGradient id="lgrad2" x1="100%" y1="2%" x2="0%" y2="98%" > 
                      <stop offset="0%" style="stop-color:rgb(255,175,166);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(232,232,56);stop-opacity:1" />
                    </linearGradient> 
                    <linearGradient id="lgrad3" x1="100%" y1="72%" x2="0%" y2="28%" >
                      <stop offset="0%" style="stop-color:rgb(28,255,240);stop-opacity:1" />
                      <stop offset="100%" style="stop-color:rgb(232,232,56);stop-opacity:1" />
                    </linearGradient> 
                  </defs>
                  <g>
                    <title>computer</title>
                    <rect rx="4" id="svg_1" height="125" width="200" y="2.5" x="13" stroke-width="7" stroke="#aaa" fill="none"/>
                    <rect rx="4" id="svg_2" height="8" width="225" y="123" x="0" stroke-opacity="null" stroke-width="7" fill="#bbb"/>
                  </g>
                </svg>
              </div>
              <p>Accessible after creating a church account and logging onto togetheradmin.com. Here the church will be able to access and input their church’s data (such as serve teams, events, scheduling, push notifications, sermons, prayers, and more).</p>
            </div>
          </div>
        <div class="card two">
          <h2>ENGAGE</h2>
          <div class="info">
            <div class="svg-wrapper">
              <svg height="235" width="120" transform="rotate(0)">
                <g>
                  <title>phone</title>
                  <rect stroke="#aaa" rx="19" id="svg_1" height="225" width="110"  y="5" x="5" stroke-width="8" fill="none"/>
                  <rect rx="2" id="svg_3" height="4" width="40" y="215" x="42" fill="#999"/>
                </g>
              </svg>
            </div>
            <p>This information will all then be transferred over to our mobile platform. Every church will have a unique “churchcode” for their administration and members to connect to the Together app. Once plugged in, this churchcode will allow all users to add people as friends, sign up for events and serve teams, see a running prayer wall, and soon access sermons and other provided church media..</p>
          </div>
        </div>
        <div class="card three">
          <h2>UNITE</h2><div class="info">
            <div class="svg-wrapper">
              <svg height="145" width="145" transform="rotate(0)">
                <g>
                  <title>Earth</title>
                  <path id="svg_3" d="m71.87495,2.5c-38.31517,0 -69.37495,31.05977 -69.37495,69.37493c0,38.31516 31.05978,69.37493 69.37495,69.37493c38.31517,0 69.37495,-31.05977 69.37495,-69.37493c0,-38.31516 -31.05978,-69.37493 -69.37495,-69.37493zm-36.9882,28.70654c0.58234,0.26253 1.21719,0.49642 1.33652,0.65394c0.18616,0.24344 0.4296,0.9833 0.12411,1.16468c-0.31026,0.18616 -0.79714,0.12411 -0.86396,-0.4296c-0.06205,-0.54893 -0.12411,-0.61098 -0.85919,-0.85919c-0.10501,-0.03341 -0.16707,-0.04773 -0.24344,-0.0716c0.16707,-0.15275 0.3389,-0.30549 0.50597,-0.45824zm-2.47256,2.358c0.14797,0.41528 0.53938,0.59666 0,0.81146c-0.2864,0.11456 -0.58234,0.13365 -0.83055,0.10024c0.27685,-0.30072 0.53938,-0.62053 0.83055,-0.9117zm39.46076,93.36068c-30.36288,0 -55.05509,-24.6922 -55.05509,-55.0503c0,-0.40573 0.05251,-0.80191 0.06205,-1.21241c0.01909,-0.01432 0.03819,-0.02864 0.05728,-0.04296c0.61575,-0.48688 1.35084,-1.71361 1.59428,-2.14798c0.24821,-0.42482 0.86396,-0.73509 0.5537,-1.22196c-0.28162,-0.45824 -1.3938,-1.09786 -1.94273,-1.24583c0.04773,-0.47256 0.15275,-0.93079 0.2148,-1.40335c0.30072,0.36754 0.65394,0.81146 0.99284,0.92602c0.54893,0.18138 2.39142,0.24821 2.70168,0.24821c0.30072,0 1.59428,0.06683 1.84249,-0.30549c0.24344,-0.36754 0.4296,-0.36754 0.73509,-0.36754c0.30549,0 0.85919,1.10263 1.29356,1.22673c0.42482,0.12411 1.22673,0.06205 1.16468,0.86396c-0.05728,0.79237 0.36754,1.47495 0.79714,1.53222c0.4296,0.06205 1.41289,-0.92602 1.41289,-0.92602s0,1.537 -0.05728,2.0907c-0.06205,0.54415 0.67303,2.57757 0.67303,2.57757s0.92124,1.89499 1.16468,2.32936c0.24821,0.4296 1.28879,1.71838 1.28879,2.27208c0,0.55847 0.12411,1.41767 0.49642,1.41767s0.73986,-0.9833 1.16468,-1.59905c0.43437,-0.61098 0.55847,-1.47972 0.73986,-2.0907c0.18616,-0.61575 0.18616,-1.71838 0.18616,-2.14798c0,-0.43437 0.36277,-0.80191 1.22673,-1.16945c0.86396,-0.36754 1.47495,-1.41289 2.21003,-1.96659c0.73986,-0.5537 0.67781,-1.47495 2.15753,-1.47495c1.47017,0 1.34607,0 1.71838,-0.37232c0.36754,-0.36754 0.73509,-0.61098 0.91647,0.06205c0.18616,0.67781 1.22673,1.65633 1.41289,1.90454c0.18616,0.24821 0.5537,0.92124 0.49642,1.6611c-0.06205,0.73031 0.05728,1.59428 0.36754,1.59428c0.30549,0 0.92124,-1.04535 0.92124,-1.04535s1.35084,-0.91647 1.28879,0.06683c-0.06683,0.97852 0.11933,2.02865 0.11933,2.63485c0,0.62053 1.1074,2.0907 1.1074,1.72793c0,-0.37709 0.49165,-1.41289 0.49165,-1.97137c0,-0.54415 0.30549,-0.30072 1.10263,0.24344c0.79714,0.5537 1.35084,1.66588 1.35084,1.66588s0.80191,0.73509 0.92124,1.04535c0.12411,0.30549 0.9833,-0.11933 1.16468,-0.49642c0.18616,-0.36277 0.31026,-0.54893 0.79714,-0.67303c0.49642,-0.12411 1.10263,-0.12411 1.29356,-0.80191c0.18616,-0.67781 0.73509,-1.47017 0,-2.39619c-0.73509,-0.92124 -1.1074,-1.53222 -1.65633,-1.96659c-0.55847,-0.4296 -0.9833,-1.537 -0.9833,-1.537s1.16468,-1.04058 1.53223,-1.41289c0.37709,-0.36754 0.92124,-0.11933 0.98807,0.30549c0.06205,0.43437 -0.54893,0.80191 -0.67303,1.72316c-0.12411,0.91647 0.73509,1.22673 0.9833,0.91647c0.24344,-0.31026 0.85919,-1.04535 0.85919,-1.22673c0,-0.18616 -0.42482,-0.12411 -0.48688,-0.79714c-0.06205,-0.67781 0.79237,-1.16945 1.09786,-0.98807c0.31504,0.18616 2.27686,-0.24344 3.1981,-0.73509s1.47017,-1.537 2.02865,-1.96659c0.5537,-0.42482 2.45824,-1.84249 2.33414,-2.51552c-0.12411,-0.67781 0.05728,-1.59428 -0.4296,-2.45824c-0.49165,-0.85919 -1.1074,-1.40812 -1.35084,-1.78044c-0.24344,-0.36754 1.04535,-0.4296 1.65633,-0.9833c0.61575,-0.5537 0,-1.04535 -0.30549,-0.9833c-0.30549,0.06205 -1.1074,0.24821 -1.41289,0.18616c-0.30549,-0.06205 -0.49165,-0.36754 -0.9833,-0.73986c-0.48688,-0.36754 0.12411,-0.91647 0.43437,-0.85442c0.30549,0.06205 1.09786,-0.61575 1.47017,-0.92124c0.36754,-0.30549 0.92124,-0.54893 0.73509,-0.24344c-0.18138,0.30549 -0.61098,1.41289 -0.12411,1.47495c0.49642,0.06205 1.6611,-0.92124 1.85204,-0.85919c0.18138,0.06205 0.48688,0.85919 0.30549,1.22673c-0.18616,0.36754 -0.18616,0.9833 0.06205,0.92124c0.24344,-0.06205 0.73509,-0.61575 0.85919,-0.4296c0.12888,0.18616 0.73509,0.5537 0.4296,1.22673c-0.30072,0.67781 -0.92124,0.92124 -0.18616,1.35561c0.73509,0.42482 0.9833,0.05728 1.537,-0.24821c0.54893,-0.30549 0.92124,-1.65633 0.61098,-2.0907c-0.30549,-0.4296 -1.04058,-1.28879 -1.04058,-1.59428c0,-0.30549 1.22673,-0.30549 1.22673,-0.79714s0.4296,-0.85919 0.85919,-1.04535c0.43437,-0.18616 0.9833,-0.9833 1.16468,-0.73509c0.18616,0.24821 1.29356,0.5537 1.59428,0.18616c0.30549,-0.36754 1.90931,-1.71838 2.88784,-2.45824c0.9833,-0.73509 1.35084,-1.59428 1.60382,-2.45824c0.24344,-0.85919 0.61098,-1.41289 0.48688,-2.08593l0,0c0.36754,0.85919 0.4296,1.47495 0.36754,2.14798c-0.06205,0.67781 0,2.0907 0.12411,2.27208c0.11933,0.18616 0.61575,0.61098 0.91647,0.49165c0.30549,-0.11933 -0.11933,-1.35084 -0.11933,-1.59428c0,-0.24821 0.4296,-0.61575 0.67781,-0.67781c0.24821,-0.06205 0,-1.10263 -0.31026,-1.537c-0.30072,-0.4296 -0.73509,-0.67781 -0.48688,-0.73509c0.24344,-0.06205 0.54893,-0.5537 0.36754,-0.67781c-0.18616,-0.11933 -0.06683,-0.5537 -0.49165,-0.4296c-0.31026,0.09069 -1.15036,-0.0716 -1.12172,0.45346c-0.17661,-0.52506 -0.5537,-0.87351 -1.03103,-0.82101c-0.5537,0.06205 -0.86396,0.36754 -1.41289,0.36754s-0.11933,-0.85919 -0.36754,-0.85919c-0.24344,0 -0.80191,0.79714 -1.10263,0.36754c-0.30549,-0.4296 0.85919,-0.9833 1.78044,-1.28879c0.91647,-0.30549 2.45347,-2.0907 3.074,-2.15275c0.61098,-0.06205 2.14798,0.12411 3.49882,0.06205c1.35084,-0.06205 1.78044,-0.61575 2.21003,-0.30549s1.35084,0.67781 1.90454,0.61575c0.5537,-0.06683 0.30549,0 1.16468,-0.61575c0.85919,-0.61575 1.6611,-0.92124 2.0907,-1.41289c0.4296,-0.49165 1.59905,-0.85919 1.6611,-0.36754c0.06683,0.49165 -0.12411,0.9833 0.36754,0.9833s1.23151,-0.49165 1.84249,-0.73509c0.61575,-0.24344 1.10263,-0.5537 1.10263,-0.5537s-2.51552,1.71838 -3.1265,2.0907c-0.61575,0.36754 -2.0907,0.61575 -2.70645,1.35084c-0.61098,0.73986 -0.97852,0.9833 -0.91647,1.78521c0.06683,0.79714 1.10263,1.84249 0.61098,2.57757c-0.49165,0.73509 -0.67303,1.78044 -0.67303,1.78044s0.73509,-1.04535 1.78044,-1.71838s1.6611,-1.59428 2.02865,-1.96659s1.47495,-0.43437 1.47495,-0.86396s0.30549,-0.9833 0.49642,-1.47495c0.18138,-0.49165 -0.36754,-0.37232 0,-0.9833c0.36277,-0.61575 0.30549,-1.1074 2.14798,-1.1074s1.22673,0.12411 2.70168,0.06205c1.47495,-0.06205 2.02387,-0.79714 3.43677,-1.16945c1.41289,-0.36754 2.51552,-0.61098 2.94989,-0.42482c0.4296,0.18138 1.1074,0.05728 0.67303,-0.37232c-0.42482,-0.4296 -1.40812,-1.04535 -0.92124,-1.16945c0.49642,-0.12411 0.98807,-0.18616 1.17423,-0.67781c0.18616,-0.49165 -0.67781,-1.35084 -0.18616,-1.84249c0.49642,-0.49165 -0.36754,-1.10263 -0.98807,-1.22673c-0.61098,-0.11933 -3.00717,0.12411 -3.48927,-0.11933c-0.49642,-0.24821 -1.29356,-0.5537 -1.537,-0.37232c-0.24821,0.18616 -0.80191,1.16945 -0.80191,1.16945s-0.4296,0.11933 -0.80191,-0.4296c-0.36277,-0.5537 -2.38664,-0.49165 -3.0024,-0.49165s-1.29356,0.11933 -1.97137,0.18616c-0.67303,0.06205 -1.04535,0.24821 -1.537,-0.18616c-0.48688,-0.4296 -1.15991,-0.61575 -1.41289,-0.79714c-0.24344,-0.18616 -1.59428,-0.18616 -2.63963,-0.05728c-1.04058,0.11933 -2.0907,0.11933 -2.0907,0.11933s-0.49642,-0.18616 -1.22673,-0.61575c-0.73509,-0.4296 -1.47495,-0.73509 -1.72316,-0.73509c-0.24344,0 -2.14321,0.30549 -2.5728,0c-0.43437,-0.30549 -0.86396,-0.49165 -1.16946,-0.49165s-0.54893,-0.49165 -0.18138,-0.49165s2.08593,-0.49165 2.08593,-0.49165s-0.49165,-0.67781 -1.10263,-0.67781c-0.61098,0 -1.71361,-0.30549 -2.02387,-0.30549s-0.06683,0.30549 -0.67781,0.18616c-0.62053,-0.12411 -1.23151,-0.37232 -1.59905,-0.12411c-0.36277,0.24344 -1.23151,0.61098 -0.30549,0.85919c0.92124,0.24821 1.78044,0 2.02865,0.37232c0.24821,0.36754 0,0.54893 0,0.79714s-0.49165,0.92124 -0.79714,1.04535c-0.30549,0.11933 -0.68258,-0.18616 -1.28879,0.11933c-0.61575,0.30549 -2.15275,0.06205 -2.33891,0.24821c-0.18138,0.18616 -0.54893,-0.49165 -0.85919,-0.36754c-0.30549,0.11933 -1.1074,0.92124 -1.537,0.85919c-0.42482,-0.06205 -0.9833,-0.49165 -0.9833,-0.9833s-0.18138,-1.1074 -0.36754,-1.23151c-0.18138,-0.11933 -1.537,-0.18616 -2.02865,-0.11933c-0.49165,0.06205 -2.02387,0.18138 -2.27686,0.4296c-0.24821,0.24821 -0.92124,0.4296 -1.35084,0.4296s-0.79714,-0.4296 -1.71838,-0.5537c-0.91647,-0.12411 -2.94512,-0.18616 -3.19333,-0.12411s-1.04058,-0.11933 -0.73986,-0.36754c0.31026,-0.24344 1.22673,-1.04535 0.68258,-1.40812c-0.55847,-0.37232 -1.78998,-0.37232 -2.33414,-0.4296c-0.55847,-0.06205 -1.1074,-0.18616 -1.97137,-0.06205c-0.86396,0.12411 -1.04535,0.5537 -1.41289,0.18616c-0.36754,-0.36754 0.92124,0.18616 -0.36754,-0.36754c-1.28879,-0.5537 -1.90454,-0.49165 -2.27686,-0.30549c-0.36754,0.18616 0.06205,0.11933 -0.91647,0.49165c-0.9833,0.37232 -1.537,0.5537 -1.78521,0.61575c-0.24344,0.05728 -1.77566,-0.31026 -1.96182,-0.43437c-0.18138,-0.11933 -0.86396,0.06205 -1.47495,0.30549s-1.06444,0.61098 -1.67542,0.49165c-0.61575,-0.12888 -1.59905,-0.12888 -2.21481,0.11933c-0.61575,0.24344 -1.04535,0.24344 -1.65633,0.67303c-0.62053,0.4296 -1.78044,0.67781 -1.78044,0.67781s-0.29117,-0.01432 -0.64439,-0.03341c9.67068,-8.40098 22.25784,-13.53226 36.04786,-13.53226c30.36288,0 55.05509,24.6922 55.05509,55.05507s-24.69699,55.0503 -55.05509,55.0503zm-5.30789,-36.33902c0,0 0.98807,-0.12411 0.98807,-0.55847c0,-0.42482 -0.98807,-0.97852 -1.34607,-0.48688c-0.37232,0.48688 -1.04535,0.97852 -0.98807,1.41289c0.09069,0.67303 1.34607,-0.36754 1.34607,-0.36754zm-0.06205,-13.82821c-0.86396,1.11218 -0.79714,0.86874 -1.41289,0.61098c-0.61098,-0.23866 -1.59428,0.5537 -1.41289,0.86874c0.18616,0.30549 1.537,-0.06683 1.84249,0.48688c0.31026,0.5537 0.31026,0.61575 0.92124,0.49642c0.61098,-0.12411 1.22673,-0.97852 1.04535,-1.40812c-0.18138,-0.44392 -0.9833,-1.0549 -0.9833,-1.0549zm-0.18138,5.83295c-0.24344,0 -1.96659,0.30549 -2.15275,0.37709c-0.18616,0.06205 -1.28879,-0.11933 -1.28879,-0.11933c-0.4296,0.42482 -0.12411,0.85442 0.5537,0.79237s2.0907,-0.24821 2.39619,-0.24821c0.31026,0 0.73509,-0.80191 0.49165,-0.80191zm-2.63963,-17.07404c-0.90692,0.1432 -1.47017,2.0907 -0.73986,2.02865c0.73986,-0.05728 1.537,-2.14798 0.73986,-2.02865zm2.14798,10.9356c-0.24821,-0.30549 -0.86396,-1.29356 -1.54177,-1.04535c-0.20048,0.08115 -0.73031,1.16945 -0.05728,1.16945c0.67781,0 1.84726,0.18138 1.59905,-0.12411zm0.5537,-0.73509c1.1074,-0.06205 0.79714,-1.16945 -0.06205,-1.22673c-0.24344,-0.01909 -1.04535,1.28879 0.06205,1.22673zm13.08358,10.13368c-0.92124,-0.18616 -1.16468,-0.48688 -2.14798,-0.97852c-0.98807,-0.49165 -3.1981,-0.49165 -3.25538,-0.18616c-0.06683,0.30549 0,0 -0.73986,-0.23866c-0.73031,-0.25776 -1.29356,0 -1.47495,-0.43437c-0.18138,-0.43437 -0.61098,-0.55847 -1.16468,-0.00955c-0.46301,0.46301 -0.67781,0.49642 0.37232,0.68258c1.04058,0.18616 1.35084,0.18616 0.91647,0.67303c-0.4296,0.49642 -0.73509,1.11218 -0.36754,1.16468c0.36754,0.0716 1.47495,-0.23866 1.59428,0c0.12411,0.25776 -0.24344,0.30549 0.98807,0.50119c1.23151,0.17661 1.47495,0.61098 1.71361,0.84964c0.24344,0.24821 0.9833,1.05012 0.49642,1.05012c-0.49642,0 -1.04535,0.61098 -0.67781,0.68258c0.36754,0.06205 1.47495,-0.18616 1.53223,0c0.06683,0.17661 0.68258,1.35084 1.29356,1.29356c0.61575,-0.06205 0.9833,-1.16468 1.28879,-1.47972c0.31026,-0.30549 1.537,-0.49642 1.66588,0.05728c0.12411,0.5537 0.49642,1.11218 1.22673,1.48449c0.73509,0.36277 1.59905,0.73509 1.6611,0.42482c0.06205,-0.30549 -0.36754,-1.47495 -0.86396,-1.65156c-0.49165,-0.1957 -1.34607,-1.23628 -1.34607,-1.6611c0,-0.43437 -0.73986,-0.55847 -1.1074,-0.86874c-0.37232,-0.31026 -0.68258,-1.16945 -1.60382,-1.35561zm-45.58011,-9.09311c-0.40096,0.17661 -0.73986,2.27208 0,2.51552c0.73509,0.24821 1.16468,-0.97852 0.92124,-1.29356c-0.24821,-0.29117 -0.36754,-1.46063 -0.92124,-1.22196zm35.26027,5.22197c-0.56325,-0.23866 -1.59905,2.02387 -0.86396,2.21003c0.73986,0.19093 1.28879,-2.02387 0.86396,-2.21003zm1.23151,-21.06928c0.36754,0 0.85919,-0.24344 0.85919,-0.92124c0,-0.67781 0.85919,0 1.28879,-0.06205s0.67303,-0.49165 0.85919,-0.9833c0.02387,-0.06205 0.03819,-0.10024 0.04296,-0.12888c-0.01432,0.11456 -0.00477,0.44392 0.45346,0.55847c0.73509,0.18138 0.97852,-0.30549 0.97852,-0.49165s1.35084,-0.49165 1.60382,-0.67781c0.24344,-0.18138 1.23151,-0.49165 1.28879,-0.73509c0.06205,-0.24344 0,-1.6611 0.30549,-1.78044c0.30549,-0.12411 0.73509,-0.12411 0.24821,-0.9833c-0.49642,-0.86396 -0.49642,-1.6611 -1.1074,-1.29356c-0.45346,0.27208 -0.18138,1.35561 -0.54893,2.0907s-0.67781,1.41289 -0.92124,1.41289s-1.53223,0.49165 -1.90454,0.85919c-0.36277,0.36754 -2.14798,-0.30549 -2.39142,0c-0.24821,0.30549 -0.73509,0.67303 -1.04535,0.92124c-0.31026,0.24344 -1.16946,0.06205 -0.98807,0.79714c0.17184,0.74463 0.60621,1.41767 0.97852,1.41767zm8.41053,-7.8616c0.85919,-0.06205 1.6611,-0.30549 1.6611,-0.30549s1.29356,0.06205 1.1074,-0.5537c-0.19093,-0.61098 -1.537,-0.67303 -1.78998,-0.61098c-0.24344,0.06205 -0.67781,-0.67781 -1.16468,-0.5537c-0.45824,0.10979 -0.61098,0.73986 -0.61098,0.92124c0,0.18616 -1.71838,0.54893 -1.16946,1.04535c0.5537,0.48688 1.11218,0.11933 1.96659,0.05728zm-16.89266,33.42254c0.49642,0.30549 1.41289,-1.04535 1.66588,-0.62053c0.24344,0.43437 -0.06205,0.62053 0.36277,1.17423c0.43437,0.54415 1.23151,0.48688 1.23151,0.48688s-0.06205,-1.47495 -0.73986,-1.84726c-0.67781,-0.36754 -1.1074,-0.79237 -0.30549,-0.67303c0.79714,0.12411 1.22673,-0.18616 1.04535,-0.54415c-0.18616,-0.37232 -1.35084,-0.18616 -1.72316,-0.12411s-0.92124,-0.24821 -0.92124,-0.24821c-0.36754,0.11456 -0.30072,0.42482 -0.4296,1.04535c-0.12411,0.60621 -0.67781,1.0358 -0.18616,1.35084zm33.47983,12.21961c-1.10263,-0.24821 -0.36754,0.18616 0,0.73509c0.36754,0.5537 1.1074,0.8401 1.23151,0.23866c0.05251,-0.30072 -0.12888,-0.72554 -1.23151,-0.97375zm4.73033,14.92129c-0.36754,0.30549 0,0.43437 -1.04535,1.05012c-1.05012,0.62053 -2.33891,1.29356 -2.58235,1.84249c-0.24821,0.5537 0.24344,0.86396 1.23151,0.91647c0.9833,0.06205 0.73509,0.25298 1.41289,-0.49165s1.29356,-1.16468 2.0907,-1.78044c0.80191,-0.61098 0.80191,-1.537 0.80191,-1.537s-0.86396,-0.84964 -0.92124,-0.67303c-0.10501,0.29594 -0.62053,0.37232 -0.98807,0.67303zm-16.28168,-14.92129c0.06683,-0.5537 -1.04535,-0.5537 -1.59428,-0.98807c-0.5537,-0.42482 -0.61098,-1.71361 -0.92124,-2.45824c-0.30549,-0.73031 -0.91647,-1.22673 -1.537,-1.89499c-0.61098,-0.68258 -0.91647,-2.21958 -1.09786,-2.0907c-0.18616,0.11933 -0.73509,1.90454 -0.30549,2.45824c0.4296,0.5537 -0.18616,1.6611 -0.49165,2.40096c-0.31026,0.73031 -1.05012,-0.12411 -1.66588,-0.49642c-0.61575,-0.37232 -1.47017,-0.61098 -1.89977,-1.04535c-0.4296,-0.43437 0.73986,-1.59905 0.43437,-2.03342c-0.31026,-0.4296 -1.96659,-0.06205 -2.14798,-0.06205c-0.18616,0 -0.5537,-0.61098 -0.92602,-0.61098c-0.36754,0 -0.30549,1.23151 -0.30549,1.23151s-0.37232,-0.43437 -0.92124,-0.98807c-0.55847,-0.54893 0.05728,0.36754 -0.49165,0.92124c-0.55847,0.55847 -0.37709,0.37232 -0.61575,0.9833c-0.24344,0.61575 -0.79714,0.36754 -1.35084,-0.24821c-0.5537,-0.61098 -0.85442,-0.17661 -1.23151,0c-0.36754,0.18616 -0.67303,1.23628 -0.85919,1.47495c-0.18616,0.24821 -1.47495,0.55847 -1.78521,0.86874c-0.30549,0.29594 -0.4296,1.28879 -0.4296,1.537c0,0.23866 -1.29356,0.10979 -1.72316,0.42482c-0.4296,0.30549 -1.09786,0.11933 -1.53223,0.11933c-0.4296,0 -1.90454,1.16468 -2.39619,1.47017c-0.49165,0.31504 -0.49165,1.42244 -0.24344,1.72793c0.24344,0.30072 0.73509,1.04535 0.4296,1.16468c-0.30549,0.12411 -0.49642,0.9833 0.24344,1.71361c0.73509,0.73986 0.49165,0.92602 0.54893,1.29356c0.06683,0.36754 0.37232,0.49642 0.86396,1.1074c0.48688,0.61098 -0.86396,1.10263 -1.04535,1.47972c-0.18616,0.36277 0.43437,0.91647 0.79714,1.22673c0.36754,0.30072 1.29356,0.12411 1.84249,-0.06205c0.55847,-0.18616 1.16946,-0.68258 1.53223,-0.73986c0.37709,-0.06205 2.0907,-0.12411 2.0907,-0.12411s0.61575,-0.91647 1.04535,-1.41289c0.42482,-0.48688 1.77566,-0.06205 1.77566,-0.06205s0.55847,-0.36277 2.03342,-0.67303c1.47495,-0.31026 0.85442,0.30549 1.41289,0.49642c0.54893,0.17661 1.28879,0.29594 1.71361,0.61098c0.4296,0.30549 0,1.04058 -0.05728,1.35084c-0.06683,0.30549 1.04535,0.18138 1.09786,-0.12411c0.06683,-0.30549 0.36754,-0.61098 0.98807,-0.97852c0.61098,-0.37232 0.11933,0.54415 0.36277,1.10263c0.24821,0.5537 0.61575,-0.74941 0.61575,-0.12411c0,0.18616 0.18616,0.37232 0.24344,0.5537c0.06683,0.18616 0.86396,0.24821 0.86396,0.85919c0,0.62053 0,0.98807 0.18616,1.10263c0.18138,0.12411 1.16468,0 1.59905,0.73986c0.42482,0.73509 0.73509,0.06205 0.97852,-0.24821c0.24821,-0.30549 1.10263,0.12411 1.35084,0.37232c0.24821,0.23866 0.92124,-0.49642 1.84726,-0.73986c0.91647,-0.24344 0.79714,-0.18616 1.04535,-0.54893c0.24344,-0.37232 0.4296,-1.35084 0.97852,-2.0907c0.54893,-0.73031 1.29356,-2.02387 1.29356,-3.01194c0,-0.9833 -0.06683,-3.25538 -0.73986,-4.29118c-0.67303,-1.04535 -1.95705,-2.09547 -1.89977,-2.6444zm-2.26731,15.04539c-0.31026,-0.06205 -0.98807,-0.29594 -0.98807,-0.29594c-0.67781,0.67303 0.67781,0.67303 0.49642,1.35084c-0.18616,0.67303 0.92124,0.42482 1.22673,0.30549c0.30072,-0.12888 1.05012,-1.54177 0.92124,-1.90454c-0.11933,-0.37709 -1.35084,0.60621 -1.65633,0.54415zm22.78767,-2.82578c-0.24821,0 -0.36754,0.30549 -0.91647,0c-0.55847,-0.30072 -0.43437,-0.17661 -0.80191,-0.79714c-0.36754,-0.60621 -0.43437,-1.41289 -1.04535,-1.09786c-0.24344,0.11933 0,0.80191 0.24344,1.04058c0.25298,0.24821 0.36754,1.10263 0.30549,1.35084c-0.05728,0.24821 -1.10263,0.5537 -0.61575,0.85919c0.49642,0.30549 1.41767,0 1.29356,0.37232c-0.11933,0.36754 -0.61575,0.85442 -0.06205,0.97852c0.54893,0.11933 0.73509,-0.42482 0.98807,-0.84964c0.24344,-0.44392 0.42482,-0.80669 0.85442,-1.0549c0.4296,-0.24821 0,-0.80191 -0.24344,-0.80191zm0.05728,-14.31031c0.80191,0.30549 2.21481,-1.10263 1.65633,-1.28879c-0.54893,-0.18616 -1.65633,1.28879 -1.65633,1.28879zm-42.44407,-6.08117c-0.13843,0.54893 0.92124,0.79714 0.9833,0.18616c0.05728,-0.61575 -0.85919,-0.67781 -0.9833,-0.18616zm1.65633,-16.40101c-0.30549,0.31026 -1.22673,0.92124 -1.35084,1.47972c-0.11933,0.54893 1.47495,-0.86874 1.90454,-1.41289c0.43437,-0.55847 1.28879,-0.24821 1.47017,-0.55847c0.19093,-0.30072 0.19093,-0.30072 0.19093,-0.30072s-0.67781,-0.11933 -1.22673,-0.30072c-0.55847,-0.18616 -1.23151,0.48688 -0.92124,-0.49642c0.30549,-0.9833 1.22673,-0.79714 1.04535,-1.537c-0.18616,-0.73509 -0.80191,-0.92124 -0.98807,-0.92124c-0.4296,0 0.06205,0.67303 -0.5537,1.10263c-0.61098,0.4296 -1.29356,0.61098 -0.92124,1.35084c0.36754,0.73509 1.65633,1.28401 1.35084,1.59428zm-4.84966,15.66115c0.06205,-0.36277 -0.67781,-0.91647 -0.9833,-0.91647c-0.31026,0 -1.84249,-0.36754 -1.84249,-0.36754c-0.27685,0.10979 -0.64439,0.2148 -0.75418,0.36754c-0.03341,-0.05251 -0.10501,-0.11456 -0.23389,-0.18616c-0.67781,-0.358 -1.47495,0 -1.72316,-0.48688c-0.23866,-0.49642 -0.60621,-0.49642 -0.85442,-0.18616c-0.44869,0.55847 0.11933,0.9833 0.30072,1.10263c0.18138,0.11456 0.86396,0.24821 1.47495,0.18616c0.38186,-0.03819 0.86396,-0.12888 1.00239,-0.28162c0.01909,0.06683 0.07637,0.12888 0.16707,0.21002c0.49165,0.43914 0.79714,0.62053 1.53223,0.5537c0.74463,-0.04773 1.85204,0.37709 1.91409,0.00477zm-1.78044,-3.62292c0.31026,0 0.92124,0 1.35084,0.12411c0.4296,0.11933 1.84249,0.23866 1.78044,-0.30549c-0.06205,-0.54893 -0.18138,-1.41767 0.42482,-1.96182c0.62053,-0.55847 1.22673,-0.85919 0.92124,-1.6611c-0.30072,-0.79714 -0.92124,-1.29356 -0.49165,-1.66588c0.4296,-0.36277 0.91647,-0.48688 0.91647,-0.79237c0,-0.31026 -1.0358,0.85919 -1.16468,-1.17423c-0.02387,-0.43437 -0.9833,0.11933 -1.04535,0.5537c-0.05728,0.43437 0.67781,0.79714 -0.49165,0.79714c-1.16946,0 -1.22673,0.92602 -1.47495,1.1074c-0.24821,0.18616 -0.49165,0.24344 -0.98807,0.36277c-0.48688,0.12411 -0.60621,0.62053 -0.73031,0.92602c-0.11933,0.30072 -0.9833,-0.5537 -1.22673,-0.30549c-0.24344,0.24821 -0.06205,1.41289 0.36754,2.39142c0.43914,0.98807 1.54177,1.60382 1.85204,1.60382zm-4.3055,-0.30549c0.31026,-0.36754 0.18138,-0.91647 -0.30072,-0.85919c-0.49165,0.06205 -0.92124,-0.80191 -1.71838,-1.35084c-0.80191,-0.54415 -1.41289,-0.92602 -2.15275,-1.71838c-0.73509,-0.79714 -1.65633,-1.29356 -2.14798,-1.71361c-0.49642,-0.43437 -1.22673,-0.62053 -1.537,-0.5537c-0.75895,0.15275 1.10263,1.47495 1.29356,1.65156c0.18616,0.1957 1.84726,1.59905 1.84726,2.28163s1.10263,2.27208 1.41289,2.51552c0.30549,0.24821 1.83772,1.16468 2.08593,1.6611c0.24821,0.49165 0.79714,0.62053 0.79714,-0.06205c-0.00477,-0.67781 0.11933,-1.47972 0.42005,-1.85203zm-4.6635,-6.94036c0.30549,1.1074 0.92124,2.2148 1.16468,2.64917c0.24821,0.42482 1.29356,1.0358 1.6611,1.34129c0.36754,0.30549 0.91647,-0.11456 0.68258,-0.48688c-0.24821,-0.37232 -0.73986,-0.91647 -0.79714,-1.35084c-0.06205,-0.43437 -0.37232,-1.11218 -0.86396,-1.84726c-0.48688,-0.73031 -0.91647,-0.91647 -1.22673,-1.40812c-0.30549,-0.49642 -1.41289,-1.41767 -1.41289,-1.41767c-0.48688,0.06205 -0.48688,0.97852 -0.24344,1.29356c0.23389,0.30072 0.73031,0.12411 1.0358,1.22673z" 
                    fill-opacity="null" stroke-opacity="null" stroke-width="5" stroke="#aaa" fill="none"/>
                </g>
              </svg>
            </div>
            <p>While you’re getting plugged into your church, you might as well get plugged in with other Christians too! By hopping over to the social side of our app, you’ll be able to sign up for friend events, and most importantly see testimonies from your friends and Christians around 	the world. (coming soon)</p>
          </div>
        </div>
      </div>
    </div> -->
    <div id="features">
      <h1>Everything your church needs</h1>
      <div id="feature-grid">
        <div class="feature noselect"
        v-for="(feature, index) in features"
        :key="index"
        :class="{'selected': feature.selected}">
          <i class="material-icons"  
          :class="{'coming-soon-padding': feature.inDev == true}">{{feature.icon}}</i>
          <div class="title">{{feature.title}}</div>
          <div class="coming-soon" v-if="feature.inDev">coming soon</div>
          <div class="description">
            {{feature.description}}
          </div>
        </div>
      </div>
    </div>
    <div id="pricing">
      <h1>Priced to the size of your church!</h1>
      <div id="price-visualizer">
        <div class="church-size">
          <div for="" class="header">
            How many people do you think will use the app?
          </div>
          <div class="number">
            <input type="number" class="" v-model="churchSize" min="0" max="5000">
            <span>{{churchSize == maxChurchSize ? '+' : ''}}</span>
          </div>
          <div class="slider-wrapper">
            <vue-slider v-model="churchSizePercentage"
              :dotSize="20"          
              :process-style="{ backgroundColor: '#55efc4' }"
              :tooltip="'none'"
              :dot-style="{ backgroundColor: 'white', borderColor: 'white' }"
              :min="0"
              :max="100"/>
          </div>
        </div>
        <div class="monthly-payment">
          <div for="" class="header">
            You church will pay:
          </div>
          <div type="number" class="number">{{'$' + monthlyPayment}}</div>
          <div for="" class="footer">
            per month
          </div>
        </div>
      </div>
      <div class="explain">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi sunt, cumque omnis impedit ratione nulla quas et, magnam ipsam corrupti rerum dignissimos rem explicabo ipsum eos, id similique quidem. Quis?</div>
      <button class="basic-button purple">FIND OUT MORE</button>
    </div>
  </div>
</template>

<script>
import VideoBg from 'vue-videobg'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

export default {
  name: '',
  data () {
    return {
      mainVideoURL: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
      mainImageURL: 'https://images.unsplash.com/photo-1463171379579-3fdfb86d6285?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      features: [
        {
          title: 'People',
          icon: 'person',
          // description: 'blah blah',
          selected: true
        },
        {
          title: 'Events',
          icon: 'event'
        },
        {
          title: 'Small Groups',
          icon: 'people'
        },
        {
          title: 'Serve Teams',
          icon: 'people'
        },
        {
          title: 'Services',
          icon: 'list'
        },
        {
          title: 'Giving',
          icon: 'panorama_fish_eye',
          inDev: true,
        },
        {
          title: 'Financial',
          icon: 'credit_card',
          inDev: true,
        },
        {
          title: 'Messaging',
          icon: 'message'
        },
        // {
        //   title: 'Meals',
        //   icon: 'message'
        // },
        {
          title: 'Push Notification',
          icon: 'notifications'
        },
        {
          title: 'Prayer Wall',
          icon: 'notes'
        },
        {
          title: 'Analyatics',
          icon: 'bar_chart',
          inDev: true
        },
        {
          title: 'Safe Check In',
          icon: 'child_friendly'
        }
      ],
      churchSizePercentage: 20,
      maxChurchSize: 5000
    }
  },
  components: {
    VideoBg,
    VueSlider
  },
  methods: {
  },
  props: {
  },
  mounted() {    
  },
  computed: {
    churchSize: {
      get() {
        // FORMULA FOR CHURCH SIZE = c(e^(slowness * churchSizePerctage) - 1)
        const slowness = 3
        const c = this.maxChurchSize / (Math.exp(slowness) - 1) // so that scale*(e^1 - 1) = 5000
        const percentage = this.churchSizePercentage / 100
        const churchSize = c * (Math.exp(slowness * percentage) - 1)
        return Math.round(churchSize)
      },
      set(newValue) {        
        // FORMULA FOR CHURCH SIZE PERCENTAGE = c(e^(slowness * churchSizePerctage) - 1)
        if (newValue >= this.maxChurchSize) {
          newValue = this.maxChurchSize
        }
        const slowness = 3
        const c = this.maxChurchSize / (Math.exp(slowness) - 1) // so that scale*(e^1 - 1) = 5000
        var percentage = newValue / c
        percentage += 1
        console.log(percentage)
        percentage = Math.log(percentage)
        percentage /= slowness
        console.log(percentage)
        this.churchSizePercentage = percentage * 100
      }
    },
    monthlyPayment() {
      const size = this.churchSize
      if (size == 0) {
        return 0
      } else if (size <= 100) {
        return 20
      } else if (size <= 250) {
        return 30
      } else if (size <= 500) {
        return 50
      } else if (size <= 1000) {
        return 75
      } else if (size <= 2000) {
        return 110
      } else if (size <= 3000) {
        return 150
      } else if (size <= 4000) {
        return 200
      }
      return 250
    }
  }
}
</script>

<style scoped>

#splash-container {
  /* perspective: 2px; */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
h1 {
  font-weight: lighter;
}

.parallax-container {  
  /* transform-style: preserve-3d; */
}
/* .forefront-element {
  position: relative;
  z-index: 600;
  transform: translateZ(1px) scale(.5) translateX(1%) translateY(-65%);
} */
#video-board {
  position: relative;
}
#main-video-container{
  /* width: 100vw; */
  position: relative;
  height: 90vh;
  overflow: hidden;
}
#main-video {  
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 0;
}
#main-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
  width: 90vw;
  font-weight: 100;
  top: 45vh;
}
#main-title h1{
  width: 100%;
  text-align: center
}
#bringing{
  font-size: 22.5px;
}
#together{
  font-size: 50px;
  font-weight: 700;
}
#join{
  margin: 10px auto;
  text-align: center;
  width: 120px;
  padding-bottom: 5px;
  cursor: pointer;
  transition: all .3s ease;
  position: relative;
  z-index: 100;
  transition: all 0.1s ease-in-out .2s;
} 
#join:hover {
  width: 55px;
  color: black;
}
#join::before { 
  content: "";
  position: absolute;
  z-index: -1;
  /* width: 120px; */
  height: 1px;
  bottom: -2px;
  border-radius: 2px;
  right: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  border: 0px rgb(255, 255, 255) solid;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}
#join:hover::before {
  height: 32px;
}
.next-page {
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  color: white;
  padding: 10px;
  background: -moz-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(294deg, #a29bfe 0%, #55efc4 100%); /* w3c */
  transform: rotate(90deg);
  width: 25px;
  height: 25px;
  border-radius: 40px;
  top: 90vh;
  left: 50vw;
  z-index: 200;
  transform: translate(-50%, -50%);
  vertical-align: middle;
  cursor: pointer;
  text-shadow: 0px 1px 9px #0000006e;
  /* line-height: .5; */
}
#mission-vision {
  height: 500px;
  /* background: rgb(191, 191, 192); */
  /* width: 100vw; */
  position: relative;
  z-index: 200;
}
#mission-vision .cards{
  position: relative;
  padding: 0px 10%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 150px 150px 150px 300px 125px 250px;
  grid-gap: 30px;
}
#mission-vision .card {
  background: white;
  /* border-radius: 5px; */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.267);
}
#mission-vision .card .info{
  background: white;
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  padding: 20px 30px 20px;
  margin-top: 20px;
  height: 600px;
}
#mission-vision .card .info .svg-wrapper{
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
#mission-vision .card .info p{
  margin-bottom: 20px;
  padding: 5px;
  font-size: 1.2rem;
}
.card h2{
  text-align: center;
  color: white;
  font-size: 30px;
  padding-top: 30px;
}
#mission-vision .card.one{
  grid-column: 1/2;
  grid-row: 1/5;
  background: -moz-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(156deg, #a29bfe 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(294deg, #a29bfe 0%, #55efc4 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#55efc4', endColorstr='#a29bfe',GradientType=1 ); /* ie6-9 */
  /* background-image: url('https://images.unsplash.com/photo-1496902526517-c0f2cb8fdb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'); */
}
#mission-vision .card.two{
  grid-column: 2/3;
  grid-row: 1/5;
  background: -moz-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(331deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* ie10+ */
  background: linear-gradient(119deg, #74b9ff 0%, #74b9ff 1%, #d656ce 100%); /* w3c */
  /* background-image: url('https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80') */
}
#mission-vision .card.three{
  grid-column: 3/4;
  grid-row: 1/5;
  background: -moz-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(331deg, #D656CE 0%, #55efc4 100%); /* ie10+ */
  background: linear-gradient(119deg, #D656CE 0%, #55efc4 100%); /* w3c */
  /* background-image: url('https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') */
}

#mockups {
  height: 50vh;
  position: relative;
  background: #c2b2b22c;
}
#mockups .floating-image{  
  width: 100%;
  height: 80vh;

  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;

  background-image: url('/static/image/mockups.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}


#features {
  background: -moz-linear-gradient(187deg, #ff7675 0%, #ff7675 1%, #6c5ce7 100%); /* ff3.6+ */
  background: -webkit-linear-gradient(187deg, #ff7675 0%, #ff7675 1%, #6c5ce7 100%); /* safari5.1+,chrome10+ */
  background: -o-linear-gradient(187deg, #ff7675 0%, #ff7675 1%, #6c5ce7 100%); /* opera 11.10+ */
  background: -ms-linear-gradient(187deg, #ff7675 0%, #ff7675 1%, #6c5ce7 100%); /* ie10+ */
  background: linear-gradient(263deg, #ff7675 0%, #ff7675 1%, #6c5ce7 100%); /* w3c */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6c5ce7', endColorstr='#ff7675',GradientType=1 ); /* ie6-9 */

  min-height: 100vh;
}
#features h1{
  text-align: center;
  color: white;
  margin-bottom: 100px;
  padding-top: 120px;
}
#feature-grid {
  padding: 0px 15% 50px 15%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
}
#feature-grid::before {
  content: '';
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
#feature-grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}
#feature-grid .feature{
  border: 1px white solid;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-weight: normal;
}
#feature-grid .feature i{
  width: 100%;
  font-size: 4rem;
  text-align: center;
  margin-bottom: 15px;
  text-shadow: 0px 1px 6px #0000002c;
}
#feature-grid .feature i.coming-soon-padding{
  margin-top: 20px;
}
#feature-grid .feature .title{
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  text-shadow: 0px 1px 6px #0000002c;
}
#feature-grid .feature .coming-soon{
  width: 100%;
  font-size: 1.1rem;
  text-align: center;
  font-weight: 600;
  background: white;
  font-size: .7rem;
  width: 80px;
  border-radius: 30px;
  margin-top: 10px;
  color: purple;
  padding: 2px 4px;
}

#pricing {
  background: rgb(96, 179, 247);

  min-height: 99.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#pricing h1{
  text-align: center;
  color: white;
  margin-bottom: 80px;
  padding-top: 100px;
}
#price-visualizer {
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
}
#price-visualizer .church-size {
  padding: 10%;
  grid-column: 2/3;
  display: grid;
  grid-template-rows: 80px 100px 40px;
  border-right: 1px #ffffff77 solid;
}
#price-visualizer .church-size .header{
  color: white;
  font-size: 30px;
  width: 100%;
  text-align: right;
  padding-bottom: 10px;
  font-weight: normal;
  align-self: flex-end;
}
#price-visualizer .church-size .number{
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: right;
  font-weight: 900;
  align-self: center;
  display: flex;
  justify-content: flex-end;
}
#price-visualizer .church-size .number input{
  background: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  width: 230px;
}
#price-visualizer .church-size .number span{
  color: white;
  font-size: 80px;
  text-align: right;
  font-weight: 900;
  display: inline;
  line-height: initial;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
.slider-wrapper {
  padding: 5px;
  padding-left: 10%;
}
#price-visualizer .monthly-payment {
  padding: 10%;
  grid-column: 3/4;
  display: grid;
  grid-template-rows: 80px 100px 40px;
}
#price-visualizer .monthly-payment .header{
  color: white;
  padding-bottom: 20px;
  font-weight: normal;
  width: 100%;
  text-align: left;
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
  align-self: flex-end;
}
#price-visualizer .monthly-payment .number{
  color: white;
  font-size: 80px;
  width: 100%;
  text-align: left;
  font-weight: 500;
  line-height: 1;
  align-self: center;
}
#price-visualizer .monthly-payment .footer{
  color: white;
  padding-bottom: 20px;
  font-weight: normal;
  width: 100%;
  text-align: left;
  padding-bottom: 10px;
  font-size: 30px;
  font-weight: 500;
  align-self: flex-start;
}
#pricing .explain{
  color: white;
  padding: 20px 10%;
}
#pricing button{
  margin: 30px auto;
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
@media all and (max-width: 768px) {
  #splash-container {
    perspective: 1px;
    perspective-origin: center;
    overflow-x: hidden;
    overflow-y: visible;
  }
  .parallax {
    transform: none;
  }
  .parallax-container {
    transform-style: flat;
  }
 }

@media all and (max-width: 480px) {
 }
</style>