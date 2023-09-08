#!/bin/sh

echo "unimplemented"

# python3 -m venv /opt/certbot/
# /opt/certbot/bin/pip install --upgrade pip

# /opt/certbot/bin/pip install certbot certbot-nginx
# ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# certbot --nginx 

          # Enter email address (used for urgent renewal and security notices)
          # jmedeployment@gmail.com [Enter]
          # Please read the Terms of Service at
          # https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must
          # agree in order to register with the ACME server. Do you agree?
          # Y [Enter]
          # Would you be willing, once your first certificate is successfully issued, to
          # share your email address with the Electronic Frontier Foundation, a founding
          # partner of the Let's Encrypt project and the non-profit organization that
          # develops Certbot? We'd like to send you email about our work encrypting the web,
          # EFF news, campaigns, and ways to support digital freedom.
          # N [Enter]
          # Please enter the domain name(s) you would like on your certificate (comma and/or
          # space separated)
          # $DOMAIN_NAME [Enter]


# Manual ver
          # Create a file containing just this data:

          # SLcGgMiIZ53wIt7Z18BaupGBvnTP6LMAtYUw9fL2-s0.gdTCyUPBEf1P5r1Yq-EAIY77n2F07miTlRpiJMeMMSA

          # And make it available on your web server at this URL:

          # http://${DOMAIN_NAME}/.well-known/acme-challenge/SLcGgMiIZ53wIt7Z18BaupGBvnTP6LMAtYUw9fL2-s0
          # Press Enter to Continue
          # [Enter]


# CERTS_S3_BUCKET="s3://ssl-certificates/games-not-played"
# CERTS_DIR="/etc/letsencrypt/live/${DOMAIN_NAME}"

# echo "Copying SSL certificates from $CERTS_S3_BUCKET to $CERTS_DIR..."

# aws s3 cp $CERTS_S3_BUCKET/REPLACEME $CERTS_DIR/fullchain.pem
# aws s3 cp $CERTS_S3_BUCKET/REPLACEME $CERTS_DIR/privkey.pem