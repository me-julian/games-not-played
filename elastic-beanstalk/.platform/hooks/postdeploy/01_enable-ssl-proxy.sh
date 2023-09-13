#!/bin/bash

# Add snippet for actual SSL protected proxy server
echo "include /etc/nginx/snippets/ssl.conf" >> "/etc/nginx/conf.d/games-not-played.conf"

# Restart the server
service nginx restart