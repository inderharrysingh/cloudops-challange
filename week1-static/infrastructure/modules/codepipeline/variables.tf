variable "region" {
  default = "us-east-1"
  type = string 
}



variable "codebuild-project-name" {
  type = string
  default = "myProject-codebuild"
}


variable "github-repo" {
  type = string
  default = "inderjotx/cloudops-challange"
}



variable "codepipeline-name" {
  type = string
  default = "my-pipeline-static"
}


variable "bucket-for-static-site-hosting" {
  type = string
}


variable "bucket-for-static-site-hosting-arn" {
  type = string
}