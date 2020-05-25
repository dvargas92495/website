terraform {
    backend "remote" {
        hostname = "app.terraform.io"
        organization = "Website"
        workspaces {
            prefix = "site-"
        }
    }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_route53_zone" "zone" {
    name          = "davidvargas.me"
    comment       = "HostedZone created by Route53 Registrar"
    force_destroy = false
}

resource "aws_iam_user" "davidvargas" {
  name = "davidvargas"
}

data "aws_iam_policy_document" "davidvargas" {
  statement {
    sid = "VisualEditor0"

    actions = [
      "iam:GetUserPolicy",
      "route53:GetHostedZone",
      "iam:GetUser",
      "route53:ListTagsForResource"
    ]

    resources = [
        aws_iam_user.davidvargas.arn,
        "arn:aws:route53:::hostedzone/${aws_route53_zone.zone.zone_id}",
    ]
  }
}

resource "aws_iam_user_policy" "davidvargas" {
  name   = "personal"
  user   = aws_iam_user.davidvargas.name
  policy = data.aws_iam_policy_document.davidvargas.json
}