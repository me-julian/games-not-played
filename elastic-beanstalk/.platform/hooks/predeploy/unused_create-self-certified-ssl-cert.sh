#!/bin/bash

echo "Unimplemented"

# Create a temporary self-signed certificate
# if [ test -f "/etc/nginx/pki/$API_DOMAIN.crt" ]; then
#     echo "Certificate already exists."
#     openssl x509 -in /etc/nginx/pki/$API_DOMAIN.crt -text -noout
# else
# rm -r -f /etc/nginx/pki
# mkdir /etc/nginx/pki /etc/nginx/pki/private
# rm -r -f openssl
# mkdir openssl && cd openssl
# # Create local certificate authority.
# openssl req -x509 \
#             -sha256 -days 1 \
#             -nodes \
#             -newkey rsa:2048 \
#             -subj "/CN=$API_DOMAIN/C=US/L=Austin" \
#             -keyout rootCA.key -out rootCA.crt 

# # Generate private key.
# openssl genrsa -out $API_DOMAIN.key 2048
# # Create config for self signed certificates.
# cat > csr.conf <<EOF
# [ req ]
# default_bits = 2048
# prompt = no
# default_md = sha256
# req_extensions = req_ext
# distinguished_name = dn

# [ dn ]
# C = US
# ST = Texas
# L = Austin
# O = "Games Not Played Student Project"
# OU = StagingEnvironment
# CN = $API_DOMAIN

# [ req_ext ]
# subjectAltName = @alt_names

# [ alt_names ]
# DNS.1 = $API_DOMAIN
# DNS.2 = "www.$API_DOMAIN"

# EOF

# # Generate certificate signing request.
# openssl req -new -key $API_DOMAIN.key -out $API_DOMAIN.csr -config csr.conf

# # Create config for request.
# cat > cert.conf <<EOF

# authorityKeyIdentifier=keyid,issuer
# basicConstraints=CA:FALSE
# keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
# subjectAltName = @alt_names

# [alt_names]
# DNS.1 = $API_DOMAIN
# DNS.1 = "www.$API_DOMAIN"

# EOF

# # Generate Self Signed SSL certificate
# openssl x509 -req \
#     -in $API_DOMAIN.csr \
#     -CA rootCA.crt -CAkey rootCA.key \
#     -CAcreateserial -out $API_DOMAIN.crt \
#     -days 1 \
#     -sha256 -extfile cert.conf

# # Copy cert files to Nginx location
# cp $API_DOMAIN.crt /etc/nginx/pki/$API_DOMAIN.crt
# cp $API_DOMAIN.key /etc/nginx/pki/private/$API_DOMAIN.key