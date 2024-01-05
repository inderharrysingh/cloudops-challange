
import { getUrl  } from "./buildURL"


export async function uploadFileToS3( files: File[]): Promise<void> {



const BUCKET = "kinesis-project-01";


      const promised_urls = files.map( ( file )  => getUrl( BUCKET , file.name) )
      const urls =  await  Promise.all(promised_urls)


      urls.forEach( async ( url : string  ) => {
                try 
                {
                      console.log(url)
                      const response = await put(url, files )
                      console.log(response)

                if (!response.ok) {
                  
                  throw new Error(`Failed to upload file. Status: ${response.status}`);
                }
            
                  console.log('File successfully uploaded to S3!');
              } catch (error) {
                console.error('Error uploading file to S3:', error);
          
              }

      })

      

            
         


  }
  

  // if don't work try as a blog 
  
function put(url : string , file : File[]) : Promise<any> {
  return new Promise((resolve, reject) => {
    
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  file[0].type
      },
      body: file[0],
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


  



