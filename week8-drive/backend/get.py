import  boto3 

s3 = boto3.client("s3")


# partition , username/name-of-file
def get_url(bucket, key, ClientMethod="get_object", ExpiresIn=3600):
      
      url = s3.generate_presigned_url(ClientMethod, Params={'Bucket': bucket, 'Key': key },  ExpiresIn=ExpiresIn)
      return url


bucket = "kinesis-project-01"
key = "userdata"

print(get_url(bucket=bucket, key=key))