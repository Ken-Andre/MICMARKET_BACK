# MicMarket API

Bienvenue dans l'API **MicMarket**, une solution Node.js/Express pensée pour propulser le marketplace tech africain. Ce projet open source met l'accent sur la simplicité de déploiement et la modularité, que ce soit en local ou sur Vercel.

## Fonctionnalités clés

- **Authentification sécurisée** via JSON Web Tokens et renouvellement de jetons (refresh token).
- **Gestion des utilisateurs** (inscription, connexion, rôles, blocage/déblocage, réinitialisation de mot de passe).
- **Catalogue de produits et startups** avec opérations CRUD complètes et génération de slugs.
- **Gestion des catégories** pour organiser efficacement les offres.
- **Panier et commandes** pour un parcours d'achat fluide.
- **Enquêtes et formulaires de contact** afin de recueillir les retours des utilisateurs.
- **Téléversement d'images** via Cloudinary pour des médias stockés en toute fiabilité.
- **Documentation Swagger** intégrée pour explorer rapidement l'API.
- **Configuration CORS** et middlewares personnalisés pour un contrôle renforcé des accès.
- **Prête pour Vercel** grâce à une entrée serverless simple (`api/index.js`).

## Démarrage rapide

1. Clonez le dépôt puis installez les dépendances :
   ```bash
   npm install
   ```
2. Copiez le fichier `.env.example` en `.env` puis complétez les variables (`MONGODB_URL`, `JWT_SECRET`, `CLOUD_NAME`, `API_KEY`, `SECRET_KEY`, `MAIL_ID`, `MP`).
3. Lancez le serveur en local :
   ```bash
   npm start
   ```
4. Accédez à la documentation interactive sur `http://localhost:5000/api-docs`.

## Déploiement sur Vercel

Le projet utilise l'entrée `api/index.js` pour exposer l'application Express sous forme de fonction serverless. Il vous suffit de connecter ce dépôt à Vercel : la configuration (`vercel.json`) se charge du reste.

## Structure

- `controller/` – Logique métier des différentes entités (utilisateurs, produits, startups...).
- `models/` – Schémas Mongoose des données persistées.
- `routes/` – Points d'entrée de l'API.
- `middlewares/` – Authentification, gestion des erreurs, CORS...
- `utils/` – Fonctions utilitaires (Cloudinary, validation MongoDB, IP...).

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à forker le projet, proposer des améliorations ou signaler des problèmes via les issues.

## Licence

Ce projet est distribué sous licence ISC.
