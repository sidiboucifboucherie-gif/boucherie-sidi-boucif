import React from 'react';
import LocalDeliveryPage from './LocalDeliveryPage';
import { pageMeta } from '../data/seoMeta';

const LivraisonMaraussanLignanPage: React.FC = () => (
  <LocalDeliveryPage
    eyebrow="Livraison locale"
    title="Livraison de viande halal a Maraussan et Lignan-sur-Orb"
    description="Cette page traite une zone ouest coherente avec un vrai angle logistique. Elle s adresse aux familles qui cherchent une commande locale utile, simple et reliee a des categories adaptees a une consommation reguliere."
    angles={[
      'Le regroupement Maraussan et Lignan-sur-Orb evite la multiplication de petites pages faibles.',
      'Le message reste local et pratique : accessibilite, commande, recuperation et confort.',
      'Cette page peut pousser plus naturellement les colis, la volaille et les categories du quotidien.',
      'Elle renforce la page service principale sans lui faire concurrence sur les requetes generalistes.',
    ]}
    nextSteps={[
      { title: 'Colis de viande pour la famille', description: 'Une option logique pour les commandes planifiees et les foyers locaux.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
      { title: 'Boeuf halal', description: 'Pour les clients qui veulent choisir des morceaux plus precis.', to: '/boutique/boeuf-halal', meta: 'Categorie' },
      { title: 'Hub service principal', description: 'Retrouver la logique globale commande, livraison et retrait.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.maraussanLignan}
  />
);

export default LivraisonMaraussanLignanPage;
