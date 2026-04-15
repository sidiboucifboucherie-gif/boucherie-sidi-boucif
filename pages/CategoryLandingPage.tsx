import React from 'react';
import { Link } from 'react-router-dom';
import PageSeo from '../components/seo/PageSeo';
import { CtaBand, SeoHero, SeoSection, BulletGrid, LinkCardGrid, LocalTrustPanel } from '../components/seo/SeoShared';
import { BreadcrumbItem } from '../components/seo/Breadcrumbs';
import { breadcrumbSchema } from '../data/seoMeta';

type CategoryLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  uses: string[];
  supportLinks: Array<{ title: string; description: string; to: string; meta?: string }>;
  seo: {
    title: string;
    description: string;
    path: string;
    breadcrumbs: BreadcrumbItem[];
    structuredData?: object[];
  };
};

const CategoryLandingPage: React.FC<CategoryLandingPageProps> = ({
  eyebrow,
  title,
  description,
  highlights,
  uses,
  supportLinks,
  seo,
}) => {
  return (
    <div className="bg-white">
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        structuredData={[...(seo.structuredData || []), breadcrumbSchema(seo.breadcrumbs, seo.path)]}
      />
      <SeoHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryCta={{ label: 'Voir la boutique complete', to: '/products' }}
        secondaryCta={{ label: 'Voir la livraison', to: '/services-livraison-drive' }}
        breadcrumbs={seo.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Pourquoi cette categorie merite sa propre page" muted>
        <BulletGrid items={highlights} />
      </SeoSection>

      <SeoSection title="Pour quels besoins cette categorie est utile ?">
        <BulletGrid items={uses} />
      </SeoSection>

      <SeoSection title="Pages a consulter ensuite" muted>
        <LinkCardGrid cards={supportLinks} />
      </SeoSection>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm border border-stone-200 p-8 bg-stone-50">
            <h2 className="text-2xl font-serif font-bold text-burgundy-900 mb-4">Un contenu categorie, pas une page service</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cette page reste volontairement centree sur le choix des produits et des usages. Les informations de livraison,
              retrait et commande sont regroupees dans une page service dediee pour eviter la duplication et garder un message clair.
            </p>
            <Link to="/services-livraison-drive" className="text-burgundy-900 font-bold hover:text-gold-600 transition-colors">
              Consulter les services de livraison et commande
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Passer a la commande"
        description="Une fois votre categorie choisie, vous pouvez continuer vers la boutique ou verifier le mode de recuperation le plus pratique."
        primary={{ label: 'Commander maintenant', to: '/products' }}
        secondary={{ label: 'Voir les services', to: '/services-livraison-drive' }}
      />
    </div>
  );
};

export default CategoryLandingPage;
