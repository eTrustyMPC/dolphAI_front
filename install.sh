#!/bin/bash

# Install dependencies
npm ci

# Build project
npm run build

# Set permissions
chmod -R 755 public

echo "Installation complete. Run 'npm start' to launch the application."
