import React from 'react';
import PageSeo from '../components/seo/PageSeo';
import { LinkCardGrid, SeoHero, SeoSection, BulletGrid, CtaBand, LocalTrustPanel } from '../components/seo/SeoShared';
import { seoCategories, seoLocalPages } from '../data/seoContent';
import { breadcrumbSchema, pageMeta } from '../data/seoMeta';

const ServiceHubPage: React.FC = () => {
  const meta = pageMeta.serviceHub;

  return (
    <div className="bg-white">
      <PageSeo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        structuredData={[...(meta.structuredData || []), breadcrumbSchema(meta.breadcrumbs || [], meta.path)]}
      />
      <SeoHero
        eyebrow="Services"
        title="Commande en ligne, click & collect et livraison de viande halal a Beziers"
        description="Cette page regroupe toute l intention service en un seul hub : commander, retirer en boutique ou se faire livrer a Beziers et dans les communes proches, sans dupliquer ces informations sur les pages produits."
        primaryCta={{ label: 'Commander nos viandes', to: '/boutique' }}
        secondaryCta={{ label: 'Voir les zones de livraison', to: '/delivery' }}
        breadcrumbs={meta.breadcrumbs}
      />

      <SeoSection title="Repere local utile">
        <LocalTrustPanel compact />
      </SeoSection>

      <SeoSection title="Comment commander simplement" muted>
        <BulletGrid
          items={[
            'Choisissez vos categories de viande et vos produits depuis la boutique.',
            'Validez votre panier en ligne avec vos informations de livraison ou de retrait.',
            'Confirmez le meilleur mode de recuperation selon votre zone : boutique, click and collect ou livraison locale.',
            'Recevez une viande preparee avec soin, dans le respect de la fraicheur et de la chaine du froid.',
          ]}
        />
      </SeoSection>

      <SeoSection title="Nos zones de service local">
        <LinkCardGrid
          cards={seoLocalPages.map((page) => ({
            title: page.title,
            description: page.description,
            to: page.path,
            meta: 'Page locale de service',
          }))}
        />
      </SeoSection>

      <SeoSection title="Les categories a privilegier pour une commande locale" muted>
        <LinkCardGrid
          columns="md:grid-cols-2 lg:grid-cols-4"
          cards={seoCategories.slice(0, 4).map((category) => ({
            title: category.title,
            description: category.description,
            to: category.path,
            meta: 'Categorie',
          }))}
        />
      </SeoSection>

      <SeoSection title="Ce que cette page doit rassurer">
        <BulletGrid
          items={[
            'La logistique reste claire : les informations de livraison sont centralisees au meme endroit.',
            'Le service n empiète pas sur l intention categorie : la boutique reste le lieu de choix des produits.',
            'Les zones locales sont traitees uniquement la ou un angle utile et reel existe.',
            'Le client comprend rapidement vers quelle page aller ensuite pour commander.',
          ]}
        />
      </SeoSection>

      <CtaBand
        title="Passez de l information au panier"
        description="Une fois le mode de commande clarifie, vous pouvez rejoindre directement la boutique ou nous contacter pour une demande particuliere."
        primary={{ label: 'Acceder a la boutique', to: '/boutique' }}
        secondary={{ label: 'Poser une question', to: '/contact' }}
      />
    </div>
  );
};

export default ServiceHubPage;
