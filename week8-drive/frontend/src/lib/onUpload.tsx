
import { getUrl  } from "./getUrl"


export async function uploadFileToS3( files: File[]): Promise<number> {

const BUCKET = "kinesis-project-01";


      const promised_urls = files.map( ( file )  => getUrl( BUCKET , file.name) )
      const urls = await Promise.all(promised_urls) 

      const putRequests = urls.map( (url : string , index : number ) => put(url, files[index]) )
      
      try {
        
         await Promise.all(putRequests)
        return 0
      }

      catch {
        return 1
      }
      
  
}



function put(url : string , file : File) : Promise<any> {
  return new Promise((resolve, reject) => {
    
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  file.type
      },
      body: file,
    })
      .then((res) => res.text())
      .then((responseBody) => {
        resolve(responseBody);
      })
      .catch((err) => {
        reject(err);
      });
  });
}


  



