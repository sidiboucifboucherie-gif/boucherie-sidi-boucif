import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-burgundy-900 mb-8 border-b-2 border-gold-500 pb-4">Politique de Confidentialité (RGPD)</h1>
        
        <div className="bg-white p-8 rounded-sm shadow-md space-y-6 text-gray-700">
          <p className="italic text-sm text-gray-500 mb-6">
            Cette page explique ce que vous faites des données des clients.
          </p>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Collecte des données</h2>
            <p>
              Dans le cadre de son activité, la Boucherie Sidi Boucif est amenée à collecter des données personnelles (nom, prénom, adresse, email, téléphone) notamment lors de la prise de commande ou de l'inscription à la newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Finalité des données</h2>
            <p>Ces données sont nécessaires pour :</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>La gestion et le suivi de vos commandes.</li>
              <li>La livraison ou le retrait en boutique (Click & Collect).</li>
              <li>L'envoi d'informations promotionnelles (uniquement si vous l'avez accepté).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Transmission des données</h2>
            <p>
              Vos données ne sont transmises à aucun tiers à des fins commerciales. Elles peuvent être transmises à nos prestataires techniques (ex: système de paiement sécurisé, livreur) uniquement pour la bonne exécution du service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, contactez-nous par mail à : contact@sidiboucif.fr.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Cookies</h2>
            <p>
              Ce site utilise des cookies pour améliorer votre expérience utilisateur et réaliser des statistiques de visites. Vous pouvez configurer votre navigateur pour refuser les cookies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
