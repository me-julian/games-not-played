#! bin/bash

# Wait for the volume to be available
aws ec2 wait volume-in-use --region us-east-2 --volume-ids vol-0f08cb8b95f5138d0

# Attach volume to this application instance on /dev/sdh
aws ec2 attach-volume --volume-id vol-0f08cb8b95f5138d0 --instance-id $(curl -s http://169.254.169.254/latest/meta-data/instance-id) --device /dev/sdh