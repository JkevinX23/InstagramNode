import { Storage } from '@google-cloud/storage';
import keys from '../keys';


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
}
export default new FirebaseAcess();
