# Create VPC
resource "aws_vpc" "my_vpc" {
  cidr_block =  "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}




# public subnets
resource "aws_subnet" "public_subnets" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.${ count.index  + 1}.0/24"                       
  availability_zone       = data.aws_availability_zones.available.names[ (count.index) %  length(data.aws_availability_zones.available.names)]
  map_public_ip_on_launch = true

  count = var.number_of_public_subnets
}



# Create private subnets
resource "aws_subnet" "private_subnets" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.${ count.index + var.number_of_public_subnets + 1 }.0/24"
  availability_zone       = data.aws_availability_zones.available.names[ (count.index + 2 ) %  length(data.aws_availability_zones.available.names)]

  count = var.number_of_private_subnets

  tags = {
    "az" = data.aws_availability_zones.available.names[ (count.index + 2 ) %  length(data.aws_availability_zones.available.names)]
  }
}






# Create internet gateway
resource "aws_internet_gateway" "my_igw" {
  vpc_id = aws_vpc.my_vpc.id
}




# Create route table for public subnets
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.my_vpc.id
}



# Create route for public subnets to the internet
resource "aws_route" "public_route_table" {
  route_table_id         = aws_route_table.public_route_table.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.my_igw.id

}



# Associate public subnets with the public route table
resource "aws_route_table_association" "public-subnet-assocation" {
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_route_table.id

  count = var.number_of_public_subnets
}





resource "aws_lb_target_group" "my_target_group" {
  name        = var.vpc_target_group_name
  port        = 80
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id = aws_vpc.my_vpc.id

  health_check {
    path = "/"
  }
}





