# Site — Perche de nettoyage démontable

Site vitrine **statique** (HTML/CSS/JS, sans build, sans serveur, **sans paiement**)
pour une perche de nettoyage démontable vendue sur Amazon.fr. L'achat renvoie
vers la fiche Amazon ; le site ne traite aucune transaction.

---

## 1. Lancer le site en local

Au choix :

```bash
python3 -m http.server 8080
```

```bash
npx --yes serve -l 8080 .
```

Puis ouvrez `http://localhost:8080`. Aucune installation n'est nécessaire : tout est statique.

---

## 2. Remplir les informations — UN SEUL FICHIER

Tout se règle dans **`js/config.js`**. Renseignez chaque valeur entre guillemets,
enregistrez, rechargez la page. Tant qu'une valeur est vide, le site affiche le
jeton correspondant **surligné en jaune** (ex. `{{PRIX}}`) pour que rien ne soit oublié.

### Champs à compléter (tous dans `js/config.js`)

| Variable | Exemple | Où ça s'affiche |
|---|---|---|
| `NOM_DE_MARQUE` | `AltaReach` | Partout (nom, titres, pied de page) |
| `PRIX` | `49,90 € TTC` | Accueil, produit, boutons |
| `LONGUEUR` | `6 m une fois assemblée` | Accueil, produit, guide, FAQ |
| `POIDS` | `1,3 kg` | Fiche technique |
| `GARANTIE` | `2 ans` | Produit, FAQ, CGV |
| `LIEN_ACHAT` | `https://www.amazon.fr/dp/XXXXXXXXXX` | Tous les boutons « Acheter » |
| `EMAIL` | `contact@ta-marque.fr` | Contact, SAV, pages légales |
| `DELAI_REPONSE_SAV` | `48 h ouvrées` | Contact, guide |
| `RAISON_SOCIALE` | `AltaReach SAS` | Mentions légales, CGV, pied de page |
| `SIRET` | `123 456 789 00012` | Mentions légales |
| `ADRESSE` | `12 rue…, 80000 Amiens` | Mentions légales, contact |
| `FORME_JURIDIQUE` | `SAS au capital de 1 000 €` | Mentions légales |
| `DIRECTEUR_PUBLICATION` | `Prénom Nom` | Mentions légales |
| `RCS` | `RCS Amiens 123 456 789` | Mentions légales |
| `TVA_INTRA` | `FR 00 123456789` | Mentions légales |
| `HEBERGEUR` | `Vercel Inc., …` | Mentions légales |

> `ANNEE` est automatique (année en cours), pas besoin d'y toucher.

### À remplacer AUSSI (hors `config.js`, par recherche-remplacement)

- **`VOTRE-DOMAINE.fr`** → votre vrai domaine, dans `sitemap.xml` et `robots.txt`.
- **`<lastmod>`** dans `sitemap.xml` → la date de dernière modification.
- **Les 5 images** `images/*.jpg` sont des **visuels générés par IA** (maquettes).
  À remplacer par les **photos réelles** du produit (mêmes noms de fichiers =
  aucun autre changement). Une mention « visuels générés… » est affichée tant
  que ce n'est pas fait.
- **La vidéo** du guide : l'emplacement est prêt dans `guide.html` (cherchez
  « Emplacement vidéo »), à remplacer par une balise `<video>` ou un `<iframe>`.

---

## 3. Le formulaire de contact

Pour l'instant, à l'envoi, le formulaire **ouvre le logiciel de messagerie** du
visiteur avec le message pré-rempli vers votre `EMAIL`. Rien n'est transmis à un
serveur (aucune donnée stockée, cohérent avec la politique de confidentialité).

Pour un **envoi automatique** (réception sans que le client ait à utiliser son
mail), il faudra brancher un service d'envoi de formulaire. Deux options :
- un service tiers (type Formspree, Basin…) : changez l'`action` du formulaire ;
- votre propre point d'entrée d'envoi d'e-mail.

Dans les deux cas, **mettez à jour la politique de confidentialité** (destinataire,
sous-traitant, durée de conservation) en conséquence.

---

## 4. Déploiement

Site 100 % statique : déployable sur n'importe quel hébergeur de fichiers
(Vercel, Netlify, OVH, o2switch, un simple serveur web…).

- Un `vercel.json` est fourni (URLs propres + en-têtes de sécurité de base).
- **Rien n'est publié automatiquement.** Le déploiement reste à votre main.

---

## 5. Structure des fichiers

