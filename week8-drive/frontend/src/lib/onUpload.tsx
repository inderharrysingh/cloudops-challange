
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

      console.log(files[0])

      const dataFromLambda = callLambda(bucketName, `${userName}/${files[0].type}`)
      // Include properties from feeds in the query string of the signed URL

      const uploadURL = getPutURL(dataFromLambda)
      console.log("url")
      console.log(uploadURL)

      const url = "https://kinesis-project-01.s3.amazonaws.com/?key=userdata&AWSAccessKeyId=AKIAYBJ5WQ6V6NFF7POS&policy=eyJleHBpcmF0aW9uIjogIjIwMjQtMDEtMDVUMTc6MjI6MDdaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAia2luZXNpcy1wcm9qZWN0LTAxIn0sIHsia2V5IjogInVzZXJkYXRhIn1dfQ%3D%3D&signature=KuMfRopzt5DUDgcZZp97Shkoi1E%3D"
      const response = await fetch(url, requestOptions);
      
      console.log(response)
      if (!response.ok) {
        
        throw new Error(`Failed to upload file. Status: ${response.status}`);
      }
  
      console.log('File successfully uploaded to S3!');
    } catch (error) {
      console.error('Error uploading file to S3:', error);
    }
  }
  
  

  



