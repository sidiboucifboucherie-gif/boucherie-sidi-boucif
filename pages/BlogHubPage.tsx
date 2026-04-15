import React from 'react';
import PageSeo from '../components/seo/PageSeo';
import { LinkCardGrid, SeoHero, SeoSection, CtaBand, LocalTrustPanel } from '../components/seo/SeoShared';
import { blogPosts, seoCategories } from '../data/seoContent';
import { breadcrumbSchema, pageMeta } from '../data/seoMeta';

const BlogHubPage: React.FC = () => {
  const meta = pageMeta.blogHub;

  return (
    <div className="bg-white">
      <PageSeo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        structuredData={[...(meta.structuredData || []), breadcrumbSchema(meta.breadcrumbs || [], meta.path)]}
      />
      <SeoHero
        eyebrow="Blog"
        title="Conseils du boucher, guides pratiques et contenus utiles"
        description="Le blog soutient la strategie SEO sans dupliquer les pages service ou les categories. Chaque article repond a une vraie question, puis renvoie vers une page commerciale plus adaptee."
        primaryCta={{ label: 'Voir la boutique', to: '/boutique' }}
        secondaryCta={{ label: 'Voir les services', to: '/services-livraison-drive' }}
        breadcrumbs={meta.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Tous les articles" muted>
        <LinkCardGrid
          cards={blogPosts.map((post) => ({
            title: post.title,
            description: `${post.excerpt} ${post.supportLabel}`,
            to: post.path,
            meta: 'Article',
          }))}
          columns="md:grid-cols-2"
        />
      </SeoSection>

      <SeoSection title="Pages soutenues par le blog">
        <LinkCardGrid
          cards={seoCategories.map((category) => ({
            title: category.title,
            description: category.description,
            to: category.path,
            meta: 'Page commerciale',
          }))}
          columns="md:grid-cols-2 lg:grid-cols-3"
        />
      </SeoSection>

      <CtaBand
        title="Lire, choisir, puis commander"
        description="Le blog sert a rassurer et orienter. La prochaine etape naturelle reste toujours une categorie ou une page de service."
        primary={{ label: 'Aller vers les categories', to: '/boutique' }}
        secondary={{ label: 'Poser une question', to: '/contact' }}
      />
    </div>
  );
};

export default BlogHubPage;
