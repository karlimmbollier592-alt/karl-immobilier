# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack technique

- **Site statique** : HTML/CSS/JS (pas de framework, one-pager simple)
- **Deploiement** : Netlify (CI/CD via GitHub)
- **Repo** : https://github.com/karlimmbollier592-alt/karl-immobilier
- **GitHub client** : karlimmbollier592-alt
- **Domaine** : a connecter (probablement GoDaddy)
- **CRM** : Monday (integration formulaire, phase 2)

## Commandes

```bash
# Dev local : ouvrir index.html dans le navigateur, ou utiliser un serveur local
npx serve .
# ou
python3 -m http.server 8000

# Deploy : push sur main, Netlify deploie automatiquement
git push origin main
```

## Architecture

```
/
├── index.html          # One-pager principal
├── blog/               # Page blog separee (articles SEO)
├── assets/
│   ├── css/            # Styles
│   ├── js/             # Scripts (formulaire, animations)
│   └── images/         # Logo, photos, icones
└── CLAUDE.md
```

> Structure a creer. Le site est un one-pager avec une page blog separee.

## Projet

- **Client :** Karl (entreprise immobiliere, 300+ portes, equipe 15 personnes, croissance rapide)
- **Division :** Acheteur Immobilier Quebec (nouvelle division flip immobilier)
- **Type :** One-pager + page blog (SEO)
- **Budget :** 5-10h a 73$/h
- **Billable :** Oui

## Business model du client

Karl achete des immeubles desuets, les renove, et loue au prix du marche. La nouvelle division "Acheteur Immobilier Quebec" vise a acheter des proprietes de gens en difficulte : retards de paiement, personnes agees, gens qui veulent vendre vite sans courtier. Offre : financement cash en ~10 jours, sans frais de courtier.

## Acquisition de leads

- Source principale : courriels envoyes aux gens en retard de paiement (1 employee dediee 40h/semaine)
- Le site sert a donner de la credibilite quand les gens recoivent le courriel ("ca fait moins scam")
- SEO prevu plus tard (3-6 mois, expert externe)
- Ads possibles eventuellement (pas dans le scope actuel)
- Reseaux sociaux plus tard

## Direction visuelle (NON-NEGOCIABLE)

- **Couleurs :** Blanc et bleu (confiance, professionnel). PAS de noir/sombre.
- **Style :** Ultra simple, intuitif "comme un iPhone". Le public cible n'est pas necessairement a l'aise avec la techno.
- **CTA :** Boutons partout, gros et larges, visibles. Un bouton apres chaque section minimum.
- **Texte :** Peu de texte. Aller droit au but. Mot cle a repeter : "rapide".
- **Formulaire :** Simple, visible, bien place. C'est le coeur de la conversion.
- **Structure one-pager :** Hero > Pourquoi nous (3 points avec icones/photos) > CTA > Formulaire > Infos complementaires (on achete quoi, situations, etc.)
- **Page blog :** Separee, pas apparente sur le one-pager. Pour articles SEO et partage reseaux sociaux.

## Sites de reference

1. **Hostinger (Bangladesh)** : https://teal-ape-667262.hostingersite.com/
   - Structure OK (hero, 3 points, formulaire)
   - Template Envato avec couleurs/logo du client
   - Karl trouve ca "plate" visuellement
2. **Manus AI** : https://immo-rapide-ujvwuqcd.manus.space/
   - Meilleur visuel selon Karl
   - Petits carres avec photos, options visuelles plus accrocheuses
   - Rappels subtils ("rapide" en couleur differente)
   - MAIS : trop de texte, fond noir a enlever, banniere noire pas aimee
   - Formulaire simple et bien fait

**Directive :** Melange des deux. Structure du Bangladesh + visuel/look du Manus, en blanc/bleu.

## Ce que Karl aime specifiquement (du site Manus)

- Les petits carres avec photos pour "pourquoi nous"
- Les rappels subtils pas trop apparents
- Le mot "rapide" en couleur differente (toujours ramener le message de rapidite)
- Les boutons CTA partout (apres chaque section)
- Le formulaire simple

## Ce que Karl n'aime PAS

- Fond noir/sombre
- Trop de texte
- Boutons trop petits
- Look pas professionnel
- Complexite (le public cible = monsieur madame tout le monde)

## Integration Monday (PHASE 2)

- Les soumissions du formulaire doivent rentrer dans le CRM Monday
- Karl n'a pas encore donne les acces Monday. A venir.
- Pas urgent pour le lancement, phase 2
- Luca estime ~1h pour la connexion Monday

## Phases

1. **Phase 1 (en cours)** : Creation du site (one-pager + blog)
2. **Phase 2** : Integration Monday (quand Karl donne les acces)

## Statut

- Setup initial (creation compte GitHub + Netlify par Luca)
- Documentation lue et contexte capture
- Prochaine etape : creation du site (phase 1)

## Lab Notes
