import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import  { writeFile } from "fs"

const client = new S3Client({});

const bucket_name= "encoding-webapplication"
const key_name = "print-console.js"
const filePath = "new-file.js" 

const writedata = async ( fileName , data ) => {

    writeFile( fileName , data , (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return err
        } else {
          console.log('Data has been written to the file successfully.');
          return "done succesfull"
        }}
    )


} 



export const main = async () => {
  const command = new GetObjectCommand({
    Bucket: bucket_name,
    Key: key_name,
  });

  try {
    const response = await client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();
    console.log(str);

    // eval(str)
    // const isWritten = await writedata(filePath, str ) 

    // console.log(isWritten)

    // panda()

  } catch (err) {
    console.error(err);
  }
};

await main()



