
resource "aws_launch_template" "my_launch_template" {
  name = var.launch_template_name

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 8
    }
  }

  key_name = var.key-name

  image_id = data.aws_ami.latest_amazon_linux.id

  instance_type =  var.instance_type

   vpc_security_group_ids =  [aws_security_group.ec2_sg.id ]

 


  user_data = base64encode(<<EOF
                      #!/bin/bash
                      yum update -y
                      yum install -y httpd
                      systemctl start httpd
                      systemctl enable httpd
                      EOF
                    )
}



resource "aws_autoscaling_group" "my_asg" {
  desired_capacity     = 2
  max_size             = 2
  min_size             = 2
  vpc_zone_identifier = aws_subnet.public_subnets[*].id

  launch_template {
    id      = aws_launch_template.my_launch_template.id
    version = "$Latest"
  }


  health_check_type          = "EC2"
  health_check_grace_period  = 300
  force_delete               = true
  wait_for_capacity_timeout = "0"
}
