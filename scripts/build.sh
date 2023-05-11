#!/bin/bash

echo "Running build script."
echo "Compiling typescript."
npx tsc -b
echo "End typescript compilation."
echo "Running vite build."
npx vite build --emptyOutDir
echo "End build script."