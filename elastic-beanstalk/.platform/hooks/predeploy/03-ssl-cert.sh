#!/bin/sh

API_DOMAIN=$(/opt/elasticbeanstalk/bin/get-config environment -k API_DOMAIN)

# Download GetSSL binary
curl -s -L https://github.com/jeffmerkey/getssl/releases/download/v2.47/getssl-2.47-1.noarch.rpm > getssl-2.47-1.noarch.rpm
# Install GetSSL
rpm -Uv getssl-2.47-1.noarch.rpm
# Run GetSSL
getssl -c $API_DOMAIN

# Args:
#   1: Start of line to find.
#   2: Full string to replace the line with.
#   3: Path to file to edit.
function replace_line () {
    sed -i "s+^$1.*+$2+" ${3}
}

# Set GetSSL base configuration.

# Switch from staging to normal certificates.
# replace_line "CA=\"https://acme" "CA=\"https://acme-v02.api.letsencrypt.org\"" "/root/.getssl/getssl.cfg"

# Set account email
replace_line "#ACCOUNT_EMAIL=" "ACCOUNT_EMAIL=\"jmedeployment@gmail.com\"" "/root/.getssl/getssl.cfg"

# Set GetSSL domain configuration

# Set acme challenge location
replace_line "#ACL=" "ACL=(\"/var/lib/nginx/$API_DOMAIN/.well-known/acme-challenge\")" "/root/.getssl/$API_DOMAIN/getssl.cfg"
# Use same challenge for domain with and without www.
replace_line "#USE_SINGLE_ACL=" "USE_SINGLE_ACL=\"true\"" "/root/.getssl/$API_DOMAIN/getssl.cfg"

# Set location to copy certificate files to
replace_line "#DOMAIN_CERT_LOCATION=" "DOMAIN_CERT_LOCATION=\"/etc/nginx/pki/$API_DOMAIN.crt\"" "/root/.getssl/$API_DOMAIN/getssl.cfg"
replace_line "#DOMAIN_KEY_LOCATION=" "DOMAIN_KEY_LOCATION=\"/etc/nginx/pki/private/$API_DOMAIN.key\"" "/root/.getssl/$API_DOMAIN/getssl.cfg"

# Request certificate
# getssl $API_DOMAIN