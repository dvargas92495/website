terraform {
  backend "remote" {
    hostname = "app.terraform.io"
    organization = "VargasArts"
    workspaces {
      prefix = "web"
    }
  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "3.74.2"
    }
  }
}

provider "aws" {
    region = "us-east-1"
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

