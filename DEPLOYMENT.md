# Deployment Guide

Complete guide to deploying this portfolio to Vercel with automated CI/CD.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Deployment](#quick-deployment)
3. [CI/CD Setup](#cicd-setup)
4. [Environment Variables](#environment-variables)
5. [Custom Domain](#custom-domain)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- GitHub account with repository access
- Vercel account (free or paid)
- Node.js 18+ installed locally
- npm or yarn installed

## Quick Deployment

### Option 1: Automatic Deployment (Recommended)

This is the fastest way to deploy with automatic CI/CD.

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [Vercel.com](https://vercel.com)
   - Click "New Project"
   - Select "Import Git Repository"
   - Authorize GitHub
   - Select this repository

3. **Configure Project**
   - Framework: Vite (auto-detected)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Click "Deploy"

4. **Done!**
   - Vercel assigns a `.vercel.app` domain
   - Auto-deploys on every push to `main`

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (creates preview)
vercel

# Deploy to production
vercel --prod
```

### Option 3: GitHub UI

1. Push code to GitHub
2. Go to Settings > Integrations
3. Install Vercel app
4. Authorize GitHub repository
5. Vercel auto-deploys on push

## CI/CD Setup

### GitHub Actions Configuration

The repository includes `.github/workflows/ci-cd.yml` that automatically:

1. **Tests & Linting** (on every push/PR)
   - ESLint code quality
   - TypeScript type checking
   - Build verification

2. **Security Checks**
   - npm audit for vulnerabilities
   - Dependency scanning

3. **Performance Testing**
   - Lighthouse CI
   - Bundle size analysis

4. **Deployment**
   - Preview deployments for PRs
   - Production deployment on `main` branch

### Enable GitHub Actions

1. Go to repository → Settings → Actions
2. Ensure "Allow all actions and reusable workflows" is selected
3. GitHub Actions runs automatically on:
   - Push to `main` or `develop` branches
   - Pull request creation

### Enable Vercel Integration

GitHub Actions needs Vercel tokens to deploy. Set these secrets in GitHub:

1. Go to Repository → Settings → Secrets and Variables → Actions
2. Click "New repository secret"
3. Add these secrets:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
```

**How to get these values:**

1. **VERCEL_TOKEN**
   - Go to [Vercel Account Settings](https://vercel.com/account/tokens)
   - Create new token
   - Copy token value

2. **VERCEL_ORG_ID**
   - Go to [Vercel Team Settings](https://vercel.com/teams)
   - Copy Team ID from settings
   - Or find it in URL: `vercel.com/teams/{ORG_ID}`

3. **VERCEL_PROJECT_ID**
   - Go to project Settings on Vercel
   - Copy "Project ID" value
   - Or find it in `.vercel/project.json` locally

## Environment Variables

### Vercel Dashboard Setup

1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - Development
   - Preview
   - Production

### Example Variables

```env
# .env.example (commit to repo, values in secrets)
VITE_APP_NAME=Owais's Portfolio
```

### Build Environment

Vercel automatically sets:
- `NODE_ENV` = production (during build)
- `NEXT_PUBLIC_*` variables accessible in browser

## Custom Domain

### Connect Custom Domain

1. Go to Vercel Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `owais.dev`)
4. Choose option:
   - **Transfer Domain**: Move to Vercel DNS
   - **Using External DNS**: Keep at current provider

### Using External DNS (Recommended)

1. Get Vercel nameservers from domain settings
2. Update DNS at your registrar:
   - Point nameservers to Vercel
   - Or create CNAME records pointing to Vercel
3. Wait for DNS propagation (up to 48 hours)

### Verify Domain

```bash
# Check domain status
nslookup your-domain.com

# Should point to Vercel servers
```

## Monitoring & Analytics

### Enable Vercel Analytics

1. Project Settings → Analytics
2. Click "Enable Analytics"
3. View performance metrics:
   - Core Web Vitals
   - Page load times
   - User interactions

### View Logs

**Build Logs:**
- Project → Deployments → Select deployment → Logs

**Edge Function Logs:**
- Real-time logs visible in Vercel Dashboard

**Server Errors:**
- Monitor → Errors & Issues

### Custom Monitoring (Optional)

Consider adding:
- **Sentry** for error tracking
- **Google Analytics** for user analytics
- **LogRocket** for session replay

## Performance Optimization

### Pre-deployment Checks

```bash
# Build locally
npm run build

# Check bundle size
npm run build -- --analyze

# Test locally
npm run preview
```

### Vercel Optimization Features

1. **Automatic Image Optimization**
   - Images served via Vercel CDN
   - Automatic format conversion
   - Responsive sizes

2. **Edge Caching**
   - Static files cached globally
   - Set cache headers in `vercel.json`

3. **Serverless Functions**
   - API routes auto-deployed
   - Scales automatically

### Cache Configuration

In `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Rollback & Versioning

### Rollback to Previous Version

1. Go to Deployments
2. Find desired deployment
3. Click "Promote to Production"

### View Deployment History

```bash
# Using Vercel CLI
vercel list
```

### Create Git Tags for Releases

```bash
# Create version tag
git tag v1.0.0
git push origin v1.0.0

# Vercel can deploy specific tags
```

## Troubleshooting

### Build Fails

**Problem**: Build command fails

**Solutions**:
1. Check build logs: Deployments → Logs
2. Run build locally: `npm run build`
3. Fix errors and commit
4. Vercel redeploys automatically

### Slow Deployment

**Problem**: Deployment takes too long

**Solutions**:
1. Clear cache: Deployments → Delete cache
2. Optimize dependencies: Remove unused packages
3. Check build logs for bottlenecks

### Environment Variables Not Working

**Problem**: Environment variables undefined in build

**Solutions**:
1. Verify variables in Project Settings
2. For client-side: prefix with `VITE_`
3. Rebuild after adding variables
4. Check `.env` is in `.gitignore`

### Domain Not Resolving

**Problem**: Custom domain shows 404

**Solutions**:
1. Wait for DNS propagation (48 hours)
2. Check nameservers in DNS provider
3. Verify domain in Vercel settings
4. Clear browser cache

### GitHub Actions Not Running

**Problem**: CI/CD workflow not executing

**Solutions**:
1. Check `.github/workflows/ci-cd.yml` exists
2. Verify Actions enabled in Settings
3. Check GitHub Secrets are set:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. Review workflow logs: Actions tab

### Security Issues

**Problem**: Lighthouse reports security issues

**Solutions**:
1. Update dependencies: `npm update`
2. Audit security: `npm audit fix`
3. Add security headers in `vercel.json`
4. Enable HTTPS (default on Vercel)

## Deployment Checklist

Before production deployment:

- [ ] Code pushed to `main` branch
- [ ] All GitHub Actions passing
- [ ] No console errors in preview
- [ ] Tested in multiple browsers
- [ ] Performance score > 90
- [ ] Accessibility score > 95
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Error tracking configured
- [ ] Monitoring setup complete

## Useful Links

- [Vercel Docs](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Vercel CLI Reference](https://vercel.com/cli)
- [Custom Domain Help](https://vercel.com/docs/concepts/projects/domains)

## Support

For issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Review [Vercel Community](https://github.com/orgs/vercel/discussions)
3. Contact Vercel Support through dashboard
4. Open issue on GitHub repository

---

Happy deploying! 🚀
