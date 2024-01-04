
import { LambdaResponse } from "./buildURL"

const LAMBDA_URL=""

export async  function callLambda( bucket : string , partition : string ) : LambdaResponse {

    
    const data  = await fetch(LAMBDA_URL, ) 
    const extractredData : LambdaResponse = await data.json()

    return  extractredData; 
}