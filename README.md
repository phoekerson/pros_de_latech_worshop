# CréaFlow

Plateforme d'inspiration créative type Pinterest, inspirée du design Artlist.

## Fonctionnalités (Phase 1)

- **Feed public** — Grille masonry sans connexion requise
- **Filtres** — Par catégorie et ambiance musicale
- **Musique d'ambiance** — S'adapte au mood des créations parcourues
- **Authentification Clerk** — Google OAuth pour les créateurs
- **Upload protégé** — Publication réservée aux utilisateurs connectés

## Démarrage

```bash
npm install
cp .env.example .env.local
# Renseigner les clés Clerk dans .env.local
npm run dev
```

### Configuration Clerk

1. Créer une application sur [clerk.com](https://dashboard.clerk.com)
2. Activer **Google** comme provider OAuth
3. Copier `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` et `CLERK_SECRET_KEY` dans `.env.local`

## Architecture

```
app/                    # Routes Next.js (App Router)
components/             # UI (layout, feed, music)
lib/
  domain/               # Types et constantes métier
  data/                 # Données mock
  infrastructure/       # Store, adapters (DB à venir)
  utils/                # Utilitaires
middleware.ts           # Protection routes /upload
```

## Prochaines étapes

- [ ] Base de données (Neon/PostgreSQL) pour persistance
- [ ] Stockage images (Cloudinary / S3)
- [ ] Page détail création
- [ ] Profils créateurs
- [ ] Recherche full-text
- [ ] Intégration musicale avancée (Spotify / catalogue propriétaire)
