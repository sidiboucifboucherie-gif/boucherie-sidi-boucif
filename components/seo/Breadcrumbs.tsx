import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

const Breadcrumbs: React.FC<{ items: BreadcrumbItem[]; light?: boolean }> = ({ items, light = false }) => {
  const linkClass = light ? 'text-gray-200 hover:text-gold-400' : 'text-gray-500 hover:text-burgundy-900';
  const currentClass = light ? 'text-white' : 'text-burgundy-900';
  const iconClass = light ? 'text-white/50' : 'text-gray-400';

  return (
    <nav aria-label="Fil d'ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={`${item.label}-${index}`}>
            <li>
              {item.to && index !== items.length - 1 ? (
                <Link to={item.to} className={`transition-colors ${linkClass}`}>
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${currentClass}`}>{item.label}</span>
              )}
            </li>
            {index < items.length - 1 && <ChevronRight size={14} className={iconClass} />}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
