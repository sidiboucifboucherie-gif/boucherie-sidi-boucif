import React from 'react';
import Story from '../components/Story';
import FAQSection from '../components/FAQSection';

const StoryPage: React.FC = () => {
  return (
    <>
      <div className="pt-20">
        <Story />
      </div>
      <FAQSection
        title="Questions fréquentes"
        subtitle="En savoir plus sur notre boucherie halal à Béziers"
        items={[
          {
            question: "Depuis combien de temps la boucherie Sidi Boucif existe-t-elle ?",
            answer:
              "La Boucherie Sidi Boucif est présente à Béziers depuis plusieurs années et perpétue un savoir-faire artisanal transmis de génération en génération.",
          },
          {
            question: "Quelles sont vos spécialités en boucherie halal ?",
            answer:
              "Nous proposons une sélection de viandes halal de qualité : bœuf VBF maturé, volailles fermières Label Rouge, agneau, veau, merguez maison et triperie artisanale préparée sur place.",
          },
          {
            question: "Travaillez-vous uniquement avec de la viande halal ?",
            answer:
              "Oui, toute la viande vendue à la Boucherie Sidi Boucif est halal. Nous travaillons avec des abattoirs certifiés et contrôlons rigoureusement chaque approvisionnement.",
          },
          {
            question: "Puis-je vous rendre visite sans commande en ligne ?",
            answer:
              "Bien sûr, vous pouvez venir directement en magasin à Béziers pendant nos horaires d'ouverture pour choisir vos pièces de viande et bénéficier de nos conseils.",
          },
        ]}
      />
    </>
  );
};

export default StoryPage;
