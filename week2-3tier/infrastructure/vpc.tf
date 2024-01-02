# Create VPC
resource "aws_vpc" "my_vpc" {
  cidr_block =  var.vpc-cidr_block
  enable_dns_support = true
  enable_dns_hostnames = true
}




resource "aws_subnet" "public_subnets" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.${ count.index  + 1}.0/24"                       
  availability_zone       = data.aws_availability_zones.available.names[ (count.index) %  length(data.aws_availability_zones.available.names)]
  map_public_ip_on_launch = true

  count = var.number-of-public-subnets
}



# Create private subnets
resource "aws_subnet" "private_subnets" {
  vpc_id     = aws_vpc.my_vpc.id
  cidr_block = "10.0.${ count.index + var.number-of-public-subnets + 1 }.0/24"
  availability_zone       = data.aws_availability_zones.available.names[ (count.index + 2 ) %  length(data.aws_availability_zones.available.names)]


  count = var.number-of-private-subnets
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

  count = 2
}



# Create Security Group for ALB
resource "aws_security_group" "alb_sg" {
  name        = "alb-security-group"
  description = "Security group for ALB"
  vpc_id = aws_vpc.my_vpc.id 

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

}

resource "aws_security_group" "ec2_sg" {
  name        = "ec2-security-group"
  description = "Security group for EC2 instances"
  vpc_id = aws_vpc.my_vpc.id 


  ingress {
    from_port          = 0
    to_port            = 0
    protocol           = "-1"
    security_groups = ["${ aws_security_group.alb_sg.id }"]
    
  }

    ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
