// SEO utility functions

export interface ReadingStats {
  wordCount: number;
  readingTime: number;
}

/**
 * Calculate reading time and word count from text content
 */
export function calculateReadingStats(content: string): ReadingStats {
  // Remove HTML tags and extra whitespace
  const cleanText = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  // Count words (split by whitespace and filter empty strings)
  const words = cleanText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  return { wordCount, readingTime };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData(domain: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company",
    "url": domain,
    "logo": `${domain}/favicon.svg`,
    "sameAs": [
      "https://github.com/djmartin2019",
      "https://x.com/djmartin2019"
    ]
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate article structured data
 */
export function generateArticleStructuredData(article: {
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  tags?: string[];
  wordCount?: number;
  readingTime?: number;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "url": article.url,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Your Company",
      "logo": {
        "@type": "ImageObject",
        "url": article.url.replace(/\/[^\/]*$/, '/favicon.svg')
      }
    },
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    },
    "keywords": article.tags?.join(", "),
    "articleSection": article.category,
    "wordCount": article.wordCount,
    "timeRequired": article.readingTime ? `PT${article.readingTime}M` : undefined,
    "genre": "Technology",
    "about": article.tags?.map(tag => ({
      "@type": "Thing",
      "name": tag
    }))
  };
}
