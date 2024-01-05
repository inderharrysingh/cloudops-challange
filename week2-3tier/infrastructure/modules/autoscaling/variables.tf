
variable "template_name" {
  type = string
}


variable "ec2_key_name" {
  type = string
}



variable "ec2_instance_type" {
  type = string
  
}


variable "autoscaling_min_desire_max" {
  type = map(number)
}


data "aws_ami" "latest_amazon_linux" {
  most_recent = true

  owners      = ["amazon"]
  filter {
    name = "name"
    values = ["al2023-ami-2023.3.20231218.0-kernel-6.1-x86_64"]
  }
}


variable "public_subnets_id" {
  type = list(string)
}


variable "alb_security_gp_id" {
  type = string
}


variable "aws_vpc_id" {
  type = string 
}