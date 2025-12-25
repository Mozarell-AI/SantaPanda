#!/bin/bash

# Google Cloud Deployment Script for Santa Panda
# This script automates the deployment process

set -e

echo "🎄 Santa Panda - Google Cloud Deployment Script"
echo "================================================"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK not found. Please install it first:"
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm not found. Please install it first."
    exit 1
fi

# Step 1: Check current project
echo ""
echo "📋 Current GCP Configuration:"
PROJECT_ID=$(gcloud config get-value project 2>/dev/null || echo "not-set")
ACCOUNT=$(gcloud config get-value account 2>/dev/null || echo "not-set")

echo "   Project ID: $PROJECT_ID"
echo "   Account: $ACCOUNT"

if [ "$PROJECT_ID" == "not-set" ]; then
    echo ""
    echo "⚠️  No project is set. Please set one:"
    echo "   gcloud config set project YOUR_PROJECT_ID"
    echo "   Or create a new project:"
    echo "   gcloud projects create YOUR_PROJECT_ID"
    exit 1
fi

# Step 2: Build the app
echo ""
echo "🔨 Building the application..."
npm ci
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "✅ Build complete"

# Step 3: Deploy
echo ""
echo "🚀 Deploying to Google Cloud App Engine..."
echo "   Project: $PROJECT_ID"
echo ""

gcloud app deploy --quiet

# Step 4: Show deployment info
echo ""
echo "✅ Deployment complete!"
echo ""
echo "📱 Your app is now live!"
gcloud app browse
