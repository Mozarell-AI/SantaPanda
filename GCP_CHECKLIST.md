# Google Cloud Deployment Checklist

## Before Deployment ✓

### 1. GCP Account & Project Setup
- [ ] Create a Google Cloud account at https://cloud.google.com
- [ ] Create a new project or note your existing Project ID
- [ ] Enable billing on your GCP project
- [ ] Install Google Cloud SDK (already done in your environment)

### 2. Configure gcloud CLI
```bash
# Initialize gcloud configuration
gcloud init

# Set your project (do this if not already set)
gcloud config set project YOUR_PROJECT_ID

# Verify configuration
gcloud config list
```

### 3. Enable Required APIs
```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com
```

### 4. Verify Application Setup
- [ ] Check `package.json` has all dependencies
- [ ] Check `Dockerfile` is present and valid
- [ ] Run `npm install` to install dependencies locally
- [ ] Run `npm run build` to verify build works
- [ ] Check `dist/` folder is created successfully

## Deployment Methods

### Method 1: Simple Deployment (Recommended for First Deploy)
```bash
# Just run this command from project root
gcloud app deploy
```

### Method 2: Using Deploy Script
```bash
# Make sure script is executable
chmod +x deploy.sh

# Run the automated script
./deploy.sh
```

### Method 3: Manual Step-by-Step
```bash
# 1. Build locally
npm ci
npm run build

# 2. Deploy
gcloud app deploy

# 3. Open in browser
gcloud app browse
```

## After Deployment

### View Your Live App
```bash
# Open in default browser
gcloud app browse

# Or get the URL
gcloud app describe
```

### Monitor Deployment
```bash
# Watch logs in real-time
gcloud app logs read -f

# View error logs
gcloud app logs read --level=ERROR
```

### Update Your App
```bash
# Make changes to your code
# Rebuild
npm run build

# Redeploy
gcloud app deploy
```

## Troubleshooting

### Issue: "Permission denied" when deploying
**Solution**: Ensure you're authenticated with the correct GCP account
```bash
gcloud auth login
gcloud auth list
```

### Issue: "App Engine API not enabled"
**Solution**: Enable the API
```bash
gcloud services enable appengine.googleapis.com
```

### Issue: "Failed to build image"
**Solution**: Check local build works
```bash
npm ci
npm run build
# Check dist/ folder exists with index.html
ls dist/index.html
```

### Issue: "404 errors on refresh"
**Solution**: App Engine is configured for SPA routing - this should work automatically with your `app.yaml` configuration.

### Issue: "Port already in use" (local testing)
**Solution**: Use a different port
```bash
serve -s dist -l 4000
```

## Configuration Files Created

- **app.yaml** - Google Cloud App Engine configuration
  - Specifies Node.js runtime
  - Configures app entry point
  - Sets environment variables

- **.gcloudignore** - Files to exclude from deployment
  - Ignores node_modules (will be installed on server)
  - Ignores git history
  - Ignores environment files

- **deploy.sh** - Automated deployment script
  - Validates environment
  - Builds application
  - Deploys to App Engine
  - Opens deployed app in browser

- **DEPLOYMENT.md** - Detailed deployment guide
  - Step-by-step instructions
  - Environment variable setup
  - Monitoring and debugging
  - Architecture overview

## Quick Commands Reference

```bash
# Initialize and deploy
gcloud init
gcloud app deploy

# View deployed app
gcloud app browse

# See logs
gcloud app logs read -n 50

# List all deployed versions
gcloud app versions list

# Delete deployment
gcloud app delete

# Update specific service
gcloud app deploy --service=default

# Check deployment status
gcloud app describe
```

## Cost Considerations

- **Free Tier**: Google Cloud offers a free tier that includes App Engine usage
- **Billing**: Monitor your usage at console.cloud.google.com/billing
- **Estimate**: A simple React app typically costs $0-5/month on App Engine free tier

## Next Steps

1. **Custom Domain** (optional):
   ```bash
   gcloud app custom-domains create yourdomain.com
   ```

2. **Enable Automatic Scaling** (in app.yaml):
   ```yaml
   automatic_scaling:
     min_instances: 1
     max_instances: 5
   ```

3. **Set Up CI/CD** (Cloud Build):
   - Automatically deploy on Git push
   - Configure in `cloudbuild.yaml`

4. **Enable Monitoring**:
   ```bash
   gcloud monitoring dashboards create --config-from-file=dashboard.yaml
   ```

---

**You're all set!** Run `gcloud app deploy` to get your Santa Panda game live on Google Cloud! 🎄🚀
