import Script from 'next/script';

type JsonLd = Record<string, unknown>;

interface StructuredDataProps {
    data: JsonLd;
}

/**
 * Renders structured data (JSON-LD) via Next.js <Script>
 * Adds a unique ID based on the schema type + a hash of the content
 */
export default function StructuredData({ data }: StructuredDataProps) {
    const type = (data['@type'] as string) || 'unknown';
    const contentHash = JSON.stringify(data).slice(-12);
    const id = `structured-data-${type}-${contentHash}`;

    return (
        <Script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, 2),
            }}
        />
    );
}

// Global Organization Schema for e-mart
export const emartOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "e-mart",
    "url": "https://www.e-mart.com",
    "logo": "https://www.e-mart.com/logo.png",
    "description": "Premium ecommerce destination for curated high-quality products. Experience seamless shopping with fast delivery and secure payments.",
    "sameAs": [
        "https://www.linkedin.com/company/e-mart",
        "https://twitter.com/emart_shop"
    ]
};

// Global Website Schema
export const emartWebsiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "e-mart | Premium Ecommerce",
    "url": "https://www.e-mart.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.e-mart.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    }
};
