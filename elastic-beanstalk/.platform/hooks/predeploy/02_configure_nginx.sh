#!/bin/bash

NGINX_DIR="/etc/nginx"
NGINX_CONF_DIR="$NGINX_DIR/conf.d"

NGINX_PLATFORM_DIR=".platform/nginx"
NGINX_PLATFORM_CONF_DIR="$NGINX_PLATFORM_DIR/conf.d"

API_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k API_DOMAIN)
API_PORT=$(/opt/elasticbeanstalk/bin/get-config environment -k API_PORT)

# Remove old HTTPS config

echo "Removing default HTTPS config..."

rm -f "$NGINX_CONF_DIR/https.conf"

# Update games-not-played config

echo "Configuring nginx to forward https://$API_DOMAIN to API server..."

sed -i "s/DOMAINREPLACEME/$API_DOMAIN/g" "$NGINX_PLATFORM_CONF_DIR/games-not-played.conf"
sed -i "s/DOMAINREPLACEME/$API_DOMAIN/g" "$NGINX_DIR/snippets/ssl.conf"
sed -i "s/APIPORTREPLACEME/$API_PORT/g" "$NGINX_DIR/games-not-played.conf"
sed -i "s/APIPORTREPLACEME/$API_PORT/g" "$NGINX_PLATFORM_CONF_DIR/snippets/ssl.conf"

# Copy updated files

echo "Copying nginx configuration files..."

yes | cp -rf "$NGINX_PLATFORM_DIR/nginx.conf" "$NGINX_DIR/nginx.conf"
yes | cp -rf "$NGINX_PLATFORM_DIR/snippets/ssl.conf" "$NGINX_DIR/snippets/ssl.conf"
yes | cp -rf "$NGINX_PLATFORM_CONF_DIR/games-not-played.conf" "$NGINX_CONF_DIR/games-not-played.conf"