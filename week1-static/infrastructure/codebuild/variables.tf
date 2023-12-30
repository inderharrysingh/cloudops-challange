
variable "codebuild-bucket" {
    type = string
    default = "aws-codebuild-artifact-bucket"
}


variable "github-repo-url" {
  type = string
  default = "https://github.com/inderharrysingh/cloudops-challange.git"
}