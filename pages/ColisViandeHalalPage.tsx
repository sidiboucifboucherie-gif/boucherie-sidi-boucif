import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const ColisViandeHalalPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie colis"
    title="Colis de viande halal a Beziers : une solution pratique pour les familles"
    description="Cette page categorie cible les recherches a forte intention transactionnelle autour des colis de viande halal a Beziers. Elle doit porter le message budget, organisation et praticite sans devenir une simple page livraison."
    highlights={[
      'Le colis de viande est une categorie commerciale a part entiere avec ses propres recherches locales et ses propres arguments.',
      'Le client attend ici une logique de gain de temps, de meilleur pilotage du budget et de courses mieux organisees.',
      'Les colis peuvent soutenir la livraison locale, mais la promesse produit doit rester au centre de la page.',
      'Cette categorie peut devenir une page tres rentable si elle s appuie sur des contenus blog qui justifient l achat en volume.',
    ]}
    uses={[
      'Courses de la semaine ou du mois pour un foyer qui veut anticiper.',
      'Recherche de lots plus coherents pour la famille.',
      'Preparation d un barbecue ou d un week-end entre proches.',
      'Commande locale avec besoin d une solution simple et bien structuree.',
    ]}
    supportLinks={[
      { title: 'Pourquoi choisir un colis de viande halal ?', description: 'Article de blog dedie a l argument budget et organisation.', to: '/blog/pourquoi-choisir-un-colis-de-viande-halal', meta: 'Article' },
      { title: 'Voir la page service', description: 'Verifier les options de retrait et de livraison.', to: '/services-livraison-drive', meta: 'Service' },
      { title: 'Voir la livraison a Villeneuve-les-Beziers', description: 'Exemple de page locale utile et non dupliquee.', to: '/livraison-villeneuve-les-beziers', meta: 'Local' },
    ]}
    seo={pageMeta.colis}
  />
);

export default ColisViandeHalalPage;
