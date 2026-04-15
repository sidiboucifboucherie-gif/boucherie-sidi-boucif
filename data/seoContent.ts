export type BlogPostSummary = {
  title: string;
  path: string;
  excerpt: string;
  supportLabel: string;
};

export type CategorySummary = {
  title: string;
  path: string;
  keyword: string;
  description: string;
};

export type LocalPageSummary = {
  title: string;
  path: string;
  description: string;
};

export const seoCategories: CategorySummary[] = [
  {
    title: 'Boeuf Halal',
    path: '/boutique/boeuf-halal',
    keyword: 'boeuf halal Beziers',
    description: 'Une page commerciale dediee aux pieces de boeuf halal, coupes du quotidien et morceaux pour reception.',
  },
  {
    title: 'Volaille Halal',
    path: '/boutique/volaille-halal',
    keyword: 'poulet halal Beziers',
    description: 'Une categorie axee sur le poulet, la dinde et les volailles fermieres pour la cuisine familiale.',
  },
  {
    title: 'Agneau Halal',
    path: '/boutique/agneau-halal',
    keyword: 'agneau halal Beziers',
    description: 'Une page pour les morceaux d agneau du quotidien, des repas de famille et des temps forts religieux.',
  },
  {
    title: 'Colis de Viande Halal',
    path: '/boutique/colis-viande-halal',
    keyword: 'colis viande halal Beziers',
    description: 'Une categorie optimisee pour les packs famille, les achats malins et les besoins hebdomadaires.',
  },
  {
    title: 'Charcuterie & Merguez',
    path: '/boutique/charcuterie-merguez',
    keyword: 'merguez halal Beziers',
    description: 'Une page orientee merguez artisanales, saucisses maison et preparations pour grillades.',
  },
  {
    title: 'Triperie & Abats',
    path: '/boutique/triperie-abats',
    keyword: 'triperie halal Beziers',
    description: 'Une categorie de niche pour les abats, la triperie et les produits demandes par une clientele avertie.',
  },
];

export const seoLocalPages: LocalPageSummary[] = [
  {
    title: 'Livraison a Villeneuve-les-Beziers',
    path: '/livraison-villeneuve-les-beziers',
    description: 'Une page locale de service pour une zone de livraison proche, utile et clairement differenciee.',
  },
  {
    title: 'Livraison a Maraussan et Lignan-sur-Orb',
    path: '/livraison-maraussan-lignan',
    description: 'Une page locale centree sur la desserte ouest avec un angle logistique et familial.',
  },
];

export const blogPosts: BlogPostSummary[] = [
  {
    title: 'Certifications halal : comment choisir sa viande en confiance ?',
    path: '/blog/certifications-viande-halal',
    excerpt: 'Un guide pedagogique sur la confiance, la tracabilite et les questions que les clients se posent avant d acheter.',
    supportLabel: 'Soutient la page confiance et les categories principales.',
  },
  {
    title: 'Comment choisir sa viande halal pour un barbecue reussi ?',
    path: '/blog/choisir-viande-barbecue',
    excerpt: 'Un contenu saisonnier utile pour orienter les clients vers le boeuf, les merguez et les colis barbecue.',
    supportLabel: 'Soutient les pages boeuf, merguez et colis.',
  },
  {
    title: 'Triperie et abats : conseils simples pour bien les cuisiner',
    path: '/blog/cuisiner-triperie-abats',
    excerpt: 'Un article de reponse a la peur de mal preparer les abats, avec angle savoir-faire du boucher.',
    supportLabel: 'Soutient la page triperie et la page artisanale.',
  },
  {
    title: 'Pourquoi choisir un colis de viande halal pour la famille ?',
    path: '/blog/pourquoi-choisir-un-colis-de-viande-halal',
    excerpt: 'Un article oriente praticite, budget et organisation des courses pour les foyers locaux.',
    supportLabel: 'Soutient la page colis et la page livraison.',
  },
];

