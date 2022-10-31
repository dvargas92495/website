terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "VargasArts"
    workspaces {
      prefix = "web"
    }
  }
  required_providers {
    github = {
      source = "integrations/github"
      version = "4.2.0"
    }
    aws = {
      source = "hashicorp/aws"
      version = "3.74.2"
    }
  }
}

variable "github_token" {
  type = string
}

variable "rds_password" {
  type = string
}

variable "terraform_cloud_token" {
  type = string
}

variable "stripe_public" {
  type = string
}

variable "stripe_secret" {
  type = string
}

variable "stripe_webhook_secret" {
  type = string
}

variable "npm_token" {
  type = string
}

provider "aws" {
    region = "us-east-1"
}

provider "github" {
  organization = "vargasarts"
  token = var.github_token
}

locals {
    domain    = "davidvargas.me"
}

resource "aws_route53_zone" "zone" {
    name          = local.domain
    comment       = "Hosted Zone for my personal website"
    force_destroy = false
}

resource "aws_iam_group" "static_site_managers" {
  name = "static-site-managers"
}

resource "aws_iam_group_policy_attachment" "s3" {
  group      = aws_iam_group.static_site_managers.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_group_policy_attachment" "acm" {
  group      = aws_iam_group.static_site_managers.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCertificateManagerFullAccess"
}

resource "aws_iam_group_policy_attachment" "cloudfront" {
  group      = aws_iam_group.static_site_managers.name
  policy_arn = "arn:aws:iam::aws:policy/CloudFrontFullAccess"
}

resource "aws_iam_group_policy_attachment" "route53" {
  group      = aws_iam_group.static_site_managers.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRoute53FullAccess"
}

resource "aws_iam_group_policy_attachment" "iam" {
  group      = aws_iam_group.static_site_managers.name
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
}

resource "aws_iam_user" "davidvargas" {
  name = "davidvargas"
}

resource "aws_iam_user_policy_attachment" "route53" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRoute53FullAccess"
}

resource "aws_iam_user_policy_attachment" "iam" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
}

resource "aws_iam_user_policy_attachment" "dynamo" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_user_policy_attachment" "cloudfront" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/CloudFrontFullAccess"
}

resource "aws_iam_user" "roam_js_extensions" {
  name = "roam_js_extensions"
}

resource "aws_iam_user_group_membership" "static_roam" {
  user = aws_iam_user.roam_js_extensions.name

  groups = [
    aws_iam_group.static_site_managers.name,
  ]
}

resource "aws_iam_user_policy_attachment" "apigateway_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator"
}

resource "aws_iam_user_policy_attachment" "lambda_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambda_FullAccess"
}

resource "aws_iam_user_policy_attachment" "ses_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSESFullAccess"
}

resource "aws_iam_user_policy_attachment" "dynamo_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_user_policy_attachment" "cloudformation_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess"
}

resource "aws_iam_user_policy_attachment" "sns_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSNSFullAccess"
}

resource "aws_iam_user_policy_attachment" "cwe_roam" {
  user       = aws_iam_user.roam_js_extensions.name
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchEventsFullAccess"
}

resource "aws_iam_user" "wings" {
  name = "wings"
}

resource "aws_iam_user_group_membership" "static_wings" {
  user = aws_iam_user.wings.name

  groups = [
    aws_iam_group.static_site_managers.name,
  ]
}

resource "aws_iam_user_policy_attachment" "ec2_wings" {
  user       = aws_iam_user.wings.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}

resource "aws_iam_user_policy_attachment" "rds_wings" {
  user       = aws_iam_user.wings.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRDSFullAccess"
}

resource "aws_iam_user" "garden" {
  name = "garden"
}

resource "aws_iam_user_group_membership" "static_garden" {
  user = aws_iam_user.garden.name

  groups = [
    aws_iam_group.static_site_managers.name,
  ]
}

resource "aws_db_parameter_group" "default" {
  name   = "vargas-arts"
  family = "mysql5.7"

  parameter {
    name         = "lower_case_table_names"
    value        = "1"
    apply_method = "pending-reboot"
  }

  parameter {
    name         = "gtid_mode"
    value        = "ON"
    apply_method = "immediate"
  }
}

resource "aws_db_instance" "default" {
  allocated_storage            = 20
  max_allocated_storage        = 1000
  storage_type                 = "gp2"
  engine                       = "mysql"
  engine_version               = "5.7"
  identifier                   = "vargas-arts"
  instance_class               = "db.t3.micro"
  username                     = "dvargas92495"
  password                     = var.rds_password
  parameter_group_name         = aws_db_parameter_group.default.id
  port                         = 5432
  publicly_accessible          = true
  skip_final_snapshot          = true
  storage_encrypted            = true
  deletion_protection          = true
  tags                         = {
    Application = "Root"
  }
}

module "aws_email" {
  source  = "dvargas92495/email/aws"
  version = "2.0.15"

  domain = local.domain
  zone_id = aws_route53_zone.zone.zone_id
  forward_to = "dvargas92495@gmail.com"
  email_identity = "hello"
}

resource "aws_cloudfront_cache_policy" "cache_policy" {
  name        = "remix-cache-policy"
  comment     = "Caching based on query parameters"
  default_ttl = 1
  max_ttl     = 31536000
  min_ttl     = 1
  parameters_in_cache_key_and_forwarded_to_origin {
    cookies_config {
      cookie_behavior = "none"
    }
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "all"
    }
  }
}

resource "github_actions_organization_secret" "terraform_cloud_token_secret" {
  secret_name = "TERRAFORM_CLOUD_TOKEN"
  visibility  = "all"
  plaintext_value = var.terraform_cloud_token 
}

resource "github_actions_organization_secret" "stripe_public_secret" {
  secret_name = "STRIPE_PUBLIC_KEY"
  visibility  = "all"
  plaintext_value = var.stripe_public  
}

resource "github_actions_organization_secret" "stripe_secret_secret" {
  secret_name = "STRIPE_SECRET_KEY"
  visibility  = "all"
  plaintext_value = var.stripe_secret   
}

resource "github_actions_organization_secret" "stripe_webhook_secret_secret" {
  secret_name = "STRIPE_WEBHOOK_SECRET"
  visibility  = "all"
  plaintext_value = var.stripe_webhook_secret  
}

resource "github_actions_organization_secret" "github_token_secret" {
  secret_name = "TERRAFORM_GITHUB_TOKEN"
  visibility  = "all"
  plaintext_value = var.github_token  
}

resource "github_actions_organization_secret" "npm_token_secret" {
  secret_name = "NPM_TOKEN"
  visibility  = "all"
  plaintext_value = var.npm_token  
}
