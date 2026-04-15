import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../components/seo/PageSeo';
import { CtaBand, SeoHero, SeoSection, BulletGrid, LinkCardGrid, LocalTrustPanel } from '../components/seo/SeoShared';
import { BreadcrumbItem } from '../components/seo/Breadcrumbs';
import { breadcrumbSchema } from '../data/seoMeta';

type BlogArticlePageProps = {
  title: string;
  description: string;
  sections: Array<{ title: string; items: string[] }>;
  supportLinks: Array<{ title: string; description: string; to: string; meta?: string }>;
  seo: {
    title: string;
    description: string;
    path: string;
    type?: 'website' | 'article';
    breadcrumbs: BreadcrumbItem[];
    structuredData?: object[];
  };
};

const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  title,
  description,
  sections,
  supportLinks,
  seo,
}) => {
  return (
    <div className="bg-white">
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        type={seo.type}
        structuredData={[...(seo.structuredData || []), breadcrumbSchema(seo.breadcrumbs, seo.path)]}
      />
      <SeoHero
        eyebrow="Blog"
        title={title}
        description={description}
        primaryCta={{ label: 'Voir le blog', to: '/blog' }}
        secondaryCta={{ label: 'Voir la boutique', to: '/boutique' }}
        breadcrumbs={seo.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      {sections.map((section, index) => (
        <SeoSection key={section.title} title={section.title} muted={index % 2 === 0}>
          <BulletGrid items={section.items} />
        </SeoSection>
      ))}

      <SeoSection title="Pages utiles a consulter ensuite" muted={sections.length % 2 === 0}>
        <LinkCardGrid cards={supportLinks} />
      </SeoSection>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-stone-200 p-8 bg-stone-50">
            <h2 className="text-2xl font-serif font-bold text-burgundy-900 mb-4">Un contenu blog qui oriente sans forcer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              L objectif de cet article est d aider a mieux comprendre, puis de guider naturellement vers une categorie,
              une page de service ou une prise de contact. Le blog reste un support, pas une page de vente deguisee.
            </p>
            <Link to="/contact" className="text-burgundy-900 font-bold hover:text-gold-600 transition-colors">
              Poser une question a la boucherie
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Passer du conseil a l action"
        description="Si ce guide vous a aide, la prochaine etape utile est de rejoindre la categorie correspondante ou la page service adapte."
        primary={{ label: 'Revenir au blog', to: '/blog' }}
        secondary={{ label: 'Acceder a la boutique', to: '/boutique' }}
      />
    </div>
  );
};

export default BlogArticlePage;
