import { Storage } from '@google-cloud/storage';
import keys from '../keys';
import { resolve } from 'path';


const keyFilename = keys.keyFilename();
const projectId = keys.projectId();
const bucketName = keys.bucketName();
const storage = new Storage(
  {
    projectId,
    keyFilename,
  },
);

class FirebaseAcess {
  async uploadFile(path) {
    await storage.bucket(bucketName).upload(path,
      (err, file, apiResponse) => {
        if (err) {
          console.log({ error: err });
          return;
        }
        console.log({ apiResponse });
      });
  }
  /*async getFile(path){
    const options  = { 
      destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    };

    await storage
      .bucket(bucketName)
      .file(path)
      .get()
      .then(function(data) {
        const file = data[0];
        return console.log({apiresponse: data[1]})
      });
    
    return {status: "ok" };
  
  }*/
}
export default new FirebaseAcess();
