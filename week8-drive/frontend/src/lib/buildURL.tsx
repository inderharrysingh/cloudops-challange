
export interface LambdaResponse {
    url: string;
    fields: {
        key: string;
        AWSAccessKeyId: string;
        policy: string;
        signature: string;
    };
}


export function getPutURL( labdaResponse : LambdaResponse ){
    const completeS3Url = `${labdaResponse.url}?${new URLSearchParams(labdaResponse.fields).toString()}`;
    return completeS3Url;

}
