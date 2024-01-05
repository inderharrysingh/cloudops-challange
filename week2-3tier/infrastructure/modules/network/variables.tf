
variable "number_of_public_subnets" {
    type = number
    default = 2
}


variable "number_of_private_subnets" {
  type = number
  default = 2
}



variable "alb_name" {
  type = string

}



variable "vpc_target_group_name" {
  type = string
}


variable "aws_autoscaling_group_name" {
  type = string 
}



data "aws_availability_zones" "available" {
  state = "available"
}


locals {
  all_private_subnets_id  = aws_subnet.public_subnets[*].id 
  private_subnet_az = toset( aws_subnet.private_subnets[*].availability_zone )
  public_subnet_az = toset( aws_subnet.public_subnets[*].availability_zone )
}


