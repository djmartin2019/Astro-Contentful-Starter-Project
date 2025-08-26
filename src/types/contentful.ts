/**
 * Essential Contentful Types
 */

// Basic content types
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

// Collection types
export interface ContentfulCollection<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export type BlogPostCollection = ContentfulCollection<BlogPost>;
export type PageCollection = ContentfulCollection<Page>;
