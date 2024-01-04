data "aws_iam_policy_document" "policy_document" {

    statement {
      sid = "1"

      actions = ["kms:Decrypt", "ssm:GetParameter"]
     
      resources = [ "*" ]

    }

    

}



resource "aws_iam_policy" "parameter_store_policy" {
  name        = "ParameterStorePolicy"
  description = "Policy for accessing Parameter Store and KMS"

  policy = data.aws_iam_policy_document.policy_document.json
}




resource "aws_iam_role" "example_role" {
  name = "ec2-ssm-role"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY

    
}

resource "aws_iam_role_policy_attachment" "policy_attachment" {
  role       = aws_iam_role.example_role.name
  policy_arn = aws_iam_policy.parameter_store_policy.arn
}