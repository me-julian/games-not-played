#!/bin/bash

APP_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k APP_DOMAIN)
DATA_VOLUME_ID=$(/opt/elasticbeanstalk/bin/get-config environment -k DATA_VOLUME_ID)
MYSQL_DATABASE=$(/opt/elasticbeanstalk/bin/get-config environment -k MYSQL_DATABASE)
MYSQL_IMAGE=$(/opt/elasticbeanstalk/bin/get-config environment -k MYSQL_IMAGE)
MYSQL_USER=$(/opt/elasticbeanstalk/bin/get-config environment -k MYSQL_USER)
RAWG_URL=$(/opt/elasticbeanstalk/bin/get-config environment -k RAWG_URL)


# Copy EB environment property env vars to app .env
echo "Copying EB  to app location."
echo "APP_DOMAIN=${APP_DOMAIN}" >> /var/app/staging/.env
echo "DATA_VOLUME_ID=${DATA_VOLUME_ID}" >> /var/app/staging/.env
echo "MYSQL_DATABASE=${MYSQL_DATABASE}" >> /var/app/staging/.env
echo "MYSQL_IMAGE=${MYSQL_IMAGE}" >> /var/app/staging/.env
echo "MYSQL_USER=${MYSQL_USER}" >> /var/app/staging/.env
echo "RAWG_URL=${RAWG_URL}" >> /var/app/staging/.env