import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-burgundy-900 mb-8 border-b-2 border-gold-500 pb-4">Mentions Légales</h1>
        
        <div className="bg-white p-8 rounded-sm shadow-md space-y-6 text-gray-700">
          <p className="italic text-sm text-gray-500 mb-6">
            Cette page identifie qui vous êtes. C'est la "carte d'identité" du site.
          </p>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Éditeur du site</h2>
            <p className="mb-2">
              Le site internet <strong>www.boucheriesidiboucif.fr</strong> est édité par <strong>Boucherie Sidi Boucif</strong>, entreprise immatriculée en France métropolitaine.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Siège social</h2>
            <p>5 Avenue Gambetta, 34500 Béziers</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Immatriculation</h2>
            <p>Inscrite au Registre du Commerce et des Sociétés. Les références complètes (RCS, SIRET, TVA) sont disponibles sur demande en boutique ou par email.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Contact</h2>
            <p>Téléphone : 04 67 XX XX XX</p>
            <p>Email : contact@sidiboucif.fr</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Directeur de la publication</h2>
            <p>Le responsable de la publication est le gérant de la Boucherie Sidi Boucif.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Hébergeur du site</h2>
            <p>Le site est hébergé par :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Nom de l'hébergeur : À préciser par le propriétaire du site.</li>
              <li>Adresse et coordonnées : À préciser selon l'hébergeur choisi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques (notamment le logo et les photos des produits).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
