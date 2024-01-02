
resource "aws_lb_target_group" "my_target_group" {
  name        = var.target-group-name
  port        = 80
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id = aws_vpc.my_vpc.id

  health_check {
    path = "/"
  }
}



resource "aws_autoscaling_attachment" "my_asg_attachment" {
  autoscaling_group_name = aws_autoscaling_group.my_asg.name
  lb_target_group_arn =  aws_lb_target_group.my_target_group.arn
}



resource "aws_lb" "my_alb" {
  name               = "my-alb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [ aws_security_group.alb_sg.id  ]


  enable_deletion_protection = false  # Adjust as needed

  subnets = aws_subnet.public_subnets[*].id

  enable_http2 = true

  enable_cross_zone_load_balancing = true
}


resource "aws_lb_listener" "my_listener" {
  load_balancer_arn = aws_lb.my_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.my_target_group.arn
  }
}
