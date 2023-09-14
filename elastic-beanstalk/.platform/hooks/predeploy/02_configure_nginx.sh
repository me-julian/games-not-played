#!/bin/bash

# Latest files from .platform ELB has in staging
NGINX_STAGING=".platform/nginx"

# Deploy the edited staging files here
NGINX_LIVE="/etc/nginx"

API_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k API_DOMAIN)
API_PORT=$(/opt/elasticbeanstalk/bin/get-config environment -k API_PORT)

# Remove old HTTPS config

echo "Removing default HTTPS config..."

rm -f "$NGINX_LIVE/conf.d/https.conf"

# Update games-not-played config

echo "Populating API domain and port information..."

sed -i "s/DOMAINREPLACEME/$API_DOMAIN/g" "$NGINX_STAGING/conf.d/games-not-played.conf"
sed -i "s/DOMAINREPLACEME/$API_DOMAIN/g" "$NGINX_STAGING/snippets/https-proxy.conf"
sed -i "s/APIPORTREPLACEME/$API_PORT/g" "$NGINX_STAGING/conf.d/games-not-played.conf"
sed -i "s/APIPORTREPLACEME/$API_PORT/g" "$NGINX_STAGING/snippets/https-proxy.conf"

# Copy updated files

echo "Copying nginx configuration files..."

yes | cp -rf "$NGINX_STAGING/nginx.conf" "$NGINX_LIVE/nginx.conf"
yes | cp -rf "$NGINX_STAGING/conf.d/games-not-played.conf" "$NGINX_LIVE/conf.d/games-not-played.conf"
mkdir -p "$NGINX_LIVE/snippets"
yes | cp -rf "$NGINX_STAGING/snippets/https-proxy.conf" "$NGINX_LIVE/snippets/https-proxy.conf"