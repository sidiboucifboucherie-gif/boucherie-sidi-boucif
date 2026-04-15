import { BreadcrumbItem } from '../components/seo/Breadcrumbs';

const SITE_URL = 'https://boucherie-sidi-boucif.fr';
const BUSINESS_NAME = 'Boucherie Sidi Boucif';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: object[];
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Butcher',
  name: BUSINESS_NAME,
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  telephone: '+33 4 67 28 27 88',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5 Avenue Gambetta',
    postalCode: '34500',
    addressLocality: 'Beziers',
    addressCountry: 'FR',
  },
  areaServed: ['Beziers', 'Boujan-sur-Libron', 'Maraussan', 'Lignan-sur-Orb', 'Villeneuve-les-Beziers'],
};

const serviceSchema = (name: string, path: string, areaServed: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: name,
  provider: {
    '@type': 'Butcher',
    name: BUSINESS_NAME,
    url: SITE_URL,
  },
  areaServed,
  url: `${SITE_URL}${path}`,
});

const articleSchema = (headline: string, path: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  description,
  mainEntityOfPage: `${SITE_URL}${path}`,
  author: {
    '@type': 'Organization',
    name: BUSINESS_NAME,
  },
  publisher: {
    '@type': 'Organization',
    name: BUSINESS_NAME,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_IMAGE,
    },
  },
  image: DEFAULT_IMAGE,
});

