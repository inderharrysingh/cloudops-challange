terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}



provider "aws"{
    region = var.aws-region
}

resource "aws_s3_bucket" "static_site_bucket" {
  bucket = var.bucket_name  
}



resource "aws_s3_bucket_website_configuration" "aws_static_web_config" {
  bucket = aws_s3_bucket.static_site_bucket.id 

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }

}



data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_site_bucket.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.my_oci_identity.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "example" {
  bucket = aws_s3_bucket.static_site_bucket.id 
  policy = data.aws_iam_policy_document.s3_policy.json
}