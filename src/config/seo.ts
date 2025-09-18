// SEO Configuration

export const seoConfig = {
  site: {
    name: 'Your Company',
    description: 'A modern website built with Astro and Contentful CMS. Fast, flexible, and content-driven.',
    url: 'https://your-domain.com', // Replace with your actual domain
    image: '/favicon.svg',
    twitter: '@djmartin2019',
    github: 'djmartin2019'
  },
  author: {
    name: 'David Martin',
    email: 'djmartin2019@gmail.com',
    twitter: '@djmartin2019',
    github: 'djmartin2019'
  },
  defaultOpenGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Your Company',
  },
  defaultTwitter: {
    card: 'summary_large_image',
    creator: '@djmartin2019',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add your Google Search Console verification code
    yandex: '', // Add your Yandex verification code
    yahoo: '', // Add your Yahoo verification code
    other: {
      me: ['https://github.com/djmartin2019'], // Add your website URLs
    },
  },
};

export const generateMetadata = (title: string, description?: string, image?: string, url?: string) => {
  return {
    title: `${title} | ${seoConfig.site.name}`,
    description: description || seoConfig.site.description,
    openGraph: {
      ...seoConfig.defaultOpenGraph,
      title,
      description: description || seoConfig.site.description,
      url: url || seoConfig.site.url,
      images: [
        {
          url: image || seoConfig.site.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      ...seoConfig.defaultTwitter,
      title,
      description: description || seoConfig.site.description,
      images: [image || seoConfig.site.image],
    },
    robots: seoConfig.robots,
  };
};
