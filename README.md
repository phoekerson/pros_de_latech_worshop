# CréaFlow

Plateforme d'inspiration créative type Pinterest, inspirée du design Artlist.

## Fonctionnalités (Phase 1)

- **Feed public** — Grille masonry sans connexion requise
- **Filtres** — Par catégorie et ambiance musicale
- **Musique d'ambiance** — S'adapte au mood des créations parcourues
- **Upload libre** — Publication de créations ouverte à tous

## Démarrage

```bash
npm install
npm run dev
```

## Architecture

```
app/                    # Routes Next.js (App Router)
components/             # UI (layout, feed, music)
lib/
  domain/               # Types et constantes métier
  data/                 # Données mock
  infrastructure/       # Store, adapters (DB à venir)
  utils/                # Utilitaires
```

## Prochaines étapes

- [ ] Base de données (Neon/PostgreSQL) pour persistance
- [ ] Stockage images (Cloudinary / S3)
- [ ] Page détail création
- [ ] Profils créateurs
- [ ] Recherche full-text
- [ ] Intégration musicale avancée (Spotify / catalogue propriétaire)
