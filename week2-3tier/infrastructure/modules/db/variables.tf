
variable "db_name" {
    type = string
}

variable "db_engine" {
  type = string
}


variable "engine_version" {
  type = string
}

variable "db_instance_class" {
  type = string
}

variable "aws_private_subnet_id" {
  type = list(string)
}


variable "db_username" {
  type = string 
}

variable "db_password" {
  type = string 
}

