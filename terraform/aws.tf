terraform {
    backend "remote" {
        hostname = "app.terraform.io"
        organization = "Website"
        workspaces {
            prefix = "site-"
        }
    }
}

locals {
    domain    = "davidvargas.me"
    s3_origin = "S3-${replace(local.domain, ".", "-")}"
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_route53_zone" "zone" {
    name          = local.domain
    comment       = "Hosted Zone for my personal website"
    force_destroy = false
}

resource "aws_iam_user" "davidvargas" {
  name = "davidvargas"
}

resource "aws_iam_user_policy_attachment" "s3" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_user_policy_attachment" "acm" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/AWSCertificateManagerFullAccess"
}

resource "aws_iam_user_policy_attachment" "cloudfront" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/CloudFrontFullAccess"
}

resource "aws_iam_user_policy_attachment" "route53" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonRoute53FullAccess"
}

resource "aws_iam_user_policy_attachment" "iam" {
  user       = aws_iam_user.davidvargas.name
  policy_arn = "arn:aws:iam::aws:policy/IAMFullAccess"
}