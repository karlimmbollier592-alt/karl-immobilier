# Prompt de depart - Gemini dans Cursor (UI)

Copier-coller ce prompt dans Cursor (Gemini) ouvert sur ce projet :

---

Lis le CLAUDE.md du projet pour avoir tout le contexte client. Ensuite, construis le site "Acheteur Immobilier Quebec" en HTML/CSS/JS statique. Pas de framework, pas de build step. Le site doit etre deployable tel quel sur Netlify.

## Ce que tu dois construire

Un one-pager avec une page blog separee. Le site fusionne deux references que Karl a fournies. Voici exactement quoi prendre de chaque :

### Du site Manus (le visuel prefere de Karl)
- Le hero clean avec badges visuels (ex: "24h", "0$", "100+")
- Les petits carres/cards avec icones pour "pourquoi nous"
- Le processus en 3 etapes numerotees (01, 02, 03)
- Le formulaire simple et bien structure
- Les rappels subtils (le mot "rapide" mis en evidence en couleur differente)
- Les CTA partout, apres chaque section
- Le layout moderne, aere, avec beaucoup d'espace blanc

### Du site Hostinger (la structure)
- Le menu de navigation (Home, A propos, Contact, Blog)
- La section "situations" (divorce, succession, retard de paiement, etc.)
- La section video YouTube
- La section blog avec 3 articles
- Le footer avec infos de contact et liens

## Direction visuelle (NON-NEGOCIABLE)

