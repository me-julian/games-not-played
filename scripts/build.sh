#!/bin/bash

echo "Running build script."
echo "Compiling typescript."
npx tsc -b
echo "Typescript compilation finished."
npx vite build --emptyOutDir
echo "End build script."