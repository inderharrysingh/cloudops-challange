variable "aws-region" {
  type = string
  default = "us-east-1"
}



variable "bucket_name" {
    type = string
    default = "cloudops-challange-static-site-hosting-x"
}


variable "index_document" {
    type = string
    default = "index.html"
}


variable "error_document" {
    type = string
    default = "error.html"
}


locals {
  s3_origin_id = "myS3Origin"
}
