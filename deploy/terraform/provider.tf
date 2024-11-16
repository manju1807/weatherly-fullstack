terraform {
  required_version = ">= 1.0.0"
 
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
  }
 
  backend "s3" {
    bucket         = "weatherly-terraform-state-2024"
    key            = "eks/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "weatherly-terraform-lock"
  }
}

provider "aws" {
  region = var.aws_region
 
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "terraform"
      Owner       = "weatherly-admin"
      Account     = "471112656237"
    }
  }
}
