# ⚡ Elboard

Elboard est une application web pour inventorier et organiser un tableau électrique domestique.

L’objectif est de représenter les rangées du tableau, les modules installés et les circuits associés afin de garder une vue lisible de l’installation.

## Fonctionnalités

- Gestion des rangées du tableau avec nom optionnel.
- Ajout, modification, déplacement et suppression de modules.
- Types de modules pris en charge :
  - disjoncteur général / de branchement ;
  - interrupteur différentiel ;
  - disjoncteur divisionnaire ;
  - autre module, par exemple parafoudre ou contacteur.
- Calibres, pôles et largeurs configurables.
- Suggestions de circuits et de pièces pour renseigner rapidement les départs.
- Stockage local dans une base SQLite.

## Stack technique

- Next.js 16 avec App Router
- React 19
- TypeScript
- Tailwind CSS
- SQLite via `better-sqlite3`

## Prérequis

- Node.js `>= 22.14.0`
- npm

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

L’application est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

En mode développement, les changements sont pris en compte automatiquement par Next.js.

## Production locale

```bash
npm run build
npm start
```

`npm start` sert le build de production déjà généré. Pour voir les modifications en direct, utiliser `npm run dev`.

## Données

Par défaut, la base SQLite est créée dans :

```text
data/elboard.db
```

Le dossier peut être personnalisé avec la variable d’environnement `DATA_DIR` :

```bash
DATA_DIR=/chemin/vers/donnees npm start
```

Les données applicatives ne sont pas versionnées.

## Scripts npm

```bash
npm run dev        # serveur de développement
npm run build      # build de production
npm start          # démarrage du build de production
npm run lint       # lint ESLint
npm run typecheck  # vérification TypeScript
npm run ci         # lint + typecheck + build
npm run release    # semantic-release
```

## Workflow Git

Le dépôt utilise un workflow avec deux branches principales :

- `develop` pour l’intégration et les préreleases ;
- `main` pour les releases stables.

Les changements fonctionnels passent par des branches de travail, par exemple :

```text
feature/nom-du-changement
fix/nom-du-correctif
chore/nom-de-maintenance
```

Les messages de commit et titres de pull request suivent la convention Conventional Commits.

## CI/CD

Les workflows GitHub Actions exécutent notamment :

- lint ;
- typecheck ;
- build ;
- validation de la politique de branches ;
- release automatisée avec `semantic-release`.

Les releases publient aussi une image container sur GHCR.

## Docker

Le projet contient un `Dockerfile` pour construire une image de production.

Exemple :

```bash
docker build -t elboard .
docker run --rm -p 3000:3000 -v "$PWD/data:/app/data" elboard
```

## Notes projet

Ce projet utilise une version récente de Next.js. Avant de modifier du code Next.js, consulter la documentation embarquée dans `node_modules/next/dist/docs/`, comme indiqué dans les règles du dépôt.
