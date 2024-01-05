
variable "region" {
  type = string
  default = "us-east-1"
}





variable "instance_type" {
  type = string 
  default = "t2.micro"
}


variable "launch_template_name" {
  type = string 
  default = "my-template"
}

variable "key_name" {
    type = string
    default = "admin"
  
}




variable "target_group_name" {
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


variable "db_instance_class" {
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



variable "alb_name" {
  
  default = "my-alb"
}


