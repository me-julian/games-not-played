#!/bin/bash

# Get a token for access to IMDSv2 (Instance Metadata Service v2)
IMDS_TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 120")

# Use the token to request this instance's id
INSTANCE_ID=$(curl -H "X-aws-ec2-metadata-token: $IMDS_TOKEN" -s  http://169.254.169.254/latest/meta-data/instance-id)

DATA_VOLUME_ID=$(/opt/elasticbeanstalk/bin/get-config environment -k DATA_VOLUME_ID)

# Check if volume is already attached.
echo "Checking if '$DATA_VOLUME_ID' already attached to Instance '$INSTANCE_ID'..."
VOLUME_ATTACHED=$(aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=$INSTANCE_ID | jq --arg DATA_VOLUME_ID $DATA_VOLUME_ID 'contains({"Volumes": [{"VolumeId": $DATA_VOLUME_ID}]})')

if [ $VOLUME_ATTACHED = "true" ]
then
    echo "Volume already attached."
else
    echo "Volume is not attached to current instance."

    # Check that the volume isn't in use by another instance
    echo "Checking if volume is being used by any other resources..."
    NOT_IN_USE=$(aws ec2 describe-volumes --region us-east-2 --filter Name=volume-id,Values=$DATA_VOLUME_ID --query 'Volumes[*].{VolumeID:VolumeId,Attachments:Attachments}' | jq 'contains([{Attachments:[]}])')

    if [ $NOT_IN_USE = "true" ]
    then
        # Attach volume to this application instance on /dev/sdh
        echo "Attaching volume to self..."
        aws ec2 attach-volume --volume-id $DATA_VOLUME_ID --instance-id $INSTANCE_ID --device /dev/sdh

        # Wait until volume is finished attaching.
        aws ec2 wait volume-in-use --region us-east-2 --volume-ids $DATA_VOLUME_ID

        # Create filesystem on volume if it's empty
        echo "Checking if volume contains filesystem..."
        if [ $(blkid -o value -s TYPE /dev/sdh) != "ext4" ]
        then
            echo "Volume is empty, creating filesystem..."
            mkfs -t ext4 /dev/sdh
        else
            echo "Existing filesystem detected on volume."
        fi

        # Mount EBS to folder for MySQL docker image
        echo "Checking if data is already mounted..."
        if $(mountpoint -q /data)
        then
            echo "Already mounted."
        else
            echo "Mounting /dev/sdh to /data..."
            mkdir -p /data
            mount /dev/sdh /data
        fi
    else
        echo "UNEXPECTED STATE OF VOLUME: Volume already in use by another instance!"
        exit
    fi
fi