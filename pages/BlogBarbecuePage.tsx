import React from 'react';
import BlogArticlePage from './BlogArticlePage';
import { pageMeta } from '../data/seoMeta';

const BlogBarbecuePage: React.FC = () => (
  <BlogArticlePage
    title="Comment choisir sa viande halal pour un barbecue reussi ?"
    description="Le barbecue genere une intention informationnelle qui peut se convertir rapidement. Cet article aide a choisir les bons produits puis renvoie vers les categories les plus pertinentes pour commander."
    sections={[
      {
        title: 'Quels besoins se cachent derriere la recherche barbecue',
        items: [
          'Les clients veulent savoir quelles viandes choisir sans perdre de temps.',
          'Ils comparent souvent boeuf, merguez et colis selon le nombre d invites.',
          'Le contenu doit guider sans transformer l article en catalogue repetitif.',
          'Cette page blog soutient surtout les categories boeuf, merguez et colis.',
        ],
      },
      {
        title: 'Comment orienter le choix simplement',
        items: [
          'Le boeuf convient aux clients qui cherchent des morceaux plus premium et plus generaux.',
          'Les merguez et saucisses artisanales parlent a une intention plus conviviale et immediate.',
          'Les colis sont utiles quand il faut nourrir plusieurs personnes sans multiplier les achats.',
          'La page service prend ensuite le relais pour les aspects commande et livraison.',
        ],
      },
    ]}
    supportLinks={[
      { title: 'Boeuf halal', description: 'Pour les morceaux a griller ou a partager.', to: '/boutique/boeuf-halal', meta: 'Categorie' },
      { title: 'Charcuterie & merguez', description: 'Pour les saucisses et les grillades conviviales.', to: '/boutique/charcuterie-merguez', meta: 'Categorie' },
      { title: 'Colis de viande halal', description: 'Pour organiser un barbecue avec une logique plus familiale.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
    ]}
    seo={pageMeta.blogBarbecue}
  />
);

export default BlogBarbecuePage;
