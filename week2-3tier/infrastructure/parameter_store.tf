resource "aws_ssm_parameter" "password" {
  name        = "/production/database/password"
  description = "The parameter description"
  type        = "SecureString"
  value       =  var.db_user.password
  tags = {
    environment = "production"
  }
}




resource "aws_ssm_parameter" "username" {
  name        = "/production/database/username"
  description = "The parameter description"
  type        = "SecureString"
  value       =  var.db_user.username
  tags = {
    environment = "production"
  }
}



resource "aws_ssm_parameter" "connection_string" {
  name        = "/production/database/connection_string"
  description = "The parameter description"
  type        = "SecureString"
  value       =  aws_db_instance.my-db.endpoint
  tags = {
    environment = "production"
  }
}