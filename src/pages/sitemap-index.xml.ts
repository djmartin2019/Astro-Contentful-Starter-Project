import { getBlogPosts } from '../lib/contentful';

export async function GET() {
  const baseUrl = 'https://your-domain.com'; // Replace with your actual domain
  
  try {
    // Get all blog posts for the sitemap
    const postsResponse = await getBlogPosts({ limit: 1000 });
    const posts = (postsResponse.items || [])
      .filter((post: any) => post?.sys?.type === 'Entry' && post?.fields && post.fields.title && post.fields.slug);

    // Static pages
    const staticPages = [
      { url: '', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    ];

    // Blog post pages
    const blogPages = posts.map((post: any) => ({
      url: `/blog/${post.fields.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: post.fields.publishDate || post.sys.updatedAt,
    }));

    const allPages = [...staticPages, ...blogPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod ? new Date(page.lastmod).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
