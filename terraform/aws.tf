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

resource "aws_acm_certificate" "cert" {
  domain_name       = local.domain
  validation_method = "DNS"

  tags = {
    Application = "Website"
  }

  lifecycle {
    create_before_destroy = true
  }

  subject_alternative_names = [
    "www.${local.domain}"
  ]
}

resource "aws_route53_record" "cert_validation" {
  name    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id = aws_route53_zone.zone.id
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}

resource "aws_route53_record" "www_cert_validation" {
  name    = aws_acm_certificate.cert.domain_validation_options.1.resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options.1.resource_record_type
  zone_id = aws_route53_zone.zone.id
  records = [aws_acm_certificate.cert.domain_validation_options.1.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [
    "${aws_route53_record.cert_validation.fqdn}",
    "${aws_route53_record.www_cert_validation.fqdn}"
  ]
}

resource "aws_route53_record" "A" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = local.domain
  type    = "A"
  records = ["compassionate-visvesvaraya-9e2bd6.netlify.app."]
}

resource "aws_route53_record" "AAAA" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = local.domain
  type    = "AAAA"
  records = ["compassionate-visvesvaraya-9e2bd6.netlify.app."]
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