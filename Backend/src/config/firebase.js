import keys from '../keys'

const keyFilename = keys.keyFilename();
const projectId = keys.projectId();
const bucketName = keys.bucketName();

import { Storage} from '@google-cloud/storage';
const storage = new Storage(
    {
      projectId, 
      keyFilename
    });

class FirebaseAcess {
  async uploadFile(path) 
    {
      await storage.bucket(bucketName).upload(path, 
        function(err, file, apiResponse) 
        {
          if(err)
            { 
              console.log({ error: err});
              return; 
            };

          console.log({apiResponse});
          return;
        
        });
    }
  }
export default new FirebaseAcess();


