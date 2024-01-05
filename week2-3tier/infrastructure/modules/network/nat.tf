

# resides in the public subnet, 
resource "aws_nat_gateway" "myNat" {
  allocation_id = aws_eip.public_id_nat[count.index].allocation_id
  subnet_id     = aws_subnet.public_subnets[count.index].id 

  tags = {
    Name = "gw NAT"
  }

 
  
  count = length(aws_subnet.public_subnets)
  
  depends_on = [aws_internet_gateway.my_igw]
}



resource "aws_eip" "public_id_nat" {

    count = length(aws_subnet.public_subnets)
}


resource "aws_route_table" "private_route_table" {
    vpc_id = aws_vpc.my_vpc.id 
    count = length( aws_nat_gateway.myNat)
}



resource "aws_route" "private_routes" {
  route_table_id         = aws_route_table.private_route_table[count.index].id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_nat_gateway.myNat[ count.index ].id 

  count = length(aws_nat_gateway.myNat)

}



resource "aws_route_table_association" "private_nat_association" {
  route_table_id = aws_route_table.private_route_table[ count.index].id
  subnet_id = aws_subnet.private_subnets[ count.index ].id 

  count = length( aws_route_table.private_route_table )
}