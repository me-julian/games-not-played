#!/bin/bash

# Get ARN id of secrets
JWT_SECRET_ARN=$(/opt/elasticbeanstalk/bin/get-config environment -k JWT_SECRET_ARN)
RAWG_API_TOKEN_ARN=$(/opt/elasticbeanstalk/bin/get-config environment -k RAWG_API_TOKEN_ARN)
MYSQL_PASS_ARN=$(/opt/elasticbeanstalk/bin/get-config environment -k MYSQL_PASS_ARN)

# Request secrets
JWT_SECRET=$(aws secretsmanager get-secret-value --secret-id $JWT_SECRET_ARN --region us-east-2 | jq -r '.SecretString' | jq -r '.value')
RAWG_API_TOKEN=$(aws secretsmanager get-secret-value --secret-id $RAWG_API_TOKEN_ARN --region us-east-2 | jq -r '.SecretString' | jq -r '.token')
MYSQL_USER_PASSWORD=$(aws secretsmanager get-secret-value --secret-id $MYSQL_PASS_ARN --region us-east-2 | jq -r '.SecretString' | jq -r '.password')

# Append secret values to app .env
echo "JWT_SECRET=${JWT_SECRET}" >> /var/app/staging/.env 
echo "RAWG_API_TOKEN=${RAWG_API_TOKEN}" >> /var/app/staging/.env 
echo "MYSQL_USER_PASSWORD=${MYSQL_USER_PASSWORD}" >> /var/app/staging/.env 
