# Astro + Contentful Starter Repo

A lean starter template for building fast, content-driven websites with Astro and Contentful CMS.

## ✨ Features

- **Astro 4.x** - Static site generation
- **Contentful CMS** - Headless content management
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach
- **SEO Ready** - Built-in meta tags and Open Graph

## 🚀 Quick Start

1. **Clone and install**

   ```bash
   git clone <your-repo>
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
3. **Add your API keys** to `.env`

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
- `npm run lint` - Run ESLint

## 🎨 Customization

- **Colors**: Update `tailwind.config.cjs`
- **Content**: Modify Contentful content types
- **Layout**: Edit `src/layouts/Base.astro`
- **Styling**: Customize `src/styles/global.css`

## 💡 What's Included

This template is **lean and focused** - no bloat, just the essentials:

- ✅ Working development server
- ✅ Production build process
- ✅ Responsive design with Tailwind
- ✅ TypeScript support
- ✅ Contentful integration (when configured)
- ✅ SEO components
- ✅ Clean, maintainable code

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Contentful Documentation](https://www.contentful.com/developers/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

MIT License - feel free to use this template for your projects!
