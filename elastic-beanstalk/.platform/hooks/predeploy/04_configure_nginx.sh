#!/bin/bash

NGINX_DIR="/etc/nginx"
NGINX_CONF_DIR="$NGINX_DIR/conf.d"

NGINX_PLATFORM_DIR=".platform/nginx"
NGINX_PLATFORM_CONF_DIR="$NGINX_PLATFORM_DIR/conf.d"

# APP_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k APP_DOMAIN)

# Remove old HTTPS config

echo "Removing default HTTPS config..."

rm -f "$NGINX_CONF_DIR/https.conf"

# Update wordpress config

# echo "Configuring nginx to forward https://$APP_DOMAIN to wordpress..."

# sed -i "s/replaceme.com/$APP_DOMAIN/g" "$NGINX_PLATFORM_CONF_DIR/games-not-played.conf"

# Copy updated files

echo "Copying nginx configuration files..."

yes | cp -rf "$NGINX_PLATFORM_DIR/nginx.conf" "$NGINX_DIR/nginx.conf"
yes | cp -rf "$NGINX_PLATFORM_CONF_DIR/games-not-played.conf" "$NGINX_CONF_DIR/games-not-played.conf"