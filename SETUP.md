# Setup Guide

Quick setup for your Astro + Contentful starter template, optimized for Cloudflare Pages.

## 🚀 Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your Contentful API keys
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

Visit `http://localhost:4321` to see your site!

## 🔧 Contentful Setup (Optional)

The template works without Contentful, but to use the full content management features:

### 1. Create Contentful Space

- Go to [contentful.com](https://contentful.com)
- Create a new space
- Note your Space ID

### 2. Add Content Types

Create these content types in your space:

**Blog Post (`blogPost`)**

- Title (Short text)
- Slug (Short text)
- Excerpt (Long text)
- Content (Rich text)
- Featured Image (Media)
- Author (Short text)
- Publish Date (Date)
- Tags (Short text, multiple)

**Page (`page`)**

- Title (Short text)
- Slug (Short text)
- Content (Rich text)

### 3. Get API Keys

- Go to Settings > API keys
- Copy Space ID and Content Delivery API access token
- Add to your `.env` file

## 📝 Environment Variables

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_ENVIRONMENT=master
```

## ☁️ Cloudflare Pages Deployment

This template is specifically designed for Cloudflare Pages:

### Key Features

- **No Node.js SDK** - Uses native `fetch()` API instead of Contentful's Node SDK
- **Build-time Fetching** - All content is fetched during the build process
- **Static Output** - Generates static HTML files for optimal performance
- **CDN Images** - Images are served directly from Contentful's CDN

### Deployment Steps

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Add environment variables** in Cloudflare Pages dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_DELIVERY_TOKEN`
   - `CONTENTFUL_ENVIRONMENT`

## 🎯 Current Status

✅ **Working Features**

- Development server
- Production build
- Basic site structure
- Responsive design
- TypeScript support
- SEO components
- Static page generation

⚠️ **Requires Contentful Setup**

- Blog functionality
- Dynamic content loading
- Content management

## 🚀 Next Steps

1. **Add content** to your Contentful space
2. **Customize** the design and layout
3. **Deploy** to Cloudflare Pages

## 🆘 Troubleshooting

**"Cannot find module 'contentful'"**

- Run `npm install` to install dependencies

**"Contentful client error"**

- Check your environment variables in `.env`
- Verify your Contentful API keys

**"TypeScript errors"**

- Run `npm run type-check` to see specific issues
- Ensure all imports are correct

---

## 💡 Why This Approach?

This template uses a **Cloudflare-first approach**:

1. **No Node.js dependencies** - Everything works in Cloudflare's edge environment
2. **Build-time content fetching** - Content is fetched once during build, not on every request
3. **Static site generation** - Perfect for Cloudflare Pages' static hosting
4. **Native web APIs** - Uses `fetch()` instead of external SDKs
5. **Optimal performance** - No runtime API calls, just static HTML with CDN images
