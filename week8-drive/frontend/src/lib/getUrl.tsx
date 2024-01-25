
export async function getUrl( bucket : string , key : string ) : Promise<string>  {
    key = "lodu/"+ key  
const URL= "https://2s8pk7ih4a.execute-api.us-east-1.amazonaws.com/production/post-url"


    try {

                const response = await fetch(URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ bucket: bucket, key: key }),
                })
                
                const data = await response.json()
                const body = JSON.parse(data.body)
                return body.url  
    }
   
    catch (err) {
        if (err instanceof Error) {
            // Handle the error
            console.error(err.message);
        } else {
            // Handle other types of errors
            console.error("An unexpected error occurred.");
        }
    }

    return ""
    
}