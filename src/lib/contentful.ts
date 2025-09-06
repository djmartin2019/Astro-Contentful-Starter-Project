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
    if (!response.ok)
      throw new Error(
        `Contentful API error: ${response.status} ${response.statusText}`
      );

    const json = await response.json();

    // 🧹 sanitize: keep only Entries that have fields
    const items = Array.isArray(json.items)
      ? json.items.filter((it: any) => it?.sys?.type === "Entry" && it?.fields)
      : [];

    return {
      ...json,
      items, // cleaned items
      includes: json.includes || {}, // always an object
    };
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return { items: [], total: 0, skip: 0, limit: 0, includes: {} };
  }
}

export function resolveAsset(link: any, includes: any) {
  if (!link || link.sys?.type === "Asset") return link; // already resolved
  if (link?.sys?.linkType !== "Asset") return null;
  const id = link.sys.id;
  return includes?.Asset?.find((a: any) => a?.sys?.id === id) ?? null;
}

// Fetch a specific asset by ID using direct API call
export async function getAsset(assetId: string) {
  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/assets/${assetId}?access_token=${CONTENTFUL_ACCESS_TOKEN}`
    );
    if (!response.ok) {
      console.error(
        "Asset fetch failed:",
        response.status,
        response.statusText
      );
      return null;
    }
    const data = await response.json();
    console.log("Asset data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching asset:", error);
    return null;
  }
}

// Create a simple asset object from asset ID
export function createAssetFromId(assetId: string) {
  return {
    sys: {
      id: assetId,
      type: "Asset",
    },
    fields: {
      title: `${assetId} Image`,
      file: {
        url: `//images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}/placeholder.jpg`,
        details: {
          size: 0,
          image: {
            width: 1200,
            height: 600,
          },
        },
        fileName: `${assetId}.jpg`,
        contentType: "image/jpeg",
      },
    },
  };
}

// Create a simple image URL from asset ID
export function createImageUrl(
  assetId: string,
  width?: number,
  height?: number
) {
  let url = `https://images.ctfassets.net/${CONTENTFUL_SPACE_ID}/${assetId}/placeholder.jpg`;

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

// getBlogPosts
export async function getBlogPosts(params: QueryParams = {}) {
  const query: any = {
    content_type: "blogPost",
    order: params.order || ["-fields.publishDate"],
    limit: params.limit || 100,
    skip: params.skip || 0,
    include: 10, // Increased to include all referenced assets
  };
  if (params["fields.tags[in]"])
    query["fields.tags[in]"] = params["fields.tags[in]"];
  return cfQuery(query);
}

// getBlogPostBySlug
export async function getBlogPostBySlug(slug: string) {
  const response = await cfQuery({
    content_type: "blogPost",
    "fields.slug": slug,
    limit: 1,
    include: 1,
  });
  return response.items?.[0] ?? null;
}

// getRecentBlogPosts
export async function getRecentBlogPosts(limit = 5) {
  return cfQuery({
    content_type: "blogPost",
    order: ["-fields.publishDate"],
    limit,
    include: 1,
  });
}

export async function getPages(params: QueryParams = {}) {
  return cfQuery({
    content_type: "page",
    order: params.order || ["fields.title"],
    limit: params.limit || 100,
    skip: params.skip || 0,
    include: 1, // consistency
  });
}

export async function getPageBySlug(slug: string) {
  const response = await cfQuery({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
    include: 1,
  });
  return response.items?.[0] ?? null;
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