```
index.html            Accueil
produit.html          Page produit (galerie, specs, montage, FAQ)
guide.html            Guide d'utilisation et d'entretien (+ emplacement vidéo)
contact.html          Contact & SAV (formulaire validé)
mentions-legales.html \
cgv.html               |
confidentialite.html   > Pages légales (MODÈLES — à faire relire, voir §6)
retours.html           |
cookies.html          /
404.html              Page d'erreur
css/style.css         Styles (bleu profond + gris, mobile-first, accessible)
js/config.js          >>> LE FICHIER À REMPLIR <<<
js/placeholders.js    Remplace les {{...}} par vos valeurs
js/main.js            Navigation, galerie, validation formulaire, bandeau cookies
images/               5 maquettes IA à remplacer par les vraies photos
sitemap.xml, robots.txt   SEO
```

SEO de base en place : `<title>` et `<meta description>` uniques par page,
Open Graph, `canonical`, `sitemap.xml`, `robots.txt`, favicon, HTML sémantique.

---

## 6. ⚠️ AVANT L'OUVERTURE AU PUBLIC — à ne pas négliger

Le site est techniquement prêt, mais plusieurs points **juridiques et commerciaux**
doivent être réglés avant d'ouvrir aux vrais clients. Ils ne sont **pas** de mon
ressort et demandent une validation humaine/professionnelle :

1. **Marque** — vérifier la disponibilité du nom choisi et, si besoin, le déposer
   (INPI). Vérifier qu'il n'empiète pas sur une marque existante.
2. **Statut légal / entreprise** — créer ou confirmer la structure (micro-entreprise,
   SAS…), obtenir SIRET, RCS, n° de TVA, et renseigner les mentions légales.
3. **Assurance** — vérifier la couverture (responsabilité civile professionnelle,
   responsabilité du fait des produits). Un produit utilisé en hauteur comporte un
   risque de chute/blessure.
4. **Conformité produit** — marquage/normes applicables, sécurité, notice, et la
   question de l'électricité (aluminium conducteur : avertissement déjà présent
   dans le guide, à faire valider).
5. **Pages légales** — les 5 modèles (mentions, CGV, confidentialité, retours,
   cookies) sont des **gabarits génériques** à **faire relire par un avocat/juriste**
   et à adapter à votre canal de vente réel (Amazon) et à votre situation. Un
   avertissement en ce sens est affiché en tête de chaque page.
6. **Données chiffrées** — longueur, poids, dimensions, prix, garantie : **aucun
   chiffre n'a été inventé**. À mesurer/confirmer sur le produit réel avant mise en ligne.
7. **Photos & vidéo réelles** — remplacer les 5 maquettes IA et ajouter la vidéo.
8. **Domaine + SEO** — acheter le domaine, remplacer `VOTRE-DOMAINE.fr`, soumettre
   le `sitemap.xml` à Google Search Console.

---

## 7. Ce que je n'ai PAS pu vérifier (à contrôler de votre côté)

- **L'exactitude juridique** des modèles légaux au regard de votre situation
  précise et des évolutions du droit — je ne suis pas juriste ; relecture pro requise.
- **Les caractéristiques réelles du produit** (longueur « 6 m » visée, poids,
  dimensions démonté, nombre exact de tronçons) : non mesurées, laissées en champs à remplir.
- **Les règles Amazon** applicables à un site qui renvoie vers une fiche Amazon
  (conditions du programme, liens, usage de la marque) : à vérifier dans vos conditions vendeur.
- **Les consignes de lavage définitives des têtes** (température, passage en
  machine) : j'ai mis des méthodes usuelles, à confirmer avec la notice du fabricant.
- **La disponibilité / l'antériorité du nom de marque** : non vérifiée.
- **Le comportement sur tous les navigateurs/appareils réels** : testé via un
  navigateur Chromium automatisé (rendu, variables, formulaire, nav mobile, galerie —
  tout OK, aucune erreur JS). Un test sur vos propres appareils reste recommandé.

---

## 8. Choix tenus (conformes au cahier des charges)

- Aucun faux avis, fausse statistique, faux stock, ni compte à rebours artificiel.
- Aucune promesse au-delà de ce que le produit fait ; aucune comparaison dénigrante.
- Aucun système de paiement ; bouton d'achat = lien configurable vers Amazon.
- Police système (pas de Google Fonts) : plus rapide et plus simple côté RGPD.
- Accessibilité : lien d'évitement, focus visibles, contrastes AA, navigation
  clavier, FAQ en `<details>`, formulaire avec libellés et messages d'erreur liés.
