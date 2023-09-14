#!/bin/bash

# Get a token for access to IMDSv2 (Instance Metadata Service v2)
IMDS_TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 120")

# Use the token to request this instance's id
INSTANCE_ID=$(curl -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" -s  http://169.254.169.254/latest/meta-data/instance-id)

DATA_VOLUME_ID=$(/opt/elasticbeanstalk/bin/get-config environment -k DATA_VOLUME_ID)

# Check if volume is already attached.
VOLUME_ATTACHED=$(aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=$INSTANCE_ID | jq --arg DATA_VOLUME_ID $DATA_VOLUME_ID 'contains({"Volumes": [{"VolumeId": $DATA_VOLUME_ID}]})')
echo "Volume attached evaluated to $VOLUME_ATTACHED"
if [ VOLUME_ATTACHED = "true" ]
then
    echo "Volume '$DATA_VOLUME_ID' already attached to Instance '$INSTANCE_ID'"
else
    echo "Volume '$DATA_VOLUME_ID' not attached to current instance."
    echo "Attempt to attach to self."

    # Wait for the volume to be available
    #   Currently can't handle if the volume is attached to an instance
    #   other than the current application.
    aws ec2 wait volume-in-use --region us-east-2 --volume-ids $DATA_VOLUME_ID

    # Attach volume to this application instance on /dev/sdh
    aws ec2 attach-volume --volume-id $DATA_VOLUME_ID --instance-id $INSTANCE_ID --device /dev/sdh
fi

# Create filesystem on volume if it's empty
if [ $(blkid | grep -c "/dev/sdh") -ne 0 ]
then
    echo "Volume is empty, creating filesystem..."
    mkfs -t ext4 /dev/sdh
fi

# Mount EBS to folder for MySQL docker image
echo "Mounting EBS device at /dev/sdh to /data/mysql if it isn't already..."
mkdir -p /data/mysql
mount /dev/sdh/mysql /data/mysql