import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import fetch  from 'node-fetch'


const REGION = "us-east-1";
const BUCKET = "kinesis-project-01";
const KEY = "userdata"


const createPresignedUrlWithClient = ({ region, bucket, key }) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

function put(url, data) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PUT',
      body: data,
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






export const main = async () => {

  // try {

    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });


    console.log("Calling PUT using presigned URL with client")

    console.log(clientUrl)
    return clientUrl
    
  //   await put(clientUrl, "sex dedo");

  //   console.log("\nDone. Check your S3 console.");
  // } catch (err) {
  //   console.error(err);
  // }
}


console.log( await main() )














