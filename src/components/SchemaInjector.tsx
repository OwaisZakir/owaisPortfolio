import { useEffect } from 'react';
import { getCombinedSchema } from '@/lib/schema';

/**
 * Component that injects JSON-LD schema markup into the document head
 * This improves SEO by providing structured data to search engines
 */
export const SchemaInjector = () => {
  useEffect(() => {
    try {
      // Create script tag for JSON-LD schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'schema-org-markup';
      
      // Add combined schema
      const schema = getCombinedSchema();
      script.textContent = JSON.stringify(schema);
      
      // Inject into document head
      document.head.appendChild(script);
      
      // Cleanup on unmount
      return () => {
        const existingScript = document.getElementById('schema-org-markup');
        if (existingScript) {
          existingScript.remove();
        }
      };
    } catch (error) {
      console.error('Failed to inject schema markup:', error);
    }
  }, []);

  // This component doesn't render anything
  return null;
};

export default SchemaInjector;
