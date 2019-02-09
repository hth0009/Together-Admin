<template> 
  <div class="file-uploader-container">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
          accept="image/*" class="input-file">
          <p v-if="isInitial">
            +
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>
    <!-- <div v-if="isSuccess">
      <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {

    name: 'FileUploader',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos',
        fileCount: ''
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        // this.upload(formData)
        //   .then(x => {
        //     this.uploadedFiles = [].concat(x);
        //     this.currentStatus = STATUS_SUCCESS;
        //   })
        //   .catch(err => {
        //     this.uploadError = err.response;
        //     this.currentStatus = STATUS_FAILED;
        //   });

        //FAKE
        window.setTimeout(function() {
          this.currentStatus = STATUS_INITIAL
          this.uploadedFiles.push({name: 'hi', id: Math.random()})
        }.bind(this), 300)
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
          });

        // save it
        this.save(formData);
      },
      upload(formData) {   
        return Promise()     
        // const url = `${BASE_URL}/photos/upload`;
        // return axios.post(url, formData)
        //     // get data
        //     .then(x => x.data)
        //     // add url field
        //     .then(x => x.map(img => Object.assign({},
        //         img, { url: `${BASE_URL}/images/${img.id}` })));
      }
    },
    mounted() {
      this.reset();
    },
    watch: {
      uploadedFiles: {
        handler: function (n, o) {
          this.$emit('files', n)
        }
      }
    }
  }
</script>

<style scoped>
  .file-uploader-container {
    height: 100%;
  }
  .file-uploader-container form{
    height: 100%;
  }
  .dropbox {
    height: 100%;
    color: dimgray;
    /* padding: 10px 10px; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: all .3s ease;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: #A0A3A6; /* when mouse over to the drop zone, change color */
  }
  .dropbox:hover p{
    color: #fafafa; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 40px;
    text-align: center;
    padding: 20px 0;
    /* height: 100%; */
    transition: all .3s ease;
    vertical-align: middle;
  }
</style>