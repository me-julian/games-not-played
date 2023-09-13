#!/bin/bash

# Add snippet for actual SSL protected proxy server
echo "server {" >> "/etc/nginx/conf.d/games-not-played.conf"
echo "    include /etc/nginx/ssl.conf" >> "/etc/nginx/conf.d/games-not-played.conf"
echo "}" >> "/etc/nginx/conf.d/games-not-played.conf"

# Restart the server
service nginx restart