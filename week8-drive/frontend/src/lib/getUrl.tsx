
export async function getUrl( bucket : string , key : string ) {

const URL= "https://2s8pk7ih4a.execute-api.us-east-1.amazonaws.com/production/get-url"


    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bucket: bucket, key: key }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data)
        return data.url ;

    } catch (error) {

        console.error(error);

        throw error;
    }

    
}