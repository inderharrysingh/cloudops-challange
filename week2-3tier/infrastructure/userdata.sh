#!/bin/bash
yum update -y
yum install -y httpd php 
systemctl start httpd
systemctl enable httpd