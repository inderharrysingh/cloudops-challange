resource "aws_s3_bucket" "myBucket" {
  bucket = "codebuild-artifact-bucket"
}



resource "aws_codebuild_project" "codebuild-project" {
  name          = var.codebuild-project-name
  description   = "test_codebuild_project"
  build_timeout = 5
  service_role  = aws_iam_role.example.arn

  artifacts {
    type = "S3"
    location = aws_s3_bucket.myBucket.bucket
  }


  

  
  
  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:5.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
  }

  
  logs_config {
    cloudwatch_logs {
      status = "ENABLED"
      group_name  = "codebuild/${var.codebuild-project-name}"
      stream_name = "log-stream"
    }

  }

  source {
    type            = "GITHUB"
    location        = "https://github.com/inderharrysingh/cloudops-challange.git"
    git_clone_depth = 1

    buildspec = "week1-static/buildspec.yml"
    git_submodules_config {
      fetch_submodules = true
    }
  }

  source_version = "main"


  tags = {
    Environment = "Test"
  }
}



