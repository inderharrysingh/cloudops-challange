import  boto3 

s3 = boto3.client("s3")


# partition , username/name-of-file
def get_post_url(bucket, partition):
    url = s3.generate_presigned_post(bucket, partition, Fields=None, Conditions=None, ExpiresIn=3600)
    return url


bucket = "kinesis-project-01"
partition = "userdata"

print(get_post_url(bucket=bucket, partition=partition))
