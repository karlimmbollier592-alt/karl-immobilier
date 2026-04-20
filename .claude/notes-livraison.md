# Notes de livraison - Karl Immobilier (Acheteur Immobilier Quebec)

> Ce fichier capture le contexte complet du projet pour la livraison client.
> Utilise par le skill actionflow-livraison-client pour generer les documents finaux.

## Client
- **Nom :** Karl Lafreniere
- **Entreprise :** Acheteur Immobilier Quebec (division flip de Gestion 1030)
- **Equipe :** ~15 personnes, 300+ portes
- **Contact technique :** Xavier Cloutier (admin Monday, createur d'automatisations)

## Ce qui a ete livre

### 1. Site web one-pager (Phase 1)
- **Stack :** HTML/CSS/JS statique, deploye sur WHC via GitHub Actions (FTPS)
- **Repo :** github.com/karlimmbollier592-alt/karl-immobilier
- **URL :** https://acheteursimmobiliersquebec.com (+ .ca redirige vers .com)
- **Design :** Inspire de la charte graphique AIQ (blanc/bleu), framework StoryBrand SB7
- **Sections :** Hero, Situations (probleme), Types de proprietes, Pourquoi nous (guide), Processus 3 etapes, FAQ (objections), Formulaire, Reassurance finale

### 2. Migration hosting : Netlify → WHC (2026-04-20)

**Pourquoi la migration :**
Le plan Free Netlify de Karl a ete suspendu apres trop de production deploys en peu de temps. Karl avait deja un hebergement WHC (Web Hosting Canada) avec un plan Web Monstre sous gestion1030.com. On a migre le site vers WHC pour eviter les limites de credits Netlify.

**Architecture de l'hebergement (3 plateformes) :**

| Plateforme | Role | URL d'acces | Identifiant |
|---|---|---|---|
| **GoDaddy** | Registraire des domaines (DNS) | https://dcc.godaddy.com/control/portfolio | Compte de Karl |
| **WHC (Web Hosting Canada)** | Hebergement du serveur (fichiers du site) | https://clients.whc.ca | Compte de Karl (KL) |
| **GitHub** | Code source + deploy automatique | https://github.com/karlimmbollier592-alt/karl-immobilier | karlimmbollier592-alt |

**Comment ca se connecte (flux simplifie) :**
1. Le code du site vit sur **GitHub** (repo karl-immobilier)
2. A chaque push sur la branche `main`, **GitHub Actions** uploade automatiquement les fichiers sur le serveur **WHC** via FTPS
3. Les domaines chez **GoDaddy** pointent vers l'IP du serveur WHC, donc quand quelqu'un tape l'URL, il est envoye vers WHC qui sert les fichiers

**Domaines (GoDaddy) :**

| Domaine | A record (DNS) | Comportement |
|---|---|---|
| acheteursimmobiliersquebec.com | 167.114.15.225 (WHC) | Affiche le site |
| www.acheteursimmobiliersquebec.com | CNAME → @ | Affiche le site |
| acheteursimmobiliersquebec.ca | 167.114.15.225 (WHC) | Redirige 301 vers le .com |
| www.acheteursimmobiliersquebec.ca | CNAME → @ | Redirige 301 vers le .com |

**Serveur WHC (cPanel) :**
- **Panneau d'administration :** cPanel, accessible via WHC → Hebergement → Gerer → Connexion cPanel
- **Serveur :** beaubien.web-dns1.com
- **Compte cPanel :** gestio91
- **Plan :** Web Monstre
- **IP DNS (pour les A records) :** 167.114.15.225
- **IP SFTP (pour le deploy) :** 148.113.170.104
- **Dossier du site sur le serveur :** /home/gestio91/acheteursimmobiliersquebec.com/
- **Autres sites sur le meme serveur (NE PAS TOUCHER) :** gestion1030.com, le1030.com, habiko.ca, shop.gestion1030.com
- **SSL :** AutoSSL Let's Encrypt, renouvellement automatique (.com expire 2026-07-19, .ca expire 2026-05-13)
- **HTTPS force :** via fichier .htaccess dans le dossier du site (redirection 301 HTTP → HTTPS)
- **.htaccess du .ca :** dans /home/gestio91/acheteursimmobiliersquebec.ca/, redirige tout le trafic vers le .com

**Deploy automatique (GitHub Actions) :**

| Branche | Workflow | Deploie vers | Compte FTP |
|---|---|---|---|
| `main` | deploy.yml | acheteursimmobiliersquebec.com (production) | deploy@acheteursimmobiliersquebec.com |
| `dev` | deploy-preview.yml | preview.acheteursimmobiliersquebec.com (staging) | preview@acheteursimmobiliersquebec.com |

- **Methode :** FTPS (FTP over TLS, port 21) via l'action SamKirkland/FTP-Deploy-Action@v4.3.5
- **Declencheur :** chaque push sur la branche respective OU declenchement manuel (onglet Actions → Run workflow)
- **Duree d'un deploy :** ~24 secondes
- **Ou voir les deploys :** GitHub → onglet Actions

**Secrets GitHub (repo Settings → Security → Secrets and variables → Actions) :**
- FTP_SERVER = 148.113.170.104
- FTP_USERNAME = deploy@acheteursimmobiliersquebec.com
- FTP_PASSWORD = (stocke dans GitHub, pas dans le code)
- PREVIEW_FTP_USERNAME = preview@acheteursimmobiliersquebec.com
- PREVIEW_FTP_PASSWORD = (stocke dans GitHub, pas dans le code)

**Sous-domaine preview (staging) :**
- **URL :** https://preview.acheteursimmobiliersquebec.com
- **Dossier serveur :** /home/gestio91/preview.acheteursimmobiliersquebec.com/
- **Compte FTP :** preview@acheteursimmobiliersquebec.com (chroote dans le dossier preview)
- **DNS :** A record "preview" dans GoDaddy → 167.114.15.225
- **SSL :** AutoSSL Let's Encrypt actif
- **But :** Karl et ses partenaires peuvent voir le vrai site en developpement. Le public ne connait pas cette URL.

**Strategie de branches (IMPORTANT) :**
- **`main`** = page "en construction" (logo AIQ, bleu fonce, "Notre site sera disponible sous peu"). C'est ce que le public voit sur acheteursimmobiliersquebec.com. Le workflow deploy.yml deploie SEULEMENT le index.html + logo (pas tout le repo).
- **`dev`** = le vrai site complet. C'est la branche de travail. Chaque push deploie sur preview.acheteursimmobiliersquebec.com via deploy-preview.yml.
- **NE PAS merger main dans dev** (ca ecrase le vrai site par la page "en construction"). Travailler sur `dev` et merger `dev` dans `main` seulement quand le site est pret a aller en production.
- Quand le site est approuve par Karl : restaurer le workflow deploy.yml original (deploy complet, pas juste coming-soon) et merger `dev` dans `main`.

**Ce qui a ete fait concretement (session 2026-04-20) :**
1. **DNS GoDaddy** : A records des deux domaines (.com et .ca) pointes vers 167.114.15.225, A record "preview" ajoute
2. **cPanel WHC** : domaines ajoutes (etaient deja faits par Karl), SSL active sur .com/.ca/preview, HTTPS force
3. **Comptes FTP** : 2 comptes isoles crees (deploy@ pour prod, preview@ pour staging), pour ne pas utiliser le mot de passe principal de Karl
4. **GitHub Actions** : 2 workflows crees (deploy.yml pour main, deploy-preview.yml pour dev)
5. **Page "en construction"** : deployee sur production avec logo AIQ et couleurs de la charte
6. **Vrai site** : deploye sur preview pour que Karl puisse le montrer a ses partenaires

**Impact sur Monday :**
Les Netlify Functions (monday-lead.js) ne fonctionnent PAS sur WHC. L'integration Monday devra etre reecrite en PHP ou hebergee separement. A traiter en phase 2.

### 3. Integration Monday CRM (Phase 2)
- **Fonctionnement :** Netlify Function serverless (`monday-lead.js`) appelle l'API Monday GraphQL
- **Flux :** Formulaire → Netlify Function → 2 items crees dans Monday :
  1. **Contact** dans "Contacts - Vendeurs" (board 18398529738) : nom + telephone
  2. **Lead** dans "Pipeline Flip - Proprietes" (board 18398557132) : adresse, source "Site Web", etape "Nouveau lead", date du jour, groupe "Nouveaux leads - Site Web"
- **Token API :** Variable d'environnement `MONDAY_API_TOKEN` dans Netlify (genere par Karl)
- **Colonnes utilisees :**
  - Pipeline : `text_mm07kbrb` (Ville/adresse), `color_mm08hgqf` (Etape du lead), `color_mm073m73` (Source), `date_mm072893` (Date d'entree)
  - Contacts : `contact_phone` (Telephone)

### 4. Automatisation Monday ajoutee
- **Pourquoi :** L'API Monday CRM ne supporte pas l'ecriture sur les colonnes `board_relation` (connexion entre boards). L'appel API retourne un succes mais le lien n'est jamais persiste. C'est une limitation documentee de Monday CRM (vs Monday Work Management).
- **Solution :** Automatisation native Monday creee dans le board Pipeline Flip : "Quand un item est cree dans le groupe Nouveaux leads - Site Web, connecter au dernier contact cree dans Contacts - Vendeurs."
- **Contexte des automatisations existantes :** Le board avait deja 17 automatisations (par Xavier Cloutier et Karl). Elles gerent le deplacement automatique des items entre groupes selon l'etape du lead. Notre integration s'aligne avec ce systeme : on cree avec l'etape "Nouveau lead" pour que l'automatisation #4 garde l'item dans le bon groupe.

## Points techniques importants pour la doc

### Pourquoi "Nouveau lead" et pas "A contacter"
L'automatisation #2 de Karl ("When item created AND Etape = A contacter → move to A contacter group") deplacait les items hors du groupe "Nouveaux leads - Site Web" instantanement. En utilisant "Nouveau lead", l'automatisation #4 de Xavier ("When Etape changes to Nouveau lead → move to Nouveaux leads - Site Web") maintient l'item dans le bon groupe.

### Telephone : format sans tirets
L'API Monday rejette les numeros de telephone avec tirets/espaces/parentheses. La fonction nettoie le numero avant envoi (`telephone.replace(/[\s\-().]/g, '')`).

### Colonne Location vs Texte
La colonne `location` de Monday exige des coordonnees GPS (lat/lng). On utilise la colonne texte `text_mm07kbrb` (Ville) pour stocker l'adresse en texte libre, plus fiable.

## Fichiers cles
- `index.html` : sur main = page "en construction", sur dev = le vrai site (formulaire section #formulaire)
- `coming-soon/index.html` : backup de la page "en construction" (le deploy main copie index.html de la racine)
- `assets/js/main.js` : logique de soumission du formulaire
- `assets/css/style.css` : styles (incluant `.form-feedback` pour succes/erreur)
- `.github/workflows/deploy.yml` : workflow production (main → acheteursimmobiliersquebec.com)
- `.github/workflows/deploy-preview.yml` : workflow preview (dev → preview.acheteursimmobiliersquebec.com)
- `netlify/functions/monday-lead.js` : fonction Monday (INACTIVE sur WHC, a reecrire en PHP)
- `netlify/functions/monday-columns.js` : utilitaire pour decouvrir les colonnes (usage unique)

## Prochaines etapes (pour la prochaine session)

1. **Finaliser le site sur la branche `dev`** : travailler en local, pusher sur dev, verifier sur preview.acheteursimmobiliersquebec.com
2. **Montrer le preview a Karl** : lui envoyer le lien preview.acheteursimmobiliersquebec.com pour validation avec ses partenaires
3. **Quand Karl approuve** : restaurer le workflow deploy.yml pour deployer tout le site (pas juste coming-soon), puis merger dev dans main
4. **Integration Monday (Phase 2)** : reecrire les Netlify Functions en PHP pour WHC, ou heberger les functions separement
5. **Blog / articles SEO** (page separee)
6. **Ads eventuelles**
7. **Reseaux sociaux**
