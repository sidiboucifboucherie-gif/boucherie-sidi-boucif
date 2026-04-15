import React from 'react';
import BlogArticlePage from './BlogArticlePage';
import { pageMeta } from '../data/seoMeta';

const BlogColisPage: React.FC = () => (
  <BlogArticlePage
    title="Pourquoi choisir un colis de viande halal pour la famille ?"
    description="Cet article aide les familles a comprendre l interet d un colis de viande halal : organisation, praticite et meilleure lisibilite des achats. Il soutient directement la categorie colis et les pages de service local."
    sections={[
      {
        title: 'Ce qui rend le colis attractif',
        items: [
          'Le colis simplifie les courses en regroupant l achat de viande sur une logique plus planifiee.',
          'Il aide les foyers a mieux anticiper les repas sans multiplier les decisions au dernier moment.',
          'C est une reponse naturelle aux recherches sur la viande en lot, en famille ou a budget mieux maitrise.',
          'L article permet d expliquer cette logique sans alourdir la categorie commerciale.',
        ],
      },
      {
        title: 'A qui ce contenu parle le plus',
        items: [
          'Aux familles qui commandent regulierement des produits simples et utiles.',
          'Aux clients de communes proches qui cherchent une commande plus pratique a recuperer ou faire livrer.',
          'Aux personnes qui veulent comparer colis, volaille et boeuf selon leurs habitudes.',
          'Aux acheteurs qui veulent un panier plus coherent plutot qu une liste dispersee de produits.',
        ],
      },
    ]}
    supportLinks={[
      { title: 'Colis de viande halal', description: 'La categorie commerciale directement liee a cet article.', to: '/boutique/colis-viande-halal', meta: 'Categorie' },
      { title: 'Livraison a Villeneuve-les-Beziers', description: 'Un exemple de page locale qui soutient cette offre.', to: '/livraison-villeneuve-les-beziers', meta: 'Local' },
      { title: 'Services de commande et livraison', description: 'Pour comprendre comment finaliser et recuperer la commande.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.blogColis}
  />
);

export default BlogColisPage;
