import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const CharcuterieMerguezPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie merguez"
    title="Merguez halal et charcuterie artisanale a Beziers"
    description="Cette page categorie vise les recherches directes sur les merguez halal, saucisses artisanales et produits de grillade. Elle reste centree sur le produit, ses usages et sa valeur culinaire."
    highlights={[
      'Les merguez et saucisses artisanales generent une intention tres orientee achat, notamment aux beaux jours et avant les week-ends.',
      'Cette categorie a besoin d une page dediee car elle ne se confond ni avec le boeuf ni avec les services de livraison.',
      'Le langage doit mettre en avant la preparation artisanale, les grillades et la convivialite.',
      'C est aussi une categorie ideale pour les liens avec les articles barbecue et les colis.',
    ]}
    uses={[
      'Barbecue entre amis ou en famille.',
      'Commandes rapides pour les repas conviviaux du week-end.',
      'Achats complementaires a ajouter a un panier boeuf ou colis.',
      'Recherche locale de merguez halal artisanales plutot que produit standardise.',
    ]}
    supportLinks={[
      { title: 'Guide du barbecue halal', description: 'Un article pour orienter les choix de grillades.', to: '/blog/choisir-viande-barbecue', meta: 'Article' },
      { title: 'Voir les colis de viande', description: 'Pour les commandes plus larges et les achats famille.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
      { title: 'Voir les services', description: 'La livraison et le retrait sont traites a part.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.merguez}
  />
);

export default CharcuterieMerguezPage;
