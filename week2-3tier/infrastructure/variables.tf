
variable "region" {
  type = string
  default = "us-east-1"
}


variable "vpc-cidr_block" {
  type = string
  default = "10.0.0.0/16"
}


data "aws_availability_zones" "available" {
  state = "available"
}



variable "instance_type" {
  type = string 
  default = "t2.micro"
}


variable "launch_template_name" {
  type = string 
  default = "my-template"
}

variable "key-name" {
    type = string
    default = "admin"
  
}


data "aws_ami" "latest_amazon_linux" {
  most_recent = true

  owners      = ["amazon"]
  filter {
    name = "name"
    values = ["al2023-ami-2023.3.20231218.0-kernel-6.1-x86_64"]
  }
}


variable "target-group-name" {
    type = string
    default = "my-tg"
  
}


variable "number-of-public-subnets" {
  type = number
  default = 2
}





variable "number-of-private-subnets" {
  type = number
  default = 2
}


variable "db_name" {
   type = string
   default = "myDB"
}


variable "db_engine" {
  type = string
  default = "mysql"
}


variable "engine_version" {
  type = string
  default = "5.7"
}


variable "instance_class" {
  type = string
  default = "db.t3.micro"
}


variable "db_user" {
  type = map(string)

  default = {
    "username" = "root"
    "password" = "password"
  }
}


