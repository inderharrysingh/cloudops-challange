import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";


const client = new S3Client();


export const handler = async (event) => {

  console.log(event)

  const bucket = event["bucket"]
  const key = event["key"]

  console.log(bucket)
  console.log(key)

  if (!bucket || !key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Please Provide bucket and key with request" })
    }
  }

  let url = ""

  try {
    url = await createPresignedUrlWithClient(bucket, key)
    console.log(url)
  }

  catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error })
    }
  }



  const response = {
    body: JSON.stringify({ url: url }),
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    }

  };
  return response;
};



const createPresignedUrlWithClient = (bucket, key) => {

  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};




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


console.log(await main())














