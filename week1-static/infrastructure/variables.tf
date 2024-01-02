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



variable "alias-cloudfront" {
  type = list(string)
  default = [ "week1.inderjot.tech" ]
}



variable "certificate-acm_certificate_arn" {
    type = string 
    default = "arn:aws:acm:us-east-1:552569571243:certificate/d3bedd40-b57b-4a52-97d0-920cf2467620"
}