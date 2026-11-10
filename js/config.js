/* =========================================================================
   CONFIGURATION DU SITE — un seul fichier à remplir.
   Renseigne chaque valeur entre guillemets, puis enregistre. Les champs
   laissés vides ("") restent affichés en évidence sur le site tant qu'ils
   ne sont pas complétés, pour que rien ne soit oublié avant l'ouverture.
   Aucun chiffre n'a été inventé : tout ce qui est vide doit être vérifié.
   ========================================================================= */
window.SITE_CONFIG = {

  /* ---- Marque & produit ---- */
  NOM_DE_MARQUE: "",        // ex : "AltaReach"  (apparaît partout, à remplir une seule fois)
  PRIX: "",                 // ex : "49,90 € TTC"  (ne pas inventer — prix réel)
  LONGUEUR: "",             // ex : "6 m une fois assemblée"
  POIDS: "",                // ex : "1,3 kg"
  GARANTIE: "",             // ex : "2 ans"

  /* ---- Lien d'achat (aucun paiement sur le site) ---- */
  LIEN_ACHAT: "",           // ex : "https://www.amazon.fr/dp/XXXXXXXXXX"  (fiche Amazon)

  /* ---- Service après-vente ---- */
  EMAIL: "",                // ex : "contact@ta-marque.fr"  (sert au SAV et aux pages légales)
  DELAI_REPONSE_SAV: "",    // ex : "48 h ouvrées"

  /* ---- Informations légales (à faire relire par un professionnel) ---- */
  RAISON_SOCIALE: "",       // ex : "AltaReach SAS"
  SIRET: "",                // ex : "123 456 789 00012"
  ADRESSE: "",              // ex : "12 rue de l'Exemple, 80000 Amiens, France"
  FORME_JURIDIQUE: "",      // ex : "SAS au capital de 1 000 €" / "micro-entreprise"
  DIRECTEUR_PUBLICATION: "",// ex : "Prénom Nom"
  RCS: "",                  // ex : "RCS Amiens 123 456 789"  (ou "" si non applicable)
  TVA_INTRA: "",            // ex : "FR 00 123456789"  (ou "" si non assujetti)
  HEBERGEUR: "",            // ex : "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA"

  /* ---- Divers ---- */
  ANNEE: "" + new Date().getFullYear()  // année courante pour le pied de page (auto)
};
