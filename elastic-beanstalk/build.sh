#!/bin/bash

echo "Building AWS Elastic Beanstalk package..."
mkdir -p ./package
rm -rf ./package/games-not-played.zip
zip -r package/games-not-played.zip . -x package/