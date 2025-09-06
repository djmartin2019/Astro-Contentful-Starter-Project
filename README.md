# Astro + Contentful Starter Repo

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?logo=github)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/generate)
[![Release](https://img.shields.io/github/v/release/djmartin2019/Astro-Contentful-Starter-Project)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/releases)
[![Stars](https://img.shields.io/github/stars/djmartin2019/Astro-Contentful-Starter-Project?style=social)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A lean starter template for building fast, content-driven websites with Astro and Contentful CMS. **Optimized for Cloudflare Pages deployment.**

## ✨ Features

- **Astro 4.x** - Static site generation
- **Contentful CMS** - Headless content management via REST API
- **Cloudflare Compatible** - Uses fetch instead of Node SDK for Cloudflare Pages
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach
- **SEO Ready** - Built-in meta tags and Open Graph
- **Build-time Fetching** - All content fetched at build time for optimal performance

## 🚀 Quick Start

1. **Clone and install**

   ```bash
   git clone https://github.com/djmartin2019/Astro-Contentful-Starter-Project.git
   cd astro-contentful-starter
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Add your Contentful API keys
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

## 🔧 Contentful Setup

1. **Create a Contentful space**
2. **Add content types**:
   - `blogPost` - Title, slug, content, featured image, author, publish date, tags
   - `page` - Title, slug, content
3. **Add your API keys** to `.env`:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
   CONTENTFUL_ENVIRONMENT=master
   ```

## ☁️ Cloudflare Pages Deployment

This template is specifically designed for Cloudflare Pages:

- **No Node.js SDK** - Uses native `fetch()` API
- **Build-time Content** - All Contentful data fetched during build
- **Static Output** - Generates static HTML files
- **CDN Images** - Images served directly from Contentful's CDN
- **Environment Variables** - Configure in Cloudflare Pages dashboard

### Deployment Steps

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
3. **Add environment variables** in Cloudflare Pages dashboard:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_DELIVERY_TOKEN`
   - `CONTENTFUL_ENVIRONMENT`

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── layouts/        # Page layouts
├── lib/           # Contentful client & helpers
├── pages/         # Astro pages
├── types/         # TypeScript types
└── styles/        # Global styles
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript types

## 🎨 Customization

- **Colors**: Update `tailwind.config.cjs`
- **Content**: Modify Contentful content types
- **Layout**: Edit `src/layouts/Base.astro`
- **Styling**: Customize `src/styles/global.css`

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Contentful Documentation](https://www.contentful.com/developers/)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT License - feel free to use this template for your projects!
