#!/bin/bash

echo "Running bash build script."
npx tsc -b
cd src/app && npx tsc && npx vite build