export const breadcrumbSchema = (items: BreadcrumbItem[], currentPath: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${SITE_URL}${index === items.length - 1 ? currentPath : item.to || currentPath}`,
  })),
});

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'Boucherie Halal a Beziers - Viande Halal, Livraison Locale | Boucherie Sidi Boucif',
    description: 'Boucherie halal a Beziers avec viande fraiche, service artisanal, commande en ligne, click and collect et livraison locale autour de Beziers.',
    path: '/',
    structuredData: [localBusinessSchema],
  },
  products: {
    title: 'Nos Produits - Boucherie Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Retrouvez notre selection de viandes halal, produits artisanaux et specialites de boucherie a Beziers.',
    path: '/products',
    structuredData: [localBusinessSchema],
  },
  about: {
    title: 'A Propos - Boucherie Artisanale Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Decouvrez la boucherie artisanale Sidi Boucif a Beziers, son savoir-faire, sa selection de viande halal et son ancrage local.',
    path: '/about',
    structuredData: [localBusinessSchema],
  },
  delivery: {
    title: 'Livraison Viande Halal a Beziers et Alentours | Boucherie Sidi Boucif',
    description: 'Informations de livraison locale de viande halal a Beziers, Boujan-sur-Libron, Maraussan, Lignan-sur-Orb et Villeneuve-les-Beziers.',
    path: '/delivery',
    structuredData: [localBusinessSchema, serviceSchema('Livraison locale de viande halal', '/delivery', ['Beziers', 'Boujan-sur-Libron', 'Maraussan', 'Lignan-sur-Orb', 'Villeneuve-les-Beziers'])],
  },
  contact: {
    title: 'Contact Boucherie Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Contactez votre boucherie halal a Beziers pour une commande, un renseignement ou une demande particuliere.',
    path: '/contact',
    structuredData: [localBusinessSchema],
  },
  boutique: {
    title: 'Boutique Viande Halal a Beziers - Boeuf, Volaille, Agneau | Boucherie Sidi Boucif',
    description: 'Explorez notre boutique de viande halal a Beziers avec categories boeuf, volaille, agneau, colis, merguez et triperie.',
    path: '/boutique',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique' }],
    structuredData: [localBusinessSchema],
  },
  serviceHub: {
    title: 'Commande et Livraison de Viande Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Commande en ligne, click and collect et livraison de viande halal a Beziers et dans les communes proches.',
    path: '/services-livraison-drive',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Services' }],
    structuredData: [localBusinessSchema, serviceSchema('Commande et livraison de viande halal', '/services-livraison-drive', ['Beziers', 'Villeneuve-les-Beziers', 'Maraussan', 'Lignan-sur-Orb'])],
  },
  artisan: {
    title: 'Boucherie Artisanale Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Une page confiance sur notre boucherie artisanale halal a Beziers, notre savoir-faire et notre engagement local.',
    path: '/notre-boucherie-artisanale',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Notre boucherie artisanale' }],
    structuredData: [localBusinessSchema],
  },
  blogHub: {
    title: 'Blog Viande Halal a Beziers - Conseils du Boucher | Boucherie Sidi Boucif',
    description: 'Guides pratiques, conseils du boucher et contenus utiles autour de la viande halal a Beziers et de la cuisine familiale.',
    path: '/blog',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Blog' }],
    structuredData: [localBusinessSchema],
  },
  boeuf: {
    title: 'Boeuf Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Page categorie boeuf halal a Beziers pour choisir vos morceaux du quotidien, grillades et repas de famille.',
    path: '/boutique/boeuf-halal',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Boeuf Halal' }],
    structuredData: [localBusinessSchema],
  },
  volaille: {
    title: 'Volaille Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Page categorie volaille halal a Beziers pour le poulet, la dinde et les pieces familiales du quotidien.',
    path: '/boutique/volaille-halal',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Volaille Halal' }],
    structuredData: [localBusinessSchema],
  },
  agneau: {
    title: 'Agneau Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Page categorie agneau halal a Beziers pour les morceaux du quotidien, repas de famille et temps forts.',
    path: '/boutique/agneau-halal',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Agneau Halal' }],
    structuredData: [localBusinessSchema],
  },
  colis: {
    title: 'Colis de Viande Halal a Beziers | Boucherie Sidi Boucif',
    description: 'Colis de viande halal a Beziers pour les familles, les courses planifiees et les besoins locaux du quotidien.',
    path: '/boutique/colis-viande-halal',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Colis de Viande Halal' }],
    structuredData: [localBusinessSchema],
  },
  merguez: {
    title: 'Merguez Halal a Beziers et Charcuterie Artisanale | Boucherie Sidi Boucif',
    description: 'Page categorie merguez halal a Beziers et charcuterie artisanale pour barbecue, grillades et repas conviviaux.',
    path: '/boutique/charcuterie-merguez',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Charcuterie & Merguez' }],
    structuredData: [localBusinessSchema],
  },
  triperie: {
    title: 'Triperie Halal et Abats a Beziers | Boucherie Sidi Boucif',
    description: 'Page categorie triperie halal et abats a Beziers avec un angle local, artisanal et conseil.',
    path: '/boutique/triperie-abats',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: 'Triperie & Abats' }],
    structuredData: [localBusinessSchema],
  },
  villeneuve: {
    title: 'Livraison Viande Halal a Villeneuve-les-Beziers | Boucherie Sidi Boucif',
    description: 'Service de livraison de viande halal a Villeneuve-les-Beziers avec commande locale et categories utiles pour les familles.',
    path: '/livraison-villeneuve-les-beziers',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services-livraison-drive' }, { label: 'Villeneuve-les-Beziers' }],
    structuredData: [localBusinessSchema, serviceSchema('Livraison de viande halal a Villeneuve-les-Beziers', '/livraison-villeneuve-les-beziers', ['Villeneuve-les-Beziers'])],
  },
  maraussanLignan: {
    title: 'Livraison Viande Halal a Maraussan et Lignan-sur-Orb | Boucherie Sidi Boucif',
    description: 'Service local de livraison de viande halal a Maraussan et Lignan-sur-Orb pour des commandes simples et utiles.',
    path: '/livraison-maraussan-lignan',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services-livraison-drive' }, { label: 'Maraussan et Lignan-sur-Orb' }],
    structuredData: [localBusinessSchema, serviceSchema('Livraison de viande halal a Maraussan et Lignan-sur-Orb', '/livraison-maraussan-lignan', ['Maraussan', 'Lignan-sur-Orb'])],
  },
  blogCertifications: {
    title: 'Certifications Halal : Comment Choisir sa Viande en Confiance ? | Boucherie Sidi Boucif',
    description: 'Un guide utile pour comprendre la confiance, la tracabilite et les attentes autour de la viande halal a Beziers.',
    path: '/blog/certifications-viande-halal',
    type: 'article',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: 'Certifications halal' }],
    structuredData: [localBusinessSchema, articleSchema('Certifications halal : comment choisir sa viande en confiance ?', '/blog/certifications-viande-halal', 'Un guide utile pour comprendre la confiance, la tracabilite et les attentes autour de la viande halal a Beziers.')],
  },
  blogBarbecue: {
    title: 'Comment Choisir sa Viande Halal pour un Barbecue Reussi ? | Boucherie Sidi Boucif',
    description: 'Conseils pour choisir une viande halal adaptee au barbecue avec un angle local, pratique et orientee commande.',
    path: '/blog/choisir-viande-barbecue',
    type: 'article',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: 'Viande halal pour barbecue' }],
    structuredData: [localBusinessSchema, articleSchema('Comment choisir sa viande halal pour un barbecue reussi ?', '/blog/choisir-viande-barbecue', 'Conseils pour choisir une viande halal adaptee au barbecue avec un angle local, pratique et orientee commande.')],
  },
  blogTriperie: {
    title: 'Triperie et Abats : Conseils Simples pour Bien les Cuisiner | Boucherie Sidi Boucif',
    description: 'Un article conseil sur la triperie et les abats pour rassurer, guider et orienter vers la bonne categorie locale.',
    path: '/blog/cuisiner-triperie-abats',
    type: 'article',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: 'Cuisiner triperie et abats' }],
    structuredData: [localBusinessSchema, articleSchema('Triperie et abats : conseils simples pour bien les cuisiner', '/blog/cuisiner-triperie-abats', 'Un article conseil sur la triperie et les abats pour rassurer, guider et orienter vers la bonne categorie locale.')],
  },
  blogColis: {
    title: 'Pourquoi Choisir un Colis de Viande Halal pour la Famille ? | Boucherie Sidi Boucif',
    description: 'Un guide utile sur les colis de viande halal a Beziers pour les familles, le budget et l organisation des commandes.',
    path: '/blog/pourquoi-choisir-un-colis-de-viande-halal',
    type: 'article',
    breadcrumbs: [{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: 'Choisir un colis de viande halal' }],
    structuredData: [localBusinessSchema, articleSchema('Pourquoi choisir un colis de viande halal pour la famille ?', '/blog/pourquoi-choisir-un-colis-de-viande-halal', 'Un guide utile sur les colis de viande halal a Beziers pour les familles, le budget et l organisation des commandes.')],
  },
};
