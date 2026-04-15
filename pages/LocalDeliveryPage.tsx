import React from 'react';
import PageSeo from '../components/seo/PageSeo';
import { CtaBand, SeoHero, SeoSection, BulletGrid, LinkCardGrid, LocalTrustPanel } from '../components/seo/SeoShared';
import { BreadcrumbItem } from '../components/seo/Breadcrumbs';
import { breadcrumbSchema } from '../data/seoMeta';

type LocalDeliveryPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  angles: string[];
  nextSteps: Array<{ title: string; description: string; to: string; meta?: string }>;
  seo: {
    title: string;
    description: string;
    path: string;
    breadcrumbs: BreadcrumbItem[];
    structuredData?: object[];
  };
};

const LocalDeliveryPage: React.FC<LocalDeliveryPageProps> = ({
  eyebrow,
  title,
  description,
  angles,
  nextSteps,
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
        primaryCta={{ label: 'Voir les categories', to: '/boutique' }}
        secondaryCta={{ label: 'Voir les services', to: '/services-livraison-drive' }}
        breadcrumbs={seo.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Pourquoi cette page locale existe vraiment" muted>
        <BulletGrid items={angles} />
      </SeoSection>

      <SeoSection title="Pages a consulter depuis cette zone">
        <LinkCardGrid cards={nextSteps} />
      </SeoSection>

      <SeoSection title="Une page locale utile, pas une page clone" muted>
        <BulletGrid
          items={[
            'Cette page reste reliee a une zone de livraison concrete et a des besoins pratiques differents.',
            'Elle ne cherche pas a dupliquer une page de presentation generale de la boucherie.',
            'Les liens sortants renvoient vers les categories et le hub service pour garder une architecture saine.',
            'Le contenu local s appuie sur la proximite, la facilite de recuperation et la pertinence des produits pour le secteur.',
          ]}
        />
      </SeoSection>

      <CtaBand
        title="Commander depuis votre secteur"
        description="Rejoignez la boutique pour choisir vos produits, puis utilisez les informations de service pour confirmer la meilleure option de retrait ou de livraison."
        primary={{ label: 'Aller a la boutique', to: '/boutique' }}
        secondary={{ label: 'Nous contacter', to: '/contact' }}
      />
    </div>
  );
};

export default LocalDeliveryPage;
