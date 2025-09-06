// scripts/contentful-seed.mjs
import "dotenv/config";
import contentful from "contentful-management";

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT = "master",
  CONTENTFUL_MANAGEMENT_TOKEN,
} = process.env;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error("Missing Contentful env vars (SPACE_ID / MANAGEMENT_TOKEN).");
  process.exit(1);
}

const client = contentful.createClient({
  accessToken: CONTENTFUL_MANAGEMENT_TOKEN,
});

async function ensureAsset(env, assetId, imageUrl, title) {
  try {
    const existing = await env.getAsset(assetId);
    console.log(`Asset ${assetId} already exists:`, existing.sys.id);
    return existing;
  } catch {
    console.log(`Creating asset ${assetId}...`);
    const asset = await env.createAssetWithId(assetId, {
      fields: {
        title: { "en-US": title },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: `${assetId}.jpg`,
            upload: imageUrl,
          },
        },
      },
    });
    const processed = await asset.processForAllLocales();
    const published = await processed.publish();
    console.log(`Asset ${assetId} created and published:`, published.sys.id);
    return published;
  }
}

async function createIfMissing(env, ctId, slug, fields) {
  const existing = await env.getEntries({
    content_type: ctId,
    "fields.slug": slug,
    limit: 1,
  });
  if (existing.items.length) return existing.items[0];
  const entry = await env.createEntry(ctId, { fields });
  return entry.publish();
}