- **Palette :** Blanc (#ffffff) pour le fond principal, bleu (#2563EB ou similaire, ton professionnel) pour les accents/boutons/header, texte noir/gris fonce
- **ZERO noir/sombre en fond.** Tout est lumineux et clean.
- **Boutons CTA :** Gros, larges, bleu plein avec texte blanc. Coins arrondis. Un apres CHAQUE section minimum. Tous pointent vers le formulaire (#formulaire).
- **Typographie :** Grande, lisible, sans-serif moderne (Inter, DM Sans, ou system font). Le public cible inclut des personnes agees pas a l'aise avec la techno.
- **Mot cle "rapide" :** A chaque fois qu'il apparait dans le texte, le mettre en bleu ou en gras-bleu pour qu'il ressorte visuellement.
- **Mobile-first :** Le site doit etre impeccable sur mobile. C'est la que la majorite du trafic va arriver (courriels ouverts sur telephone).

## Structure exacte du one-pager (dans cet ordre)

### 1. Header fixe
- Logo texte : "AIQ" ou "Acheteurs Immobiliers Quebec" en blanc sur fond bleu
- Navigation : Accueil | A propos | Blog | Contact
- CTA header : "Obtenir mon offre gratuite" (bouton qui scroll vers #formulaire)

### 2. Hero
- Titre : "Vendez votre propriete rapidement, sans tracas"
- Sous-titre : "Nous achetons directement votre maison, plex ou immeuble. Sans commission. Sans renovation. Sans delai."
- Ligne d'accroche : "Recevez une offre en moins de 24h. Aucun courtier. Aucun frais."
- 3 badges visuels : "24h" (delai offre) | "0$" (frais) | "100+" (proprietaires)
- CTA : "Recevoir une offre gratuite"
- Image placeholder a droite (maison/immeuble, on mettra la vraie photo plus tard)

### 3. Pourquoi nous (3 cards)
- Titre section : "Pourquoi vendre avec nous?"
- Card 1 : "Rapidite et simplicite" - icone horloge - texte court
- Card 2 : "Paiement comptant" - icone dollar - texte court
- Card 3 : "Transaction securisee" - icone bouclier - texte court
- CTA sous les cards : "Obtenir mon offre"

### 4. Situations (on achete dans toutes ces situations)
- Titre : "Vous vous reconnaissez?"
- Liste visuelle (icones ou checkmarks) :
  - Retard de paiements hypothecaires
  - Separation ou divorce
  - Succession ou propriete heritee
  - Besoin de vendre rapidement
  - Propriete difficile a vendre
  - Travaux importants necessaires
- Message : "On s'occupe de tout. Vous n'avez rien a gerer."
- CTA : "Parlez-nous de votre situation"

### 5. Processus en 3 etapes
- Titre : "Un processus simple en 3 etapes"
- Etape 01 : "Remplissez le formulaire" - "En 2 minutes, donnez-nous les infos de base."
- Etape 02 : "Recevez une offre rapide" - "Notre equipe analyse et vous contacte en 24h."
- Etape 03 : "Choisissez votre date" - "Vous acceptez et on conclut a votre rythme."
- CTA : "Commencer maintenant"

### 6. Formulaire (#formulaire)
- Titre : "Obtenez votre offre gratuite"
- Sous-titre : "Remplissez le formulaire. Notre equipe vous contacte en 24h."
- Champs :
  - Votre nom (text, requis)
  - Votre telephone (tel, requis)
  - Adresse de la propriete (text, requis)
  - Type de propriete (select : Maison / Plex / Immeuble / Terrain / Autre)
  - Votre situation (select optionnel : Vente rapide / Succession / Separation / Retard paiement / Autre)
  - Message (textarea, optionnel)
- Bouton : "Obtenir mon offre gratuite" (gros, bleu, toute la largeur)
- Mentions sous le bouton : "Gratuit. Sans engagement. Reponse en 24h."
- Pour l'instant, le formulaire envoie a un endpoint Netlify Forms (ajouter data-netlify="true" et name="contact" sur le form)

### 7. Section video
- Titre : "Decouvrez comment on peut vous aider"
- Embed YouTube placeholder (on mettra la vraie video plus tard, utilise l'ID XHOmBV4js_E pour l'instant)
- CTA : "Planifier une rencontre"

### 8. Section blog (apercu)
- Titre : "Articles et conseils"
- 3 cards d'articles placeholder (titre, date, extrait, "Lire la suite")
- Lien "Voir tous les articles" vers /blog/

### 9. Footer
- Logo + tagline : "Nous achetons les proprietes rapidement, sans commission et sans tracas."
- Contact : telephone 819-609-2810, email info@acheteurimmobilierquebec.com
- Localisation : Trois-Rivieres, Quebec
- Liens : Accueil | A propos | Blog | Contact
- Copyright 2025

### 10. Page blog (blog/index.html)
- Header et footer identiques au one-pager
- Liste de 3 articles placeholder
- Chaque article : titre, date, image placeholder, extrait
- Structure prete pour que Karl ou un expert SEO ajoute du contenu plus tard

## Infrastructure

- **Repo GitHub** : https://github.com/karlimmbollier592-alt/karl-immobilier (deja connecte en remote)
- **Deploiement** : Netlify, connecte au repo. Chaque push sur `main` declenche un deploy automatique.
- **Formulaire** : Utiliser Netlify Forms (ajouter `data-netlify="true"` et `name="contact"` sur la balise `<form>`). Netlify detecte automatiquement le formulaire au deploy et collecte les soumissions dans le dashboard Netlify du client. Pas besoin de backend.
- **Domaine** : sera connecte plus tard (probablement GoDaddy). Pour l'instant le site sera accessible via l'URL Netlify auto-generee.

## Contraintes techniques

- HTML/CSS/JS pur. Pas de React, pas de Tailwind, pas de framework.
- Un seul fichier CSS principal (assets/css/style.css)
- JS minimal (smooth scroll, menu mobile, formulaire)
- Formulaire integre avec Netlify Forms (data-netlify="true")
- Responsive mobile-first
- Performance : pas de fonts externes lourdes (utiliser system font stack ou une seule Google Font legere)
- SEO de base : meta title, meta description, Open Graph tags, balises semantiques (header, main, section, footer)
- Accessibilite de base : alt sur les images, labels sur les champs, contraste suffisant

## Structure des fichiers

```
/
├── index.html
├── blog/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── (placeholders)
├── .gitignore
└── CLAUDE.md
```

## Important

- Commence par lire le CLAUDE.md pour le contexte complet
- Ne fais PAS de commit. Luca va reviewer avant.
- Si tu as un doute sur une decision visuelle, choisis toujours l'option la plus simple et la plus clean.
- Le public cible : des gens en difficulte financiere, parfois ages, pas tech-savvy. Chaque element doit etre evident et rassurant.
