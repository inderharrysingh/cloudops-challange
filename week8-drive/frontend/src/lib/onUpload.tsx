
import { getPutURL  } from "./buildURL"
import { callLambda } from "./callLambda";



export async function uploadFileToS3( bucketName : string , userName : string  , files: File[]): Promise<void> {
    try {
      const requestOptions: RequestInit = {
        method: 'PUT',
        body: files[0], // Assuming you are uploading a single file, adjust accordingly if multiple files
        headers: {
          'Content-Type': files[0].type,
          // Add any other headers if needed
        },
      };

      const dataFromLambda = callLambda(bucketName, `${userName}/${files[0].type}`)
      // Include properties from feeds in the query string of the signed URL
      const uploadURL = getPutURL(dataFromLambda)
  
      const response = await fetch(uploadURL, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }
  
      console.log('File successfully uploaded to S3!');
    } catch (error) {
      console.error('Error uploading file to S3:', error);
    }
  }
  
  

  



