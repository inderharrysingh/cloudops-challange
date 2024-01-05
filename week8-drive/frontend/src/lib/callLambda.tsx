
import { LambdaResponse } from "./buildURL"

const LAMBDA_URL=""

export async  function callLambda( bucket : string , partition : string ) : LambdaResponse {

    
    // const data  = await fetch(LAMBDA_URL, ) 
    // const extractredData : LambdaResponse = await data.json()

    const data  = {'url': 'https://kinesis-project-01.s3.amazonaws.com/', 'fields': {'key': 'userdata', 'AWSAccessKeyId': 'AKIAYBJ5WQ6V6NFF7POS', 'policy': 'eyJleHBpcmF0aW9uIjogIjIwMjQtMDEtMDVUMTc6MjI6MDdaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAia2luZXNpcy1wcm9qZWN0LTAxIn0sIHsia2V5IjogInVzZXJkYXRhIn1dfQ==', 'signature': 'KuMfRopzt5DUDgcZZp97Shkoi1E='}}

    return  data
}