<template>
  <div id="product-wrapper" class="animated fadeIn fast">
    <b-row>
      <b-col md='3' class="mb2em">
        <b-row class="mb1em">
          <b-col sm="6" class="website-mobile-tab" 
                 :class="{'gs-active': showWebsiteDetails, 'gs-inactive': !showWebsiteDetails}"
                 @click="showWebsiteDetails = true"
          >WEBSITE</b-col>
          <b-col sm="6" class="website-mobile-tab"
                 :class="{'gs-active': !showWebsiteDetails, 'gs-inactive': showWebsiteDetails}"
                 @click="showWebsiteDetails = false"
          >MOBILE</b-col>
        </b-row>
        <span class="product-description-text" v-show="showWebsiteDetails">
          Obviously you’ve found our Website.  This is Step 1. This means you’re interested in getting your organization plugged in through Together. <br> <br> By hitting that sign up button in the top right, you’re creating an organizational account. That means you are giving your organization it’s new digital home on our mobile app for connecting your people. This will allow your intended audience to search and join your organization on the app. <br> <br> The point of the website is to manage everything going on within the app. On the website, you can manage all your people, teams, sunday events, giving, and your staff. <br> <br>The website is strictly for staff and administration. If people in your church have not received an invitation from you to access the website portal, then they will be denied access. Secured. <br>
        </span>
        <span class="product-description-text" v-show="!showWebsiteDetails">
          Welcome to Step 2. Have your church go to the App Store on their phone (iPhone and Android) to download Together today. Type in Together - Church Connection for a quick find. Here, they’ll create their account, search your organization and join today! All for free. <br><br>This Mobile platform is for everyone within the organization all the way from the staff to the one time attendee. <br><br>This is designed to increase engagement allowing people within your organization to join bible study, community groups, and serve teams have them be in a “team message” right on the app. No more groupme. No more group text. All in one place. <br><br>Not to mention, allow them to give to your organization right on the app.      </span>
      </b-col>
      <b-col md='9'>
        <b-row>
          <b-col md="4" v-for="webImg in webImgs" :key='webImg.id' class="gs-flex-col mb2em">
            {{webImg.title}}
            <img class="website-img" :src="webImg.imgUrl" alt="">
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showWebsiteDetails: true,
        webImgs: [
          { title: 'Managing', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/org-home.png' },
          { title: 'Messaging', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/inbox.png' },
          { title: 'People', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/people.png' },
          { title: 'Teams', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/teams.png' },
          { title: 'This Sunday', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/This-Sunday.png' },
          { title: 'Giving', imgUrl: 'https://togethercdn.global.ssl.fastly.net/XDExternalScreenshots/giving.png' },
        ],
      }
    },
  }
</script>

<style lang="css" scoped>

#product-wrapper {
  color: white;
}

.website-mobile-tab {
  cursor: pointer;
  font-weight: bold;
}

.product-description-text {
  line-height: 1;
  font-size: 11pt;
}

.website-img {
  height: auto;
  max-width: 100%
}

</style>