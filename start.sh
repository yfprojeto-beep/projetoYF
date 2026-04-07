#!/bin/bash
set -e

echo "Building application..."
npm run build

echo "Starting application..."
npm start
