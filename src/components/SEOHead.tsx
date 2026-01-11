import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  author?: string;
  type?: string;
}

const SEOHead = ({
  title = 'Owais Zakir | MERN Stack Developer & Full-Stack Engineer',
  description = 'Full-Stack Engineer specializing in MERN stack, React, Node.js, and MongoDB. Building scalable, high-performance web applications with modern technologies.',
  image = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop',
  url = 'https://owaiszakir.dev',
  author = 'Owais Zakir',
  type = 'website',
}: SEOHeadProps) => {
  useEffect(() => {
    // Update page title
    document.title = title;

    // Meta descriptions
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('theme-color', '#0a0a14');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Owais Zakir Portfolio', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@OwaiszakIr');

    // LinkedIn tags
    updateMetaTag('author', author);

    // Additional SEO tags
    updateMetaTag('keywords', 'MERN, React, Node.js, MongoDB, Full-Stack, Developer, Engineer, Web Development, JavaScript, TypeScript');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'English');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Mobile optimization
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');

  }, [title, description, image, url, author, type]);

  return null;
};

export default SEOHead;
