import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const BoeufHalalPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie boeuf"
    title="Boeuf halal a Beziers : des pieces du quotidien aux morceaux a partager"
    description="Cette page cible l intention categorie autour du boeuf halal a Beziers. Elle oriente les recherches sur les morceaux, les usages et les choix de preparation sans melanger cette intention avec la logistique."
    highlights={[
      'Le boeuf concentre une forte intention d achat locale pour les steaks, rôtis, morceaux mijotes et pieces a griller.',
      'Les clients cherchent souvent un compromis entre viande du quotidien, qualite percue et conseils de cuisson.',
      'Cette categorie merite sa propre page pour repondre aux recherches plus precises que la simple requete boucherie halal.',
      'Le contenu peut orienter vers les grillades, les repas de famille et les achats hebdomadaires.',
    ]}
    uses={[
      'Cuisine familiale de la semaine avec des morceaux simples a cuisiner.',
      'Barbecue et grillades quand le client hesite entre boeuf, merguez ou colis.',
      'Repas de week-end avec des pieces plus genereuses ou a partager.',
      'Recherche d un boucher local capable de conseiller la bonne coupe selon l usage.',
    ]}
    supportLinks={[
      { title: 'Choisir sa viande pour un barbecue', description: 'Un article pour relier intention informationnelle et achat commercial.', to: '/blog/choisir-viande-barbecue', meta: 'Article' },
      { title: 'Voir les services de livraison', description: 'La logistique reste regroupee sur une page dediee.', to: '/services-livraison-drive', meta: 'Service' },
      { title: 'Explorer la boutique complete', description: 'Acceder a toute l offre avant validation du panier.', to: '/boutique', meta: 'Boutique' },
    ]}
    seo={pageMeta.boeuf}
  />
);

export default BoeufHalalPage;
