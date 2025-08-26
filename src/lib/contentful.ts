/**
 * Cloudflare-compatible Contentful Client and Helpers
 * Uses fetch instead of Node SDK for Cloudflare Pages compatibility
 */

// Types for Contentful content
export interface BlogPost {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: any;
    featuredImage?: any;
    author?: string;
    publishDate: string;
    tags?: string[];
  };
}

export interface Page {
  sys: { id: string };
  fields: {
    title: string;
    slug: string;
    content: any;
  };
}

// Query parameters interface
export interface QueryParams {
  limit?: number;
  skip?: number;
  "fields.tags[in]"?: string | undefined;
  order?: string[];
}

// Environment variables for Cloudflare Pages
const getEnvVars = () => ({
  CONTENTFUL_SPACE_ID: import.meta.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_DELIVERY_TOKEN: import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_ENVIRONMENT: import.meta.env.CONTENTFUL_ENVIRONMENT || "master",
});

// Generic query function using fetch
async function cfQuery(query: any): Promise<any> {
  const env = getEnvVars();
  const spaceId = env.CONTENTFUL_SPACE_ID;
  const accessToken = env.CONTENTFUL_DELIVERY_TOKEN;
  const environment = env.CONTENTFUL_ENVIRONMENT;

  if (!spaceId || !accessToken) {
    console.warn("Contentful environment variables not configured");
    return { items: [], total: 0, skip: 0, limit: 0 };
  }

  // Build query parameters
  const params = new URLSearchParams();
  params.append("access_token", accessToken);
  params.append("content_type", query.content_type);

  if (query.locale) params.append("locale", query.locale);
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.skip) params.append("skip", query.skip.toString());
  if (query.include) params.append("include", query.include.toString());
  if (query.order) {
    if (Array.isArray(query.order)) {
      query.order.forEach((order: string) => params.append("order", order));
    } else {
      params.append("order", query.order);
    }
  }

  // Add any additional query parameters
  Object.entries(query).forEach(([key, value]) => {
    if (
      !["content_type", "locale", "limit", "skip", "include", "order"].includes(
        key
      )
    ) {
      params.append(key, String(value));
    }
  });

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}/entries?${params.toString()}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Contentful API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return { items: [], total: 0, skip: 0, limit: 0 };
  }
}

// Fetch all blog posts
export async function getBlogPosts(params: QueryParams = {}) {
  const query: any = {
    content_type: "blogPost",
    order: params.order || ["-fields.publishDate"],
    limit: params.limit || 100,
    skip: params.skip || 0,
  };

  if (params["fields.tags[in]"]) {
    query["fields.tags[in]"] = params["fields.tags[in]"];
  }

  return cfQuery(query);
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  const response = await cfQuery({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] || null;
}

// Fetch recent blog posts
export async function getRecentBlogPosts(limit = 5) {
  return cfQuery({
    content_type: "blogPost",
    order: ["-fields.publishDate"],
    limit,
  });
}

// Fetch all pages
export async function getPages(params: QueryParams = {}) {
  return cfQuery({
    content_type: "page",
    order: params.order || ["fields.title"],
    limit: params.limit || 100,
    skip: params.skip || 0,
  });
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  const response = await cfQuery({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
  });

  return response.items[0] || null;
}

// Utility functions
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAssetUrl(asset: any, width?: number, height?: number) {
  if (!asset?.fields?.file?.url) {
    return "";
  }

  let url = `https:${asset.fields.file.url}`;

  if (width || height) {
    url += "?";
    const params = new URLSearchParams();

    if (width) params.append("w", width.toString());
    if (height) params.append("h", height.toString());
    if (width || height) params.append("fit", "thumb");

    url += params.toString();
  }

  return url;
}
