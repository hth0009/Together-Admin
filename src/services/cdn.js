import Api from './api'
import AWS from 'aws-sdk';

export default {
  getKeys () {
    return Api().get('cdnkey')
  },
  async postImage(accessKey, secretKey, photoFile, fileSufix, fileName) {
    AWS.config.update({
      endpoint: "https://s3.wasabisys.com",
      // region: "us-east-2",
      credentials: new AWS.Credentials(accessKey, secretKey)
   })
   
   
   var s3 = new AWS.S3()
   var params = {
      Body: photoFile,
      Bucket: "cdn.togetheradmin.com",
      Key: fileSufix + fileName,
      ContentType: "image/jpeg",
   }
   console.log(params)
   return s3.upload(params, function(err, data){
     if (err) {
       throw err
     }
   })
  }
}