#! bin/bash

# Wait for the volume to be available
aws ec2 wait volume-in-use --region us-east-2 --volume-ids vol-0f08cb8b95f5138d0

# Get a token for access to IMDSv2 (Instance Metadata Service v2)
IMDS_TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")

# Use the token to request this instance's id
INSTANCE_ID=$(curl -H "X-aws-ec2-metadata-token: $AWS_METADATA_TOKEN" -s  http://169.254.169.254/latest/meta-data/instance-id)

# Attach volume to this application instance on /dev/sdh
aws ec2 attach-volume --volume-id vol-0f08cb8b95f5138d0 --instance-id $INSTANCE_ID --device /dev/sdh