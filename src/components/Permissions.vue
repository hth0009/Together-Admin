<template>
  <div class="permissions-container">        
      <div id="top-buttons" class="gs-top-buttons">
        <button class="gs-basic-button" @click="startEdit" v-show="!editing">
          <i class="material-icons">edit</i>EDIT
        </button>
        <button class="gs-basic-button red" @click="cancelEdit" v-show="editing">
          <i class="material-icons">close</i>CANCEL
        </button>
        <button class="gs-basic-button" @click="saveEdit" v-show="editing">
          <i class="material-icons">done</i>SAVE
        </button>
      </div>
      <card
        :item="personInfo"
        :fields="fields"
        :cardSelectable="false"
        :profilePicFillerValue="'fullName'"
      />      
      <form id="selectedPerson-form">
        <div class="gs-form-group">
          <label>Role</label>
          <input
            type="text"
            class="gs-basic-input"
            :readonly="!editing"
            placeholder="Role"
          />
        </div>        
        <div class="gs-form-group">     
          <div class="checkboxes">
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.isAdministrator"
              :disabled="!editing"
            >
              Administrator
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.isSuperAdmin"
              :disabled="!editing"
            >
              Super Administrator
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canViewFinancials"
              :disabled="!editing"
            >
              Can View Financials
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canEditFinancials"
              :disabled="!editing"
            >
              Can Edit Financials
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canEditAllTeams"
              :disabled="!editing"
            >
              Can Edit Teams
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canEditAllEvents"
              :disabled="!editing"
            >
              Can Edit Events
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canRemovePeople"
              :disabled="!editing"
            >
              Can Remove People
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canAddAdministrators"
              :disabled="!editing"
            >
              Can Add Administrators
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canRemoveAdministrators"
              :disabled="!editing"
            >
              Can Remove Administrators
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canEditPermissions"
              :disabled="!editing"
            >
              Can Edit Permissions
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canViewPermissions"
              :disabled="!editing"
            >
              Can View Permissions
            </p-check>
            <p-check class="p-default p-round p-smooth" color="primary"
              v-model="churchAccount.canSetPermissions"
              :disabled="!editing"
            >
              Can Set Permissions
            </p-check>
          </div>
        </div>
      </form>
  </div>
</template>

<script>
import Card from '@/components/Card'
import permissions from "@/services/permissions"

export default {
  name: '',
  data () {
    return {
      fields: {
        id: 'id',
        title: 'fullName',
        profile: 'personImageURL'
      },
      churchAccount: {
      },
      personInfo: null,
      editing: false
    }
  },
  components: {
    Card
  },
  methods: {
    async getPermissions(accountID) {
      let response = await permissions.getAccountsChurch(accountID)
      if (response.status != 200) {
        return
      }
      this.churchAccount = response.data.accountschurches[0]
      this.personInfo = this.churchAccount.account.mainPerson
      this.personInfo['fullName'] = this.personInfo.firstName + ' ' + this.personInfo.lastName
      this.personInfo = {...this.personInfo}
    },
    
    async saveEdit() {      
      this.editing = false 

      const values = {...this.churchAccount}
      let permissionValues = {}
      Object.keys(values).map(function(key) {
        if (typeof values[key] != "boolean") {
          return
        }
        permissionValues[key] = values[key];
      });
      let response = await permissions.patchAccountChurch(this.accountID, permissionValues)
      console.log(response)
      // People.patchPerson(patch).then(() => {
      //   this.getPerson()
      // })
    },
    cancelEdit() {
      this.editing = false;
    },
    startEdit() {
      this.editing = true;
    },   
  },
  props: {
    selectedAccountID: {
      type: Number,
      default: -1
    },
  },
  mounted() {
    this.getPermissions(this.selectedAccountID)
  },
  computed: {
  },
  watch: {
    selectedAccountID: {
      handler(n) {
        this.getPermissions(n)
      }
    }
  }
}
</script>

<style scoped>

#top-buttons {
  display: flex;
  justify-content: flex-end;
}

.checkboxes{
  margin: .5rem 0px;
  display: flex;
  flex-direction: column;
}
.checkboxes > *{
  margin: .5rem 0px;
}
.checkboxes >>> .p-primary label::before,
.checkboxes >>> .p-primary label::after{
  margin-top: 2.5px;
}
.checkboxes >>> .p-primary label::before,
.checkboxes >>> .p-primary label::after{
  margin-top: 2.5px;
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