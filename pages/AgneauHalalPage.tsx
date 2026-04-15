import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const AgneauHalalPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie agneau"
    title="Agneau halal a Beziers : morceaux du quotidien, repas de famille et moments forts"
    description="L agneau halal ne se limite pas aux temps forts saisonniers. Cette page categorie traite les recherches commerciales sur les morceaux, les occasions de consommation et la facon de bien s orienter avant commande."
    highlights={[
      'L agneau a une forte valeur percue et une intention d achat souvent plus engagee que d autres viandes.',
      'La page categorie doit couvrir a la fois les repas hebdomadaires et les besoins lies aux reunions familiales.',
      'Cette separation permet ensuite de traiter Ramadan et Aïd dans du contenu saisonnier sans alourdir la page commerciale.',
      'Le contenu categorie garde un angle produit, coupe, usage et choix.',
    ]}
    uses={[
      'Repas familiaux avec gigot, epaule ou morceaux a mijoter.',
      'Cuisine traditionnelle et plats de partage.',
      'Preparation des periodes de forte demande religieuse via des liens vers des contenus conseil.',
      'Recherche d un boucher local pour une viande plus premium et mieux accompagnee.',
    ]}
    supportLinks={[
      { title: 'Voir les conseils de commande et livraison', description: 'Les details pratiques sont centralises dans le hub service.', to: '/services-livraison-drive', meta: 'Service' },
      { title: 'Lire le blog plus tard', description: 'Le blog accueillera les futurs contenus saisonniers Ramadan et Aïd.', to: '/blog', meta: 'Blog' },
      { title: 'Retour a la boutique', description: 'Explorer les autres familles de viande.', to: '/boutique', meta: 'Boutique' },
    ]}
    seo={pageMeta.agneau}
  />
);

export default AgneauHalalPage;
