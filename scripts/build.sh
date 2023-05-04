#!/bin/bash

npx tsc -b
cd src/app && npx tsc && npx vite build