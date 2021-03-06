terraform {
    backend "remote" {
        hostname = "app.terraform.io"
        organization = "VargasArts"
        workspaces {
            prefix = "web"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

locals {
    domain    = "davidvargas.me"
}

resource "aws_route53_zone" "zone" {
    name          = local.domain
    comment       = "Hosted Zone for my personal website"
    force_destroy = false
}

resource "aws_route53_record" "website" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = local.domain
  type    = "A"
  records = ["104.198.14.52"]
  ttl     = 300
}

resource "aws_route53_record" "www" {
  name    = "www.${local.domain}"
  type    = "CNAME"
  zone_id = aws_route53_zone.zone.id
  records = ["davidvargas.netlify.app."]
  ttl     = 300
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
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaFullAccess"
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

resource "aws_iam_user" "floss" {
  name = "floss"
}

resource "aws_iam_user_group_membership" "static_floss" {
  user = aws_iam_user.floss.name

  groups = [
    aws_iam_group.static_site_managers.name,
  ]
}

resource "aws_iam_user_policy_attachment" "apigateway_floss" {
  user       = aws_iam_user.floss.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonAPIGatewayAdministrator"
}

resource "aws_iam_user_policy_attachment" "lambda_floss" {
  user       = aws_iam_user.floss.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaFullAccess"
}

resource "aws_iam_user_policy_attachment" "dynamo_floss" {
  user       = aws_iam_user.floss.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_user_policy_attachment" "ses_floss" {
  user       = aws_iam_user.floss.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSESFullAccess"
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
