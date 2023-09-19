#!/bin/bash

# Latest files from .platform EB has in staging
NGINX_STAGING=".platform/nginx"

# Deploy the edited staging files here
NGINX_LIVE="/etc/nginx"

APP_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k APP_DOMAIN)

# Remove old HTTPS config
echo "Removing default HTTPS config..."

rm -f "$NGINX_LIVE/conf.d/https.conf"

# Update games-not-played config
echo "Populating app domain and port information..."

sed -i "s/DOMAINREPLACEME/$APP_DOMAIN/g" "$NGINX_STAGING/conf.d/games-not-played.conf"
sed -i "s/DOMAINREPLACEME/$APP_DOMAIN/g" "$NGINX_STAGING/snippets/https-proxy.conf"

# Copy updated files
echo "Copying nginx configuration files..."

yes | cp -rf "$NGINX_STAGING/nginx.conf" "$NGINX_LIVE/nginx.conf"
yes | cp -rf "$NGINX_STAGING/conf.d/games-not-played.conf" "$NGINX_LIVE/conf.d/games-not-played.conf"
mkdir -p "$NGINX_LIVE/snippets"
yes | cp -rf "$NGINX_STAGING/snippets/https-proxy.conf" "$NGINX_LIVE/snippets/https-proxy.conf"

# Move static client files to www for Nginx to serve
echo "Copying client files to www..."

rm -rf "/www/$APP_DOMAIN"
mkdir -p "/www/$APP_DOMAIN"
mv "www" "/www/$APP_DOMAIN"