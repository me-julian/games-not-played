#!/bin/bash

rm -r -f /etc/nginx/snippets
mkdir /etc/nginx/snippets
cp /var/proxy/staging/nginx/snippets/ssl.conf /etc/nginx/snippets/ssl.conf