# Headless CMS Frontend

A modern Next.js frontend for your headless WordPress CMS.

## Tech Stack

- **React**: 19.2.3
- **Next.js**: 16.1.0
- **Node.js**: 25.2.1
- **TypeScript**: Latest
- **GraphQL**: 16.2.0
- **GraphQL Request**: 7.3.1
- **Tailwind CSS**: 3.4.17

## Installation Steps

### 1. Install Node.js 25.2.1

```bash
# Using nvm (recommended)
nvm install 25.2.1
nvm use 25.2.1

# Or download from nodejs.org
```

### 2. Install Dependencies

```bash
cd frontend
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.local.example .env.local

# Edit .env.local with your WordPress GraphQL endpoint
WORDPRESS_API_URL=http://your-wordpress-site.com/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

### 5. Build for Production

```bash
npm run build
npm start
```

## WordPress Configuration

### Required Plugins

1. **WP GraphQL** - Already installed
2. **Advanced Custom Fields Pro** - Already installed  
3. **WPGraphQL for ACF** - Already installed

### Header Configuration

1. Go to WordPress Admin → Theme Settings → Header
2. Configure your header settings:
   - Upload logo
   - Add navigation menu items
   - Configure CTA button
   - Set sticky/transparent options

## GraphQL Endpoint

Your GraphQL endpoint will be available at:
```
http://your-wordpress-site.com/graphql
```

Test it in GraphiQL IDE or use the query:

```graphql
query GetHeaderSettings {
  headerSettings {
    logo {
      url
      alt
      width
      height
    }
    navigation {
      label
      url
      targetBlank
    }
    ctaButton {
      enabled
      text
      url
      style
    }
    sticky
    transparent
  }
}
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

- **Netlify**: Works out of the box
- **AWS Amplify**: Configure build settings
- **DigitalOcean App Platform**: Use Node.js buildpack

## Performance Optimizations

- Image optimization with Next.js Image component
- Automatic code splitting
- Static generation where possible
- CDN integration ready (Cloudflare/Fastly/Akamai)

## Security Features

- HTTPS enforcement
- Content Security Policy ready
- XSS protection
- Secure headers configuration