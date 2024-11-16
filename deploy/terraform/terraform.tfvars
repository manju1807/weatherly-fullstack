aws_region    = "us-east-1"
environment   = "production"
project_name  = "weatherly"
cluster_name  = "weatherly-eks"
vpc_cidr      = "10.0.0.0/16"

private_subnet_cidrs = [
  "10.0.1.0/24",
  "10.0.2.0/24",
  "10.0.3.0/24"
]

public_subnet_cidrs = [
  "10.0.4.0/24",
  "10.0.5.0/24",
  "10.0.6.0/24"
]