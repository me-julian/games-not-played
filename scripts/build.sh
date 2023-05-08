#!/bin/bash

echo "Running build script."
echo "Compiling typescript."
npx tsc -b
echo "End typescription compilation."
npx vite build --emptyOutDir
echo "End build script."