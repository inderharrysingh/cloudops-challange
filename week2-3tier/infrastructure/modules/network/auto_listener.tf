



resource "aws_autoscaling_attachment" "my_asg_attachment" {
  autoscaling_group_name = var.aws_autoscaling_group_name
  lb_target_group_arn =  aws_lb_target_group.my_target_group.arn
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
