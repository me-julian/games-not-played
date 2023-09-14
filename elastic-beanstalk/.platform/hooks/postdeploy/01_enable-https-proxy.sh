#!/bin/bash

# Start the actual https proxy server by
# including the snippet in the app .conf
echo "include /etc/nginx/snippets/https-proxy.conf;" >> "/etc/nginx/conf.d/games-not-played.conf"

# Restart the server
service nginx restart