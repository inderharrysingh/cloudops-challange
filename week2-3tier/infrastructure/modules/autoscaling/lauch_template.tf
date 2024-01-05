

resource "aws_launch_template" "my_launch_template" {
  name = var.template_name

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 8
    }
  }

 

  key_name = var.ec2_key_name

  image_id = data.aws_ami.latest_amazon_linux.id

  instance_type =  var.ec2_instance_type

  vpc_security_group_ids =  [aws_security_group.ec2_sg.id ] 

  user_data = base64encode(file("${path.module}/userdata.sh"))
}



resource "aws_autoscaling_group" "my_asg" {
  desired_capacity     = var.autoscaling_min_desire_max.desire
  max_size             = var.autoscaling_min_desire_max.max
  min_size             = var.autoscaling_min_desire_max.min
  vpc_zone_identifier =  var.public_subnets_id

  launch_template {
    id      = aws_launch_template.my_launch_template.id
    version = "$Latest"
  }


  health_check_type          = "EC2"
  health_check_grace_period  = 300
  force_delete               = true
  wait_for_capacity_timeout = "0"
}






resource "aws_security_group" "ec2_sg" {
  name        = "ec2-security-group"
  description = "Security group for EC2 instances"
  vpc_id =  var.aws_vpc_id 


  ingress {
    from_port          = 0
    to_port            = 0
    protocol           = "-1"
    security_groups = ["${ var.alb_security_gp_id }"]
    
  }

    ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }



}
