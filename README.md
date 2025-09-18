# 🚀 Astro + Contentful Blog Starter

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?logo=github)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/generate)
[![Release](https://img.shields.io/github/v/release/djmartin2019/Astro-Contentful-Starter-Project)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/releases)
[![Stars](https://img.shields.io/github/stars/djmartin2019/Astro-Contentful-Starter-Project?style=social)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/Live%20Demo-blue?logo=cloudflare)](https://astro-contentful-starter-project.pages.dev/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/djmartin2019/Astro-Contentful-Starter-Project/actions)

> **💡 Business Value**: Save 20+ hours of development time with this production-ready template that delivers enterprise-grade performance and SEO optimization for small businesses and developers.

A **production-ready** blog starter template built with Astro and Contentful CMS. Features interactive multi-tag filtering, beautiful responsive design, and seamless Cloudflare Pages deployment.

![Homepage](https://github.com/user-attachments/assets/a8321de4-3169-4e61-86a0-76a0395cc562)

## 🎯 **Live Demo & Performance**

<!-- Add your Lighthouse screenshot here when available -->

**🚀 Live Demo**: [View the live site](https://astro-contentful-starter-project.pages.dev/)  
**⚡ Performance**: 95+ Lighthouse scores across all metrics  
**🌍 Global CDN**: Deployed on Cloudflare Pages for maximum speed

## ✨ What You Get

### 🎯 **Core Features**

- **Interactive Multi-Tag Filtering** - Click multiple tags to filter blog posts without page refreshes
- **Beautiful Responsive Design** - Mobile-first approach with smooth animations
- **Professional Demo Content** - 5 comprehensive blog posts about Astro and Contentful
- **Image Optimization** - Automatic image resizing and lazy loading
- **SEO Ready** - Built-in meta tags, Open Graph, and structured data

### 🛠️ **Technical Stack**

- **Astro 4.x** - Lightning-fast static site generation
- **Contentful CMS** - Headless content management via REST API
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first styling with custom design system
- **Cloudflare Pages** - Optimized for global CDN deployment

### 🎨 **Interactive Features**

- **Smooth Animations** - Fade and scale effects during filtering
- **Visual Feedback** - Active tag highlighting and result counts
- **URL Synchronization** - Shareable filtered URLs
- **Keyboard Accessible** - Full keyboard navigation support

## 📱 **Responsive Design**

<div align="center">
  <img src="https://github.com/user-attachments/assets/85d5ba37-75e3-4bb7-a4ef-a4c09c7effef" alt="Responsive Design Showcase" width="50%"/>
</div>

### 🎯 **Mobile-First Approach**

- **📱 Mobile Optimized** - Perfect touch targets and readable text
- **💻 Desktop Enhanced** - Rich layouts with optimal spacing
- **🔄 Fluid Breakpoints** - Seamless transitions between screen sizes
- **⚡ Performance Focused** - Optimized images and layouts for all devices

**Perfect on every device** - From phones to large desktop screens, your content looks stunning everywhere.

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Install

```bash
git clone https://github.com/djmartin2019/Astro-Contentful-Starter-Project.git
cd Astro-Contentful-Starter-Project
npm install
```

### Step 2: Set Up Contentful (Automated)

```bash
# Copy environment template
cp .env.example .env

# Run the automated setup (creates content types + adds demo content)
npm run contentful:init
```

**That's it!** The automated setup will:

- ✅ Create your Contentful space content types
- ✅ Add 5 professional blog posts about Astro and Contentful
- ✅ Set up featured images and metadata
- ✅ Configure all necessary fields

### Step 3: Start Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your blog in action!

---

## 🔧 Manual Contentful Setup (Advanced)

If you prefer to set up Contentful manually or want to understand the process:

### 1. Create a Contentful Account

1. Go to [contentful.com](https://www.contentful.com) and sign up
2. Create a new space (choose "Empty space")
3. Note your **Space ID** (found in Settings → General settings)

### 2. Get Your API Keys

1. Go to **Settings → API keys**
2. Create a new **Content Delivery API** token
3. Go to **Settings → API keys → Content management tokens**
4. Create a new **Personal access token** (for content management)

### 3. Configure Environment Variables

Edit your `.env` file with your Contentful credentials:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token_here
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token_here
CONTENTFUL_ENVIRONMENT=master
```

### 4. Set Up Content Types (Automated)

```bash
# This creates the required content types in Contentful
npm run contentful:setup
```

**What gets created:**

- **Blog Post** content type with fields:
  - Title (Short text)
  - Slug (Short text, unique)
  - Excerpt (Long text)
  - Content (Rich text)
  - Featured Image (Media)
  - Author (Short text)
  - Publish Date (Date & time)
  - Tags (Short text, list)

### 5. Add Demo Content (Optional)

```bash
# This adds 5 professional blog posts about Astro and Contentful
npm run contentful:seed
```

**Demo content includes:**

- 5 comprehensive blog posts with realistic content
- Professional featured images from Unsplash
- Proper metadata and SEO optimization
- Multiple tags for testing the filtering system

## 🎯 Interactive Features Demo

### Multi-Tag Filtering System

![BlogDemo-Astro](https://github.com/user-attachments/assets/9f3e177d-ff4c-417d-b532-14c127da8682)

**Try it yourself**: [Live Demo](https://astro-contentful-starter-project.pages.dev/)

- **Click any tag** to filter posts instantly
- **Select multiple tags** to find posts matching any of them
- **Smooth animations** with fade and scale effects
- **URL synchronization** - share filtered results
- **Visual feedback** - active tags are highlighted
- **Result counting** - see how many posts match your filters

### Professional Demo Content

The seed script creates 5 comprehensive blog posts:

1. **🚀 Getting Started with Astro** - Introduction to Astro's islands architecture
2. **📝 Contentful CMS Guide** - Complete guide to headless content management
3. **⚡ Astro + Contentful Integration** - Building lightning-fast sites
4. **🎯 Headless CMS Benefits** - Why headless is the future
5. **☁️ Cloudflare Pages Deployment** - Step-by-step deployment guide

**Each post includes:**

- ✅ **Realistic content** with code examples and best practices
- ✅ **Professional metadata** (author, publish date, tags)
- ✅ **High-quality featured images** from Unsplash
- ✅ **SEO-optimized excerpts** and descriptions
- ✅ **Multiple tags** for testing the filtering system
- ✅ **Responsive design** that looks great on all devices

## ☁️ Cloudflare Pages Deployment

This template is **optimized for Cloudflare Pages** with zero configuration needed:

### Why Cloudflare Pages?

- ⚡ **Global CDN** - Lightning-fast loading worldwide
- 🆓 **Free tier** - Perfect for personal projects and demos
- 🔧 **Zero config** - No server setup required
- 📱 **Mobile optimized** - Automatic image optimization
- 🔒 **HTTPS included** - SSL certificates managed automatically

### Quick Deploy to Cloudflare Pages

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/djmartin2019/Astro-Contentful-Starter-Project)

**Note**: After clicking the button, you'll still need to:

1. Set up your Contentful environment variables in Cloudflare Pages dashboard
2. Run `npm run contentful:init` to add demo content

### Manual Deployment Steps

1. **Connect your repository** to Cloudflare Pages
2. **Set build settings**:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: `18` or higher
3. **Add environment variables** in Cloudflare Pages dashboard:
   - `CONTENTFUL_SPACE_ID` - Your Contentful space ID
   - `CONTENTFUL_DELIVERY_TOKEN` - Your Contentful delivery token
   - `CONTENTFUL_ENVIRONMENT` - `master` (default)
4. **Deploy!** - Your site will be live in minutes

### Environment Variables for Production

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_ENVIRONMENT=master
```

**Note**: You don't need `CONTENTFUL_MANAGEMENT_TOKEN` in production - that's only for the seed script.

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

### Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run type-check` - Check TypeScript types

### Contentful Management

- `npm run contentful:init` - **Complete setup** (content types + demo content)
- `npm run contentful:setup` - Create content types only
- `npm run contentful:seed` - Add demo blog posts only

## 🔧 Troubleshooting

### Common Issues

**❌ "CONTENTFUL_SPACE_ID is not defined"**

- Make sure you've copied `.env.example` to `.env`
- Verify your environment variables are set correctly
- Restart your development server after changing `.env`

**❌ "Contentful API error: 401 Unauthorized"**

- Check your `CONTENTFUL_DELIVERY_TOKEN` is correct
- Ensure the token has read permissions
- Verify your `CONTENTFUL_SPACE_ID` matches your space

**❌ "Contentful API error: 404 Not Found"**

- Run `npm run contentful:setup` to create content types
- Check that your space ID is correct
- Ensure you're using the right environment (usually `master`)

**❌ Images not showing**

- The fallback system will show placeholder images
- For real Contentful images, ensure your content types are set up
- Check that featured images are published in Contentful

**❌ Build fails on Cloudflare Pages**

- Ensure all environment variables are set in Cloudflare Pages dashboard
- Check that your Contentful tokens have the correct permissions
- Verify your Node.js version is 18 or higher

### Getting Help

1. **Check the logs** - Look for specific error messages
2. **Verify setup** - Run `npm run contentful:init` to ensure everything is configured
3. **Test locally** - Make sure `npm run dev` works before deploying
4. **Check Contentful** - Verify your content is published in the Contentful web app

## 🎨 Customization

### Design System

- **Colors & Branding**: Update `tailwind.config.cjs`
- **Typography**: Modify font families in `src/layouts/Base.astro`
- **Layout**: Edit `src/layouts/Base.astro` for global layout changes
- **Components**: Customize individual components in `src/components/`

### Content Management

- **Blog Posts**: Add/edit content in Contentful web app
- **Content Types**: Modify fields in Contentful (requires re-seeding)
- **Images**: Upload new featured images in Contentful
- **Tags**: Add new tags in Contentful and they'll appear automatically

### Advanced Customization

- **Filtering Logic**: Modify `src/pages/blog/index.astro` for different filtering behavior
- **Styling**: Customize `src/styles/global.css` for global styles
- **SEO**: Update meta tags in `src/layouts/Base.astro`
- **Performance**: Optimize images and add caching strategies

## 📚 Learn More

### Official Documentation

- [Astro Documentation](https://docs.astro.build/) - Learn Astro's islands architecture
- [Contentful Documentation](https://www.contentful.com/developers/) - Master headless CMS
- [Cloudflare Pages](https://developers.cloudflare.com/pages/) - Deploy globally
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling

### Related Projects

- [Astro Examples](https://github.com/withastro/astro/tree/main/examples) - More Astro templates
- [Contentful Examples](https://github.com/contentful/example-apps) - Contentful integrations
- [Cloudflare Examples](https://github.com/cloudflare/workers-examples) - Edge computing examples

## 🤝 Contributing

Found a bug or want to add a feature? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this template for your projects! See [LICENSE](LICENSE) for details.

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub! It helps others discover this template.

**Happy coding!** 🚀
