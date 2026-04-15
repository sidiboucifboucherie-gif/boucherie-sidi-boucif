import React from 'react';
import PageSeo from '../components/seo/PageSeo';
import { LinkCardGrid, SeoHero, SeoSection, BulletGrid, CtaBand, LocalTrustPanel } from '../components/seo/SeoShared';
import { blogPosts, seoCategories } from '../data/seoContent';
import { breadcrumbSchema, pageMeta } from '../data/seoMeta';

const ArtisanButcheryPage: React.FC = () => {
  const meta = pageMeta.artisan;

  return (
    <div className="bg-white">
      <PageSeo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        structuredData={[...(meta.structuredData || []), breadcrumbSchema(meta.breadcrumbs || [], meta.path)]}
      />
      <SeoHero
        eyebrow="Notre boucherie"
        title="Une boucherie artisanale halal a Beziers, entre confiance locale et qualite"
        description="Cette page renforce la dimension confiance de la marque : savoir-faire artisanal, exigence halal, qualite des viandes et accompagnement des familles de Beziers et alentours."
        primaryCta={{ label: 'Voir notre boutique', to: '/boutique' }}
        secondaryCta={{ label: 'Lire le guide halal', to: '/blog/certifications-viande-halal' }}
        breadcrumbs={meta.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Ce que les clients veulent verifier en premier" muted>
        <BulletGrid
          items={[
            'La boucherie est bien locale, identifiable et reliee a un vrai point de vente a Beziers.',
            'L offre halal repose sur un discours transparent, comprehensible et rassurant.',
            'Le travail artisanal ne se limite pas a la vente : il inclut la decoupe, le conseil et la preparation des pieces.',
            'La qualite percue repose aussi sur l origine, la fraicheur et la facon dont la viande est presentee au client.',
          ]}
        />
      </SeoSection>

      <SeoSection title="Nos grands axes de confiance">
        <BulletGrid
          items={[
            'Un savoir-faire de boucher artisanal qui aide autant pour le quotidien que pour les repas plus importants.',
            'Une approche halal claire, sans effet marketing vide, pour repondre aux questions de confiance les plus frequentes.',
            'Des categories bien separees pour que chaque besoin trouve sa bonne page sans confusion entre service et produit.',
            'Une proximite locale qui renforce la relation client, en boutique comme en ligne.',
          ]}
        />
      </SeoSection>

      <SeoSection title="Explorer les familles de produits" muted>
        <LinkCardGrid
          cards={seoCategories.map((category) => ({
            title: category.title,
            description: category.description,
            to: category.path,
            meta: 'Categorie boutique',
          }))}
          columns="md:grid-cols-2 lg:grid-cols-3"
        />
      </SeoSection>

      <SeoSection title="Guides qui renforcent la confiance">
        <LinkCardGrid
          cards={blogPosts.map((post) => ({
            title: post.title,
            description: post.excerpt,
            to: post.path,
            meta: 'Article de blog',
          }))}
          columns="md:grid-cols-2"
        />
      </SeoSection>

      <CtaBand
        title="Decouvrir la boucherie avec des pages utiles"
        description="La confiance se construit autant par la clarte du discours que par la facilite de navigation entre la boutique, les services et les conseils."
        primary={{ label: 'Voir les services', to: '/services-livraison-drive' }}
        secondary={{ label: 'Nous contacter', to: '/contact' }}
      />
    </div>
  );
};

export default ArtisanButcheryPage;
