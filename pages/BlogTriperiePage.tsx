import React from 'react';
import BlogArticlePage from './BlogArticlePage';
import { pageMeta } from '../data/seoMeta';

const BlogTriperiePage: React.FC = () => (
  <BlogArticlePage
    title="Triperie et abats : conseils simples pour bien les cuisiner"
    description="La recherche autour des abats et de la triperie a une vraie dimension conseil. Cet article sert a debloquer la peur de mal preparer ces produits, puis a orienter vers la categorie dediee."
    sections={[
      {
        title: 'Pourquoi ce contenu compte pour la triperie',
        items: [
          'La triperie peut impressionner les clients qui ne savent pas comment la preparer.',
          'Un article conseil leve ce frein sans transformer la page categorie en tutoriel trop lourd.',
          'Le blog sert ici de passerelle entre curiosite culinaire et achat local.',
          'Le savoir-faire du boucher devient un veritable levier de differentiation.',
        ],
      },
      {
        title: 'Comment rassurer les lecteurs',
        items: [
          'En restant simple sur les usages et sur les etapes de preparation.',
          'En expliquant que certains produits demandent surtout les bons conseils, pas des recettes compliquees.',
          'En reliant la lecture a une categorie claire ou demander conseil devient facile.',
          'En montrant qu un boucher artisanal peut rendre ces produits plus accessibles.',
        ],
      },
    ]}
    supportLinks={[
      { title: 'Triperie & abats', description: 'La categorie commerciale a consulter apres lecture.', to: '/boutique/triperie-abats', meta: 'Categorie' },
      { title: 'Notre boucherie artisanale', description: 'La page confiance qui porte le savoir-faire.', to: '/notre-boucherie-artisanale', meta: 'Pillar' },
      { title: 'Voir les services', description: 'Pour passer ensuite a la commande ou au retrait.', to: '/services-livraison-drive', meta: 'Service' },
    ]}
    seo={pageMeta.blogTriperie}
  />
);

export default BlogTriperiePage;
