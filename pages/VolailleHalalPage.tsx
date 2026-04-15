import React from 'react';
import CategoryLandingPage from './CategoryLandingPage';
import { pageMeta } from '../data/seoMeta';

const VolailleHalalPage: React.FC = () => (
  <CategoryLandingPage
    eyebrow="Categorie volaille"
    title="Volaille halal a Beziers : poulet, dinde et pieces faciles pour le quotidien"
    description="La volaille halal attire une forte demande du quotidien. Cette page met l accent sur la praticite, la cuisine familiale et les usages recurrents sans diluer le message par des informations de service."
    highlights={[
      'Le poulet et la dinde repondent a une recherche locale simple, repetitive et tres transactionnelle.',
      'Cette categorie sert de point d entree naturel pour les foyers qui cherchent une viande du quotidien facile a preparer.',
      'La separation de la volaille dans une page dediee evite une categorie boutique trop large et peu performante.',
      'Le contenu doit rassurer autant sur la fraicheur que sur la polyvalence des morceaux.',
    ]}
    uses={[
      'Repas rapides de semaine avec cuisson simple et portions familiales.',
      'Menus enfants ou repas quotidiens a budget mieux maitrise.',
      'Commande reguliere pour les foyers qui veulent centraliser leurs courses de viande.',
      'Preparation au four, a la poele ou en marinade selon les habitudes locales.',
    ]}
    supportLinks={[
      { title: 'Voir les colis famille', description: 'Une bonne suite logique pour les clients qui achetent en quantite.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
      { title: 'Decouvrir la boutique complete', description: 'Retrouver aussi boeuf, agneau et specialites.', to: '/boutique', meta: 'Boutique' },
      { title: 'Commande et livraison', description: 'Verifier les modes de recuperation sans melanger les intentions.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.volaille}
  />
);

export default VolailleHalalPage;
