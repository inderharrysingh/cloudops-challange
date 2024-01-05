
output "vpc_id" {
  value = aws_vpc.my_vpc.id 
}

output "public_subnet_id" {
  value = aws_subnet.public_subnets[*].id
}


output "private_subnet_id" {
  value = aws_subnet.public_subnets[*].id
}



output "alb_id" {
  value = aws_lb.my_alb.arn
}




output "alb_security_gp_id" {
  value = aws_security_group.alb_sg.id 
}

