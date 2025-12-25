# Deploy Santa Panda to Google Cloud

This guide will help you deploy the Santa Panda app to Google Cloud App Engine.

## Prerequisites

1. **Google Cloud Account** - Create one at https://cloud.google.com
2. **Google Cloud SDK** - Already installed in your environment
3. **Project Setup** - Create a GCP project

## Step 1: Create a Google Cloud Project

```bash
# Create a new project
gcloud projects create santa-panda-app --name="Santa Panda Game"

# Set it as the active project
gcloud config set project santa-panda-app
```

Or use an existing project:

```bash
gcloud config set project YOUR_PROJECT_ID
```

## Step 2: Enable Required APIs

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com
```

## Step 3: Build the Application

Build the React app locally before deployment:

```bash
npm install
npm run build
```

This creates a `dist/` folder with the production build.

## Step 4: Deploy to App Engine

### Option A: Deploy directly

```bash
gcloud app deploy
```

This will:
- Upload your code to Google Cloud
- Build a Docker image using your Dockerfile
- Deploy to App Engine
- Show you the deployed URL

### Option B: Deploy with a specific service name

```bash
gcloud app deploy --service-name=santa-panda
```

## Step 5: View Your Deployed App

After deployment completes, you can view your app:

```bash
# Open in browser
gcloud app browse

# Or view logs
gcloud app logs read -n 100

# Get the service URL
gcloud app describe
```

## Environment Variables

If you need to set environment variables (e.g., API keys):

1. Update `app.yaml` with env_variables:

```yaml
env_variables:
  GEMINI_API_KEY: "your-api-key"
```

2. Or set them via command line:

```bash
gcloud app deploy --update-env-variables GEMINI_API_KEY=your-api-key
```

## Monitoring & Debugging

```bash
# View real-time logs
gcloud app logs read -n 50 --limit=10

# View logs with level filter
gcloud app logs read --level=ERROR

# Monitor application metrics
gcloud monitoring
```

## Update/Redeploy

To deploy a new version:

```bash
npm run build
gcloud app deploy
```

## Delete Deployment

To remove the app:

```bash
gcloud app delete
```

## Troubleshooting

### Port Issues
The app runs on port 3000. The `app.yaml` file is configured to use `$PORT` environment variable set by App Engine.

### Build Failures
- Check that `npm run build` works locally
- Ensure all dependencies are in `package.json`
- Review build logs: `gcloud app logs read`

### 404 Errors
- Ensure the SPA routing is configured in your build
- Check that `dist/` folder is created with `index.html`

### Permission Errors
- Ensure you have the correct IAM roles:
  ```bash
  gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member=user:YOUR_EMAIL \
    --role=roles/editor
  ```

## Architecture

- **Frontend**: React/Vite SPA
- **Server**: Node.js with `serve` package
- **Container**: Docker (Node.js 20 Alpine)
- **Platform**: Google Cloud App Engine
- **Build**: Automatic from Dockerfile

## Next Steps

1. Set up continuous deployment with Cloud Build
2. Add custom domain
3. Set up SSL/TLS certificates
4. Configure CDN for static assets
5. Set up monitoring and alerting
