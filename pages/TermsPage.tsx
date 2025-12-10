import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-12 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-burgundy-900 mb-8 border-b-2 border-gold-500 pb-4">Conditions Générales de Vente (CGV)</h1>
        
        <div className="bg-white p-8 rounded-sm shadow-md space-y-6 text-gray-700">
          <p className="italic text-sm text-gray-500 mb-6">
            C'est le contrat de vente.
          </p>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 1 : Objet</h2>
            <p>
              Les présentes conditions régissent les ventes par la société Boucherie Sidi Boucif de produits de boucherie, charcuterie et gastronomie.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 2 : Prix</h2>
            <p>
              Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC).
            </p>
            <p className="mt-2 font-medium">Spécificité boucherie :</p>
            <p>
              Pour les produits vendus au poids, le prix final peut varier légèrement (à +/- 5%) selon la découpe exacte réalisée par nos artisans bouchers. Le client accepte cette variation inhérente au travail artisanal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 3 : Commandes</h2>
            <p>
              Les commandes sont passées sur le site internet. La Boucherie Sidi Boucif se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 4 : Paiement</h2>
            <p>
              Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le règlement s'effectue par carte bancaire via notre système sécurisé [NOM DU SYSTÈME, ex: Stripe/PayPal] ou au comptoir lors du retrait (si option activée).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 5 : Retrait et Livraison</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-burgundy-700">Retrait en boutique (Click & Collect) :</h3>
                <p>Les produits sont à retirer à l'adresse : 5 Avenue Gambetta, 34500 Béziers aux horaires d'ouverture.</p>
              </div>

              <div>
                <h3 className="font-bold text-burgundy-700">Livraison :</h3>
                <p>[SI VOUS LIVREZ, PRÉCISEZ ICI : "Nous livrons dans un rayon de X km..." OU "Livraison via Chronofresh..."].</p>
              </div>

              <div>
                <h3 className="font-bold text-burgundy-700">Respect de la chaîne du froid :</h3>
                <p>La boucherie garantit le respect de la chaîne du froid jusqu'à la remise des produits au client. Une fois la remise effectuée, il appartient au client de conserver les produits au réfrigérateur (entre 0°C et 4°C).</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 6 : Droit de rétractation (Important)</h2>
            <p>
              Conformément à l'article L221-28 du Code de la Consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture de biens susceptibles de se détériorer ou de se périmer rapidement.
            </p>
            <p className="mt-2 text-red-700 font-medium">
              Par conséquent, aucune rétractation ni retour ne sera accepté pour les produits frais (viandes, charcuteries, plats traiteurs) une fois la commande validée ou récupérée, pour des raisons d'hygiène et de sécurité alimentaire.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-burgundy-800 mb-3">Article 7 : Litiges</h2>
            <p>
              Les présentes conditions sont soumises à la loi française. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français seront seuls compétents.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
