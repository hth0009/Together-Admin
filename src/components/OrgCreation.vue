<template>
  <div id="org-creation-wrapper" style="text-align:center;">
    <label style="display:block;font-size:1rem;margin-bottom:0;color:#004580;">ORGANIZATION CREATION</label>
    <form v-on:submit.prevent="createOrg" style="margin:auto;">
      <div>
        <div class="gs-form-group">
          <input
            type="text"
            class="basic-input"
            placeholder="Organization Name"
            name="Organization Name"
          />
        </div>
        <div class="gs-form-group">
          <input type="text" class="basic-input" placeholder="City" name="City" />
        </div>
        <div class="gs-form-group">
          <input type="text" class="basic-input" placeholder="State" name="State" />
        </div>
        <div class="gs-form-group">
          <input type="text" class="basic-input" placeholder="501C3 Number" name="501C3 Number" />
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
export default {
  methods: {
    createOrg() {
      this.$router.push('/app/people');
    }
  }
}
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
  /* min-height: 600px; */
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