terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

provider "aws" {
  region = var.region
}


module "vpc_network" {
  
  source = "./modules/network"

  alb_name = var.alb_name

  vpc_target_group_name = var.target_group_name

  aws_autoscaling_group_name = module.autoscaling_template.autoscaling_group_name

}



module "autoscaling_template" {
  
  source = "./modules/autoscaling"

  template_name = var.launch_template_name

  ec2_key_name = var.key_name

  ec2_instance_type = var.instance_type


  aws_vpc_id = module.vpc_network.vpc_id


  autoscaling_min_desire_max = {
    min = 2
    desire = 2
    max = 2
  }


  public_subnets_id =  module.vpc_network.public_subnet_id

  alb_security_gp_id = module.vpc_network.alb_security_gp_id

  
}


module "db" {
  
  source = "./modules/db"

  db_name =  var.db_name 

  db_username = var.db_user.username

  db_password = var.db_user.password 

  aws_private_subnet_id = module.vpc_network.private_subnet_id

  db_instance_class = var.db_instance_class

  engine_version = var.engine_version

  db_engine = var.db_engine


}
