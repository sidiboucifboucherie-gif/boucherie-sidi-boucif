import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const TriperieAbatsPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie triperie"
    title="Triperie halal et abats a Beziers : une specialite utilement separee"
    description="La triperie et les abats meritent une page categorie a part, car la recherche est niche, specifique et fortement liee au savoir-faire du boucher. Cette page reste commerciale tout en assumant un angle conseil."
    highlights={[
      'La triperie est un segment de niche avec peu de concurrence bien structuree dans les resultats locaux.',
      'Les clients ont besoin d etre rassures a la fois sur la disponibilite et sur l accompagnement.',
      'Une page dediee permet de capitaliser sur un vrai angle de differentiation artisanale.',
      'Le contenu peut rester commercial tout en ouvrant vers un article conseil plus detaille.',
    ]}
    uses={[
      'Recherche specifique d abats ou de produits tripiers difficiles a trouver ailleurs.',
      'Cuisine traditionnelle et recettes de transmission.',
      'Besoin de conseils simples pour bien nettoyer, preparer et cuire.',
      'Achat local aupres d un boucher percu comme plus expert sur ces produits.',
    ]}
    supportLinks={[
      { title: 'Conseils pour cuisiner triperie et abats', description: 'Le blog soutient la categorie sans prendre sa place.', to: '/blog/cuisiner-triperie-abats', meta: 'Article' },
      { title: 'Voir notre page artisanale', description: 'La dimension savoir-faire complete bien cette categorie.', to: '/notre-boucherie-artisanale', meta: 'Pillar' },
      { title: 'Voir les services de commande', description: 'La logistique reste isolee sur sa page dediee.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.triperie}
  />
);

export default TriperieAbatsPage;
