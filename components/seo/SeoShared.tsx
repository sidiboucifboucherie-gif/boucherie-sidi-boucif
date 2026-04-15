import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs, { BreadcrumbItem } from './Breadcrumbs';

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  breadcrumbs?: BreadcrumbItem[];
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
  muted?: boolean;
};

type CardLink = {
  title: string;
  description: string;
  to: string;
  meta?: string;
};

export const SeoHero: React.FC<HeroProps> = ({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  breadcrumbs,
}) => (
  <section
    className="pt-32 pb-20 text-white overflow-hidden relative"
    style={{
      background:
        'linear-gradient(135deg, rgba(74,4,16,1) 0%, rgba(109,7,26,1) 45%, rgba(26,26,26,1) 100%)',
    }}
  >
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.55),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.16),_transparent_25%)]"></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} light />}
      <div className="max-w-4xl">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-bold mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">{title}</h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-8">{description}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to={primaryCta.to}
          className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold px-7 py-4 rounded-sm transition-colors"
        >
          {primaryCta.label}
        </Link>
        {secondaryCta && (
          <Link
            to={secondaryCta.to}
            className="inline-flex items-center justify-center border border-white/30 hover:border-gold-500 hover:text-gold-400 text-white font-bold px-7 py-4 rounded-sm transition-colors"
          >
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  </section>
);

export const LocalTrustPanel: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-4'} gap-4`}>
    <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold mb-2">Adresse</p>
      <p className="text-gray-700 leading-relaxed">5 Avenue Gambetta, 34500 Beziers</p>
    </div>
    <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold mb-2">Telephone</p>
      <p className="text-gray-700 leading-relaxed">04 67 28 27 88</p>
    </div>
    <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold mb-2">Zone</p>
      <p className="text-gray-700 leading-relaxed">Beziers et communes proches desservies</p>
    </div>
    <div className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold mb-2">Promesse</p>
      <p className="text-gray-700 leading-relaxed">Viande halal, savoir-faire artisanal et service local</p>
    </div>
  </div>
);

export const SeoSection: React.FC<SectionProps> = ({ title, children, muted = false }) => (
  <section className={muted ? 'py-16 bg-stone-50' : 'py-16 bg-white'}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-burgundy-900 mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

export const BulletGrid: React.FC<{ items: string[]; columns?: string }> = ({
  items,
  columns = 'md:grid-cols-2',
}) => (
  <div className={`grid grid-cols-1 ${columns} gap-4`}>
    {items.map((item) => (
      <div key={item} className="bg-white border border-stone-200 rounded-sm p-5 shadow-sm">
        <p className="text-gray-700 leading-relaxed">{item}</p>
      </div>
    ))}
  </div>
);

export const LinkCardGrid: React.FC<{ cards: CardLink[]; columns?: string }> = ({
  cards,
  columns = 'md:grid-cols-2',
}) => (
  <div className={`grid grid-cols-1 ${columns} gap-6`}>
    {cards.map((card) => (
      <Link
        key={card.to}
        to={card.to}
        className="block bg-white border border-stone-200 rounded-sm p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
      >
        {card.meta && <p className="text-xs uppercase tracking-[0.25em] text-gold-600 font-bold mb-3">{card.meta}</p>}
        <h3 className="text-xl font-serif font-bold text-dark-900 mb-3">{card.title}</h3>
        <p className="text-gray-600 leading-relaxed">{card.description}</p>
      </Link>
    ))}
  </div>
);

export const CtaBand: React.FC<{
  title: string;
  description: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}> = ({ title, description, primary, secondary }) => (
  <section className="py-16 bg-burgundy-900 text-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{title}</h2>
      <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to={primary.to}
          className="inline-flex items-center justify-center bg-gold-500 hover:bg-gold-600 text-burgundy-900 font-bold px-7 py-4 rounded-sm transition-colors"
        >
          {primary.label}
        </Link>
        {secondary && (
          <Link
            to={secondary.to}
            className="inline-flex items-center justify-center border border-white/30 hover:border-gold-500 hover:text-gold-400 text-white font-bold px-7 py-4 rounded-sm transition-colors"
          >
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  </section>
);
