import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, subtitle, items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-burgundy-800 text-sm font-bold tracking-widest uppercase mb-2">
              {title}
            </h2>
          )}
          {subtitle && (
            <h2 className="text-3xl font-serif font-bold text-dark-900">
              {subtitle}
            </h2>
          )}
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-sm bg-white shadow-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left focus:outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base text-burgundy-900">
                    {item.question}
                  </span>
                  <span
                    className={`ml-4 text-gold-500 transform transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-700 border-t border-gray-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

