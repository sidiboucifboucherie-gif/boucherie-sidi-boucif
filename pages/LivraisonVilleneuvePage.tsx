import React from 'react';
import LocalDeliveryPage from './LocalDeliveryPage';
import { pageMeta } from '../data/seoMeta';

const LivraisonVilleneuvePage: React.FC = () => (
  <LocalDeliveryPage
    eyebrow="Livraison locale"
    title="Livraison de viande halal a Villeneuve-les-Beziers"
    description="Cette page couvre une zone de service proche et credible pour des clients qui veulent commander localement sans se deplacer jusqu au centre de Beziers. L angle est logistique, pratique et oriente commande."
    angles={[
      'Villeneuve-les-Beziers est suffisamment proche pour justifier une page de service locale utile.',
      'La page met en avant la simplicite de commande et la proximite plutot qu un discours generique de boucherie.',
      'Elle sert de porte d entree transactionnelle vers les categories les plus pertinentes pour les foyers du secteur.',
      'Elle evite la duplication en restant centree sur la zone et l usage local du service.',
    ]}
    nextSteps={[
      { title: 'Colis de viande halal', description: 'Une solution tres adaptee aux commandes famille et aux achats planifies.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
      { title: 'Volaille halal', description: 'Une categorie du quotidien qui convient bien aux commandes regulieres.', to: '/boutique/volaille-halal', meta: 'Categorie' },
      { title: 'Services de commande et retrait', description: 'Pour comprendre clairement comment finaliser votre commande.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.villeneuve}
  />
);

export default LivraisonVilleneuvePage;
