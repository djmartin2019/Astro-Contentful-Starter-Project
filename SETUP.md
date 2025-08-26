# Setup Guide

Quick setup for your Astro + Contentful starter template.

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

## 🔧 Contentful Setup (Optional)

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
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

## 🎯 Current Status

✅ **Working Features**

- Development server
- Production build
- Basic site structure
- Responsive design
- TypeScript support

⚠️ **Requires Contentful Setup**

- Blog functionality
- Dynamic content loading
- Content management

## 🚀 Next Steps

1. **Add content** to your Contentful space
2. **Customize** the design and layout
3. **Deploy** to your preferred hosting platform

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

**Happy building! 🚀**