(async () => {
  const space = await client.getSpace(CONTENTFUL_SPACE_ID);
  const env = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  // Create multiple assets for different blog posts
  const astroImage = await ensureAsset(
    env,
    "astro-hero",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    "Astro Framework Hero Image"
  );
  const contentfulImage = await ensureAsset(
    env,
    "contentful-hero",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    "Contentful CMS Hero Image"
  );
  const performanceImage = await ensureAsset(
    env,
    "performance-hero",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    "Web Performance Hero Image"
  );
  const headlessImage = await ensureAsset(
    env,
    "headless-hero",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    "Headless CMS Hero Image"
  );
  const cloudflareImage = await ensureAsset(
    env,
    "cloudflare-hero",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    "Cloudflare Pages Hero Image"
  );

  // Page
  await createIfMissing(env, "page", "home", {
    title: { "en-US": "Welcome to Astro + Contentful" },
    slug: { "en-US": "home" },
    content: {
      "en-US":
        "A modern, fast website built with Astro and powered by Contentful CMS. This starter template demonstrates the power of static site generation combined with headless content management.",
    },
  });

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const threeWeeksAgo = new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Blog post 1: Getting Started with Astro
  await createIfMissing(env, "blogPost", "getting-started-with-astro", {
    title: {
      "en-US": "Getting Started with Astro: A Modern Static Site Generator",
    },
    slug: { "en-US": "getting-started-with-astro" },
    excerpt: {
      "en-US":
        "Learn how Astro revolutionizes static site generation with its unique approach to building fast, content-focused websites.",
    },
    content: {
      "en-US": `Astro is a modern static site generator that's changing how we think about web performance. Unlike traditional frameworks, Astro ships zero JavaScript by default, only adding interactivity where you need it.

## What Makes Astro Special?

Astro's key innovation is its "islands architecture" - a pattern that allows you to build interactive components that hydrate independently. This means your pages load incredibly fast because most of your content is static HTML.

### Key Features:

- **Zero JavaScript by default** - Only add interactivity where needed
- **Framework agnostic** - Use React, Vue, Svelte, or plain HTML
- **Built-in optimizations** - Automatic image optimization, CSS bundling, and more
- **Content-focused** - Perfect for blogs, documentation, and marketing sites

## Getting Started

To create a new Astro project, simply run:

\`\`\`bash
npm create astro@latest
\`\`\`

This will scaffold a new project with all the necessary files and dependencies. From there, you can start building your static site with modern tooling and excellent developer experience.

Astro is particularly well-suited for content-driven websites where performance is critical. Its build-time rendering ensures your users get the fastest possible experience.`,
    },
    author: { "en-US": "David Martin" },
    publishDate: { "en-US": oneWeekAgo.toISOString() },
    tags: {
      "en-US": ["astro", "static-site-generator", "performance", "tutorial"],
    },
    featuredImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: astroImage.sys.id },
      },
    },
  });

  // Blog post 2: Contentful CMS Guide
  await createIfMissing(env, "blogPost", "contentful-cms-guide", {
    title: {
      "en-US":
        "Contentful CMS: The Complete Guide to Headless Content Management",
    },
    slug: { "en-US": "contentful-cms-guide" },
    excerpt: {
      "en-US":
        "Discover how Contentful transforms content management with its API-first approach and powerful content modeling capabilities.",
    },
    content: {
      "en-US": `Contentful is a headless content management system that's revolutionizing how teams create, manage, and deliver content across multiple channels. Unlike traditional CMSs, Contentful separates content from presentation, giving you unprecedented flexibility.

## Why Choose Headless?

Traditional CMSs tightly couple content with presentation, making it difficult to deliver content to multiple channels. Contentful's headless approach solves this by providing content through APIs that can be consumed by any application.

### Key Benefits:

- **Multi-channel publishing** - Deliver content to web, mobile, IoT, and more
- **Developer-friendly** - REST and GraphQL APIs with excellent documentation
- **Content modeling** - Define your content structure with custom content types
- **Rich media handling** - Automatic image optimization and CDN delivery
- **Collaboration tools** - Built-in workflows and content preview

## Content Modeling Best Practices

When setting up your content model in Contentful, consider these best practices:

1. **Start simple** - Begin with basic content types and iterate
2. **Use references** - Link related content for better organization
3. **Plan for localization** - Design with multiple languages in mind
4. **Version your content** - Use Contentful's built-in versioning system

## API Integration

Contentful provides powerful APIs for fetching content:

\`\`\`javascript
// Fetch all blog posts
const response = await fetch(\`https://cdn.contentful.com/spaces/\${SPACE_ID}/entries?content_type=blogPost&access_token=\${ACCESS_TOKEN}\`);
const data = await response.json();
\`\`\`

This makes it easy to integrate with any frontend framework, including Astro, React, Vue, or even static site generators.`,
    },
    author: { "en-US": "David Martin" },
    publishDate: { "en-US": twoWeeksAgo.toISOString() },
    tags: {
      "en-US": ["contentful", "headless-cms", "content-management", "api"],
    },
    featuredImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: contentfulImage.sys.id },
      },
    },
  });

  // Blog post 3: Astro + Contentful Integration
  await createIfMissing(env, "blogPost", "astro-contentful-integration", {
    title: {
      "en-US": "Building Lightning-Fast Sites with Astro and Contentful",
    },
    slug: { "en-US": "astro-contentful-integration" },
    excerpt: {
      "en-US":
        "Learn how to combine Astro's performance with Contentful's content management for the ultimate developer experience.",
    },
    content: {
      "en-US": `The combination of Astro and Contentful creates a powerful stack for building content-driven websites that are both fast and easy to manage. This integration leverages the best of both worlds: Astro's performance and Contentful's content management capabilities.

## Why This Stack Works

Astro and Contentful are a perfect match because:

- **Build-time content fetching** - Content is fetched during build, not at runtime
- **Static output** - All pages are pre-rendered as static HTML
- **CDN optimization** - Images and assets are served from Contentful's global CDN
- **Developer experience** - TypeScript support and excellent tooling

## Setting Up the Integration

Here's how to get started with Astro and Contentful:

### 1. Install Dependencies

\`\`\`bash
npm install @contentful/rich-text-react-renderer
\`\`\`

### 2. Configure Environment Variables

\`\`\`env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_DELIVERY_TOKEN=your_delivery_token
CONTENTFUL_ENVIRONMENT=master
\`\`\`

### 3. Create Contentful Client

\`\`\`javascript
// src/lib/contentful.js
export async function getBlogPosts() {
  const response = await fetch(\`https://cdn.contentful.com/spaces/\${SPACE_ID}/entries?content_type=blogPost&access_token=\${ACCESS_TOKEN}\`);
  return response.json();
}
\`\`\`

### 4. Fetch Content in Astro

\`\`\`astro
---
import { getBlogPosts } from '../lib/contentful';
const posts = await getBlogPosts();
---

{posts.items.map(post => (
  <article>
    <h2>{post.fields.title}</h2>
    <p>{post.fields.excerpt}</p>
  </article>
))}
\`\`\`

## Performance Benefits

This combination delivers exceptional performance:

- **Lighthouse scores** - Consistently 90+ across all metrics
- **Core Web Vitals** - Excellent LCP, FID, and CLS scores
- **SEO optimization** - Pre-rendered HTML with proper meta tags
- **Global delivery** - Content served from the nearest CDN edge

The result is a website that loads instantly and provides an excellent user experience across all devices and network conditions.`,
    },
    author: { "en-US": "David Martin" },
    publishDate: { "en-US": threeWeeksAgo.toISOString() },
    tags: {
      "en-US": [
        "astro",
        "contentful",
        "integration",
        "performance",
        "tutorial",
      ],
    },
    featuredImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: performanceImage.sys.id },
      },
    },
  });

  // Blog post 4: Headless CMS Benefits
  await createIfMissing(env, "blogPost", "headless-cms-benefits", {
    title: { "en-US": "Why Headless CMS is the Future of Content Management" },
    slug: { "en-US": "headless-cms-benefits" },
    excerpt: {
      "en-US":
        "Explore the advantages of headless CMS architecture and how it's transforming content delivery across platforms.",
    },
    content: {
      "en-US": `Headless CMS architecture is revolutionizing how organizations manage and deliver content. By decoupling content management from content presentation, headless CMSs provide unprecedented flexibility and scalability.

## What is Headless CMS?

A headless CMS is a content management system that provides content through APIs without a built-in frontend. This separation allows developers to use any technology stack for the presentation layer while maintaining centralized content management.

### Key Characteristics:

- **API-first architecture** - Content delivered via REST or GraphQL APIs
- **Frontend agnostic** - Works with any framework or platform
- **Multi-channel publishing** - Single source of truth for all channels
- **Developer-friendly** - Modern tooling and excellent documentation

## Benefits of Going Headless

### 1. Flexibility and Freedom

With a headless CMS, you're not locked into a specific frontend technology. You can:
- Use any framework (React, Vue, Angular, Astro)
- Deploy to any platform (Vercel, Netlify, Cloudflare Pages)
- Customize the user experience completely

### 2. Performance Optimization

Headless CMSs enable better performance through:
- Static site generation
- CDN distribution
- Optimized API responses
- Reduced server-side processing

### 3. Scalability

As your content needs grow, headless CMSs scale better:
- Handle traffic spikes with CDN caching
- Support multiple applications from one content source
- Scale development teams independently

### 4. Future-Proofing

Technology changes rapidly, but your content doesn't have to:
- Migrate frontend without touching content
- Add new channels without rebuilding CMS
- Adopt new technologies as they emerge

## Popular Headless CMS Options

- **Contentful** - Enterprise-grade with excellent developer experience
- **Strapi** - Open-source with self-hosting options
- **Sanity** - Real-time collaboration and powerful querying
- **Ghost** - Focused on publishing and newsletters
- **Forestry** - Git-based with JAMstack focus

## Getting Started

To implement a headless CMS:

1. **Choose your CMS** - Consider your team's needs and technical requirements
2. **Design content models** - Plan your content structure and relationships
3. **Set up APIs** - Configure content delivery and management APIs
4. **Build your frontend** - Create your presentation layer
5. **Deploy and iterate** - Launch and continuously improve

The headless approach provides the foundation for modern, scalable content delivery that can adapt to changing requirements and technologies.`,
    },
    author: { "en-US": "David Martin" },
    publishDate: { "en-US": oneMonthAgo.toISOString() },
    tags: {
      "en-US": [
        "headless-cms",
        "content-management",
        "architecture",
        "future-of-web",
      ],
    },
    featuredImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: headlessImage.sys.id },
      },
    },
  });

  // Blog post 5: Cloudflare Pages Deployment
  await createIfMissing(env, "blogPost", "cloudflare-pages-deployment", {
    title: { "en-US": "Deploying Astro + Contentful to Cloudflare Pages" },
    slug: { "en-US": "cloudflare-pages-deployment" },
    excerpt: {
      "en-US":
        "Step-by-step guide to deploying your Astro and Contentful site to Cloudflare Pages for maximum performance and global reach.",
    },
    content: {
      "en-US": `Cloudflare Pages is an ideal platform for hosting Astro + Contentful websites. With its global CDN, edge computing capabilities, and seamless integration with modern development workflows, it provides the perfect environment for static sites.

## Why Cloudflare Pages?

Cloudflare Pages offers several advantages for static site hosting:

- **Global CDN** - Content served from 200+ locations worldwide
- **Automatic HTTPS** - SSL certificates managed automatically
- **Git integration** - Deploy directly from your repository
- **Preview deployments** - Test changes before going live
- **Edge functions** - Serverless functions at the edge
- **Free tier** - Generous limits for personal and small projects

## Prerequisites

Before deploying, ensure you have:

- Astro project with Contentful integration
- Git repository (GitHub, GitLab, or Bitbucket)
- Cloudflare account
- Contentful space with content

## Deployment Steps

### 1. Prepare Your Project

Make sure your project builds successfully:

\`\`\`bash
npm run build
\`\`\`

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Pages dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: \`npm run build\`
   - **Build output directory**: \`dist\`
   - **Root directory**: \`/\` (or your project root)

### 3. Set Environment Variables

Add your Contentful credentials in the Pages dashboard:

- \`CONTENTFUL_SPACE_ID\`
- \`CONTENTFUL_DELIVERY_TOKEN\`
- \`CONTENTFUL_ENVIRONMENT\` (optional, defaults to "master")

### 4. Deploy

Click "Save and Deploy" to start your first deployment. Cloudflare Pages will:

1. Clone your repository
2. Install dependencies
3. Run the build command
4. Deploy the static files to the CDN

## Optimizing for Cloudflare Pages

### 1. Use Cloudflare Images

For better image optimization:

\`\`\`javascript
// Use Cloudflare Images for automatic optimization
const imageUrl = \`https://imagedelivery.net/\${ACCOUNT_HASH}/\${IMAGE_ID}/w=800,h=600\`;
\`\`\`

### 2. Leverage Edge Functions

Add serverless functions for dynamic content:

\`\`\`javascript
// functions/api/contact.js
export async function onRequest(context) {
  // Handle form submissions at the edge
  return new Response(JSON.stringify({ success: true }));
}
\`\`\`

### 3. Configure Caching

Set appropriate cache headers:

\`\`\`javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  })
});
\`\`\`

## Monitoring and Analytics

Cloudflare Pages provides built-in analytics:

- **Page views** - Track visitor traffic
- **Core Web Vitals** - Monitor performance metrics
- **Error rates** - Identify and fix issues
- **Bandwidth usage** - Monitor resource consumption

## Best Practices

1. **Use preview deployments** - Test changes before production
2. **Monitor performance** - Keep an eye on Core Web Vitals
3. **Optimize images** - Use Cloudflare Images for automatic optimization
4. **Set up monitoring** - Configure alerts for build failures
5. **Version your content** - Use Contentful's preview API for staging

With Cloudflare Pages, your Astro + Contentful site will be fast, reliable, and globally distributed, providing an excellent experience for users worldwide.`,
    },
    author: { "en-US": "David Martin" },
    publishDate: { "en-US": oneWeekAgo.toISOString() },
    tags: {
      "en-US": [
        "cloudflare-pages",
        "deployment",
        "hosting",
        "performance",
        "tutorial",
      ],
    },
    featuredImage: {
      "en-US": {
        sys: { type: "Link", linkType: "Asset", id: cloudflareImage.sys.id },
      },
    },
  });

  console.log(
    "✅ Seed complete. You have a page + 5 comprehensive blog posts + 5 assets."
  );
})();
