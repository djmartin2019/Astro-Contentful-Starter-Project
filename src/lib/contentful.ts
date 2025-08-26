/**
 * Contentful Client and Helpers
 */

import pkg from "contentful";
const { createClient } = pkg;

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

// Lazy client creation to avoid build-time errors
let _contentfulClient: any = null;

function getContentfulClient() {
  if (!_contentfulClient) {
    const spaceId = import.meta.env.CONTENTFUL_SPACE_ID;
    const accessToken = import.meta.env.CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId || !accessToken) {
      throw new Error("Contentful environment variables not configured");
    }

    _contentfulClient = createClient({
      space: spaceId,
      accessToken: accessToken,
      environment: import.meta.env.CONTENTFUL_ENVIRONMENT || "master",
    });
  }
  return _contentfulClient;
}

// Fetch all blog posts
export async function getBlogPosts() {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      limit: 100,
    });
    return response;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { items: [], total: 0 };
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching blog post: ${slug}`, error);
    return null;
  }
}

// Fetch recent blog posts
export async function getRecentBlogPosts(limit = 5) {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.publishDate"],
      limit,
    });
    return response;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return { items: [], total: 0 };
  }
}

// Fetch all pages
export async function getPages() {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      content_type: "page",
      order: ["fields.title"],
      limit: 100,
    });
    return response;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return { items: [], total: 0 };
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  try {
    const client = getContentfulClient();
    const response = await client.getEntries({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
    });
    return response.items[0] || null;
  } catch (error) {
    console.error(`Error fetching page: ${slug}`, error);
    return null;
  }
}

// Utility functions
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAssetUrl(asset: any) {
  return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : "";
}
