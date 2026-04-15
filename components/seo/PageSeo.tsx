import React, { useEffect } from 'react';

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  structuredData?: object | object[];
};

const SITE_URL = 'https://boucherie-sidi-boucif.fr';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

const ensureMetaTag = (selector: string, attrs: Record<string, string>) => {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => tag!.setAttribute(key, value));
    document.head.appendChild(tag);
  }

  return tag;
};

const ensureLinkTag = (selector: string, attrs: Record<string, string>) => {
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => tag!.setAttribute(key, value));
    document.head.appendChild(tag);
  }

  return tag;
};

const PageSeo: React.FC<PageSeoProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  structuredData,
}) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;

    const metaDescription = ensureMetaTag('meta[name="description"]', { name: 'description' });
    metaDescription.setAttribute('content', description);

    const ogTitle = ensureMetaTag('meta[property="og:title"]', { property: 'og:title' });
    ogTitle.setAttribute('content', title);

    const ogDescription = ensureMetaTag('meta[property="og:description"]', { property: 'og:description' });
    ogDescription.setAttribute('content', description);

    const ogUrl = ensureMetaTag('meta[property="og:url"]', { property: 'og:url' });
    ogUrl.setAttribute('content', canonicalUrl);

    const ogType = ensureMetaTag('meta[property="og:type"]', { property: 'og:type' });
    ogType.setAttribute('content', type);

    const ogImage = ensureMetaTag('meta[property="og:image"]', { property: 'og:image' });
    ogImage.setAttribute('content', image);

    const canonical = ensureLinkTag('link[rel="canonical"]', { rel: 'canonical' });
    canonical.setAttribute('href', canonicalUrl);

    const scriptsToRemove: HTMLScriptElement[] = [];
    const dataItems = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];

    dataItems.forEach((item) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-managed', 'true');
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
      scriptsToRemove.push(script);
    });

    return () => {
      scriptsToRemove.forEach((script) => script.remove());
    };
  }, [description, image, path, structuredData, title, type]);

  return null;
};

export default PageSeo;
