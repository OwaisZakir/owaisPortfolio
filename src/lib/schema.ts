import React from 'react';

/**
 * Structured Data (JSON-LD) schemas for SEO optimization
 * Implements schema.org markup for better search engine understanding
 */

export const getPersonSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': '#person',
  name: 'Owais Zakir',
  alternateName: 'Owais',
  url: 'https://owais-portfolio.vercel.app',
  email: 'owaiszakir88@gmail.com',
  telephone: '+92-3XX-XXXXXXX',
  jobTitle: 'Full-Stack Developer',
  description: 'MERN Stack Developer specializing in ERP, POS, and automation solutions',
  image: {
    '@type': 'ImageObject',
    url: 'https://owais-portfolio.vercel.app/og-image.png',
    width: 1200,
    height: 630,
  },
  sameAs: [
    'https://github.com/OwaisZakir',
    'https://www.linkedin.com/in/owaiszakir/',
    'https://twitter.com/owais_zakir', // if applicable
  ],
  knowsAbout: [
    'React.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'Tailwind CSS',
    'Express.js',
    'Web Development',
    'Three.js',
    'WebGL',
    'Cybersecurity',
    'ERP Systems',
    'POS Systems',
  ],
  worksFor: {
    '@type': 'Organization',
    '@id': '#suffah-tech',
    name: 'Suffah Tech',
    url: 'https://suffah.tech',
  },
  educationDetails: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'Master of Computer Applications (MCA)',
      issuingOrganization: {
        '@type': 'EducationalOrganization',
        name: 'Suffah Institute of Technology',
        url: 'https://suffah.edu.pk',
      },
      startDate: '2024-06',
      endDate: '2026-12',
    },
  ],
  award: [
    {
      '@type': 'Award',
      name: 'Cisco Certified in Cybersecurity',
      awardDate: '2025-12',
      recognizingAuthority: 'Cisco',
    },
  ],
  location: {
    '@type': 'Place',
    name: 'Karachi, Pakistan',
  },
});

export const getWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': '#website',
  name: "Owais Zakir's Portfolio",
  url: 'https://owais-portfolio.vercel.app',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://owais-portfolio.vercel.app/?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  isPartOf: {
    '@type': 'Organization',
    '@id': '#owais-personal-brand',
    name: 'Owais Zakir',
    description: 'Full-Stack Developer Portfolio',
  },
});

export const getOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': '#owais-personal-brand',
  name: 'Owais Zakir',
  url: 'https://owais-portfolio.vercel.app',
  description: 'Professional portfolio of Owais Zakir, Full-Stack Developer',
  foundingDate: '2024',
  foundingLocation: {
    '@type': 'Place',
    name: 'Karachi, Pakistan',
  },
  founder: {
    '@id': '#person',
  },
  member: {
    '@type': 'Person',
    '@id': '#person',
    name: 'Owais Zakir',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+92-3XX-XXXXXXX',
    contactType: 'Business',
    email: 'owaiszakir88@gmail.com',
  },
});

export const getPortfolioSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: "Owais Zakir's Portfolio",
  description: 'Full-Stack Developer portfolio showcasing web development projects, skills, and experience',
  url: 'https://owais-portfolio.vercel.app',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://owais-portfolio.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://owais-portfolio.vercel.app/#about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Projects',
        item: 'https://owais-portfolio.vercel.app/#projects',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: '3D Showcase',
        item: 'https://owais-portfolio.vercel.app/#3d-showcase',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://owais-portfolio.vercel.app/#contact',
      },
    ],
  },
});

export const getProjectSchema = (
  title: string,
  description: string,
  image: string,
  url: string,
  technologies: string[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: title,
  description,
  url,
  image: {
    '@type': 'ImageObject',
    url: image,
  },
  creator: {
    '@id': '#person',
  },
  keywords: technologies.join(', '),
  programmingLanguage: technologies,
});

export const getLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': '#local-business',
  name: 'Owais Zakir - Full-Stack Developer',
  description: 'Professional web development services specializing in MERN stack',
  url: 'https://owais-portfolio.vercel.app',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Karachi',
    addressCity: 'Karachi',
    addressRegion: 'Sindh',
    postalCode: 'Pakistan',
    addressCountry: 'PK',
  },
  telephone: '+92-3XX-XXXXXXX',
  email: 'owaiszakir88@gmail.com',
  priceRange: '$$',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '24.8607',
    longitude: '67.0011',
  },
});

/**
 * Combines all schemas into a single JSON-LD script
 */
export const getCombinedSchema = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    getPersonSchema(),
    getWebsiteSchema(),
    getOrganizationSchema(),
    getPortfolioSchema(),
    getLocalBusinessSchema(),
  ],
});

/**
 * Utility function to inject schema into document head
 */
export const injectSchema = (schema: any) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Effect hook to inject all schemas on mount
 */
export const useInjectSchemas = () => {
  React.useEffect(() => {
    injectSchema(getCombinedSchema());
  }, []);
};
