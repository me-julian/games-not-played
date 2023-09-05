#!/bin/bash

echo "Building AWS Elastic Beanstalk package..."
mkdir -p ebs/package
rm -rf ebs/package/jecoaching-site.zip
(cd ebs; zip -r package/jecoaching-site.zip . -x package/)