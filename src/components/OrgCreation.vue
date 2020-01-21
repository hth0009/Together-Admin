<template>
  <div id="org-creation-wrapper" style="text-align:center;">
    <label style="display:block;font-size:1rem;margin-bottom:0;color:#004580;">ORGANIZATION CREATION</label>
    <form v-on:submit.prevent="createOrg" style="margin:auto;">
      <div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Church Name"
            name="name"
            v-model="name"
          />
        </div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Username"
            name="Username"
            v-model="username"
          />
        </div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Statement of Faith"
            name="Statement of Faith"
            v-model="statementOfFaith"
          />
        </div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Description"
            name="Description"
            v-model="description"
          />
        </div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Vision"
            name="Vision"
            v-model="vision"
          />
        </div>
        <div
          class="gs-form-group"
          style="padding-top:0;display:flex;align-items:center;justify-content:center;"
        >
          <input type="checkbox" />
          <label style="font-size:.6rem;display:inline-block;margin:0 1rem;">
            I've read and accept the
            <span
              style="cursor:pointer;text-decoration:underline #55C0E4;color:#55C0E4;"
            >Terms and Conditions</span>
          </label>
        </div>
        <div id="enter-btn-wrapper">
          <button class="basic-button">Continue</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Church from "@/services/church";
export default {
  data() {
    return {
      name: "",
      username: "",
      statementOfFaith: "",
      description: "",
      vision: "",
      res: "",
      churchImageURL:
        "https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png",
      churchImageThumbnailURL:
        "https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png",
      churchInfo: {}
    };
  },
  methods: {
    createOrg() {
      this.churchInfo = {
        name: this.name,
        username: this.username,
        nickname: this.username,
        statementOfFaith: this.statementOfFaith,
        description: this.description,
        vision: this.vision,
        churchImageURL:
          "https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png",
        churchImageThumbnailURL:
          "https://togethercdn.global.ssl.fastly.net/assets/logo/logo-circle-small.png"
      };
      this.res = Church.postChurch(
        this.name,
        this.username,
        this.username,
        this.statementOfFaith,
        this.description,
        this.vision,
        this.churchImageURL,
        this.churchImageThumbnailURL
      );
      // .then(response => {
      //   console.log(response.message);
      //   if (
      //     window.confirm(
      //       "Church created!"
      //     )
      //   ) {
      //     this.$router.push("/app/people");
      //   }
      // }).catch(e => {
      //   console.log(e)
      // });
    }
  }
};
</script>

<style>
.basic-input {
  background: white;
  color: #b2b2b2;
  font-weight: 600;
  outline: none;
  width: 100%;
  padding: 0.45rem 0.7rem;
  font-size: 11px;
  line-height: 1.3;
  margin-bottom: 5px;
  resize: none;
  border-bottom: 2px #d4d4d4 solid;
  display: block;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}
.basic-input:focus {
  border-bottom: 3px solid #55c0e4;
}
.panel {
  margin-bottom: 10px;
  border-radius: 20px;
  padding: 25px;
  margin: 15px 12px;
  box-shadow: 0px 5px 13px -2px #00000040;
  max-width: 450px;
  min-width: 325px;
  min-height: 600px;
  background: white;
  /* ANIMATION */
  animation: 0.5s ease-out 0s 1 fadeIn;
}
.basic-button {
  padding: 4px 38px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #55c0e4;
  text-decoration: none;
  outline: none;
}
</style>