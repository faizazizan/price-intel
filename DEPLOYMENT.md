# Deployment Guide

This guide covers deploying the Pricing Intelligence App to various platforms.

## Pre-Deployment Checklist

- [ ] All calculators tested and working
- [ ] Build completes without errors: `npm run build`
- [ ] Check `_site` folder contains 5 HTML files
- [ ] Verify all JavaScript modules load correctly
- [ ] Test on mobile responsive view

## Option 1: Netlify (Fastest & Easiest)

### Via Git (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Pricing Intelligence App"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `_site`
   - **Node version**: 18 or higher (set in Build & Deploy settings if needed)

4. **Deploy**
   - Click "Deploy site"
   - Your site will be live in ~2 minutes
   - Custom domain available in site settings

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the site
npm run build

# Deploy
netlify deploy --prod --dir=_site
```

## Option 2: Vercel

### Via Git

1. **Push to GitHub/GitLab/Bitbucket** (same as above)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

3. **Configure**
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `_site`

4. **Deploy**
   - Click "Deploy"
   - Live in ~1-2 minutes

### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Build
npm run build

# Deploy
vercel --prod
```

## Option 3: GitHub Pages

### Manual Deployment

```bash
# Build the site
npm run build

# Create gh-pages branch and deploy
git subtree push --prefix _site origin gh-pages
```

### Via GitHub Actions (Automated)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

Enable GitHub Pages in repository settings → Pages → Source: gh-pages branch

## Option 4: Cloudflare Pages

1. **Push to GitHub** (same as above)

2. **Create Cloudflare Pages Project**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect Git account
   - Select repository

3. **Configure Build**
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
   - **Environment variables**: None required

4. **Deploy**
   - Automatic deployment on every push

## Option 5: AWS S3 + CloudFront

```bash
# Build
npm run build

# Install AWS CLI
# Configure with: aws configure

# Sync to S3
aws s3 sync _site/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Option 6: Self-Hosted (Apache/Nginx)

### Build and Upload

```bash
# Build
npm run build

# Upload _site folder to your server
scp -r _site/* user@yourserver:/var/www/html/pricing-app/
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name pricing.yourdomain.com;
    
    root /var/www/html/pricing-app;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName pricing.yourdomain.com
    DocumentRoot /var/www/html/pricing-app
    
    <Directory /var/www/html/pricing-app>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Cache static assets
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>
</VirtualHost>
```

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Test all 4 calculators
3. Check mobile responsiveness
4. Verify all calculations work correctly
5. Test all navigation links

### Custom Domain Setup

#### Netlify
1. Site settings → Domain management
2. Add custom domain
3. Configure DNS (A record or CNAME)

#### Vercel
1. Project settings → Domains
2. Add domain
3. Update DNS records

#### Cloudflare Pages
1. Custom domains → Add domain
2. Automatic DNS configuration if using Cloudflare DNS

### SSL/HTTPS

All recommended platforms (Netlify, Vercel, Cloudflare, GitHub Pages) provide **automatic HTTPS** for free.

## Performance Optimization (Optional)

### Enable Compression
Most platforms enable this by default. For self-hosted:

**Nginx**: Add to config
```nginx
gzip on;
gzip_types text/css application/javascript;
```

**Apache**: Enable mod_deflate
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### CDN Configuration
Netlify, Vercel, and Cloudflare include CDN by default.

## Troubleshooting

### Build Fails
- Check Node version (18+ recommended)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for syntax errors in `.njk` files

### JavaScript Not Working
- Verify `assets/js` folder copied to `_site/assets/js`
- Check browser console for module loading errors
- Ensure MIME types configured correctly on server

### Styling Issues
- Verify Tailwind CSS built: Check `_site/assets/css/styles.css` exists
- Run `npm run build:tailwind` manually to debug

### 404 Errors
- Check file paths in links (should start with `/`)
- Verify `_site` contains all expected HTML files
- Check server configuration for clean URLs

## Continuous Deployment

### Git-based Platforms (Netlify, Vercel, Cloudflare)
- **Automatic**: Push to main branch triggers rebuild
- **Branch Previews**: PRs get preview URLs
- **Rollback**: Revert to previous deployment in dashboard

### Manual Deployment
Create a deploy script `deploy.sh`:

```bash
#!/bin/bash
echo "Building site..."
npm run build

echo "Deploying to production..."
# Add your deployment command here
# e.g., rsync, s3 sync, ftp upload, etc.

echo "Deployment complete!"
```

Make executable: `chmod +x deploy.sh`

---

## Recommended Platform by Use Case

| Use Case | Recommended Platform | Why |
|----------|---------------------|-----|
| Quick demo | **Netlify** | Fastest setup, drag-and-drop option |
| Production app | **Vercel** or **Cloudflare Pages** | Best performance, global CDN |
| Open source project | **GitHub Pages** | Free, integrated with repo |
| Enterprise/Custom | **AWS S3 + CloudFront** | Full control, scalable |
| Existing server | **Self-hosted** | Use existing infrastructure |

---

**For this project, we recommend Netlify or Vercel for the fastest, easiest deployment with automatic HTTPS and global CDN.**
