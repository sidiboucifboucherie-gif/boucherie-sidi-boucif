import React from 'react';
import PageSeo from '../components/seo/PageSeo';
import { LinkCardGrid, SeoHero, SeoSection, BulletGrid, CtaBand, LocalTrustPanel } from '../components/seo/SeoShared';
import { seoCategories, blogPosts } from '../data/seoContent';
import { breadcrumbSchema, pageMeta } from '../data/seoMeta';

const BoutiqueHubPage: React.FC = () => {
  const meta = pageMeta.boutique;

  return (
    <div className="bg-white">
      <PageSeo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        structuredData={[...(meta.structuredData || []), breadcrumbSchema(meta.breadcrumbs || [], meta.path)]}
      />
      <SeoHero
        eyebrow="Boutique"
        title="Notre boutique de viandes halal a Beziers"
        description="Cette page centralise les grandes familles de produits pour separer clairement l intention categorie de l intention service. Vous y retrouvez les categories majeures a explorer avant de passer commande."
        primaryCta={{ label: 'Voir tous nos produits', to: '/products' }}
        secondaryCta={{ label: 'Voir la livraison', to: '/services-livraison-drive' }}
        breadcrumbs={meta.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Explorer par categorie" muted>
        <LinkCardGrid
          columns="md:grid-cols-2 lg:grid-cols-3"
          cards={seoCategories.map((category) => ({
            title: category.title,
            description: category.description,
            to: category.path,
            meta: category.keyword,
          }))}
        />
      </SeoSection>

      <SeoSection title="Pourquoi une boutique structuree ?">
        <BulletGrid
          items={[
            'Chaque categorie repond a une intention produit precise sans melanger livraison, click and collect et achat de viande.',
            'Les categories permettent de cibler les recherches locales sur le boeuf, la volaille, l agneau, les colis et les specialites.',
            'Les contenus conseil restent en soutien grace au blog, ce qui laisse la boutique centree sur l achat et la decision.',
            'Les clients peuvent rapidement comparer leurs besoins du quotidien, les grillades du week-end et les achats famille.',
          ]}
        />
      </SeoSection>

      <SeoSection title="Lectures utiles avant de commander" muted>
        <LinkCardGrid
          cards={blogPosts.slice(0, 3).map((post) => ({
            title: post.title,
            description: post.excerpt,
            to: post.path,
            meta: 'Conseil du boucher',
          }))}
        />
      </SeoSection>

      <CtaBand
        title="Une commande simple, locale et bien orientee"
        description="Choisissez d abord votre famille de produits, puis consultez la page service pour la livraison, le click and collect et les informations pratiques."
        primary={{ label: 'Voir les services de commande', to: '/services-livraison-drive' }}
        secondary={{ label: 'Nous contacter', to: '/contact' }}
      />
    </div>
  );
};

export default BoutiqueHubPage;
