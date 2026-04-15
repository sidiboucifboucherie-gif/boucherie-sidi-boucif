import React from 'react';
import BlogArticlePage from './BlogArticlePage';
import { pageMeta } from '../data/seoMeta';

const BlogCertificationsPage: React.FC = () => (
  <BlogArticlePage
    title="Certifications halal : comment choisir sa viande en confiance ?"
    description="Les clients qui recherchent une boucherie halal locale veulent souvent comprendre ce qu ils doivent verifier avant d acheter. Cette page apporte un cadre simple, rassurant et relie la confiance aux pages commerciales utiles."
    sections={[
      {
        title: 'Pourquoi cette question revient souvent',
        items: [
          'Dans le halal, la confiance precede souvent l achat : le client veut comprendre avant de commander.',
          'Une page blog dediee evite de surcharger la page d accueil ou les categories avec un discours trop pedagogique.',
          'Le contenu doit repondre avec clarte aux doutes les plus frequents sans tomber dans le jargon.',
          'Ce guide soutient surtout la page artisanale et les categories principales.',
        ],
      },
      {
        title: 'Ce que les clients cherchent vraiment a verifier',
        items: [
          'La transparence generale de la boucherie et la capacite a repondre clairement aux questions.',
          'La coherence entre le discours sur le site, la boutique physique et l experience client.',
          'La sensation d acheter chez un professionnel responsable et ancre localement.',
          'La possibilite de poursuivre vers une commande sans zone d ombre inutile.',
        ],
      },
    ]}
    supportLinks={[
      { title: 'Notre boucherie artisanale', description: 'La page confiance et expertise a consulter apres ce guide.', to: '/notre-boucherie-artisanale', meta: 'Pillar' },
      { title: 'Boutique de viandes halal', description: 'Passer du besoin de confiance au choix des categories.', to: '/boutique', meta: 'Boutique' },
      { title: 'Boeuf halal', description: 'Une page categorie a forte intention locale.', to: '/boutique/boeuf-halal', meta: 'Categorie' },
    ]}
    seo={pageMeta.blogCertifications}
  />
);

export default BlogCertificationsPage;
