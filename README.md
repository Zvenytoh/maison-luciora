# Maison Luciora

Site vitrine éditorial en français, réalisé avec Astro, TypeScript, CSS et JavaScript natif. Le site est intégralement généré en HTML statique : aucun compte, panier, paiement, backend ou base de données.

## Démarrer

Node.js 22.12 ou supérieur et pnpm 11.19 sont nécessaires.

```bash
git clone https://github.com/Zvenytoh/maison-luciora.git
cd maison-luciora
corepack pnpm install --frozen-lockfile
pnpm dev
```

Ouvrir l’URL affichée par Astro, généralement http://127.0.0.1:4321.

```bash
npm run check
npm run build
npm run preview
```

Le dossier `dist/` contient le site prêt à être servi par un hébergeur statique. Le projet utilise pnpm et possède un fichier de verrouillage : sur un autre ordinateur, lancer `corepack pnpm install --frozen-lockfile` ou installer la version de pnpm déclarée dans `package.json`.

## Contenu

- `src/data/artworks.ts` : les cinq œuvres et leurs textes, significations et intentions.
- `src/assets/photography/` : les images de démonstration, générées pour cette version. Ce sont des propositions visuelles et non des photographies de produits réels. Remplacer les fichiers pour présenter les œuvres définitives.
- `src/assets/brand/maison-luciora.png` : logo original fourni, conservé sans modification.
- `src/styles/tokens.css` : palette, typographies, dimensions et durées d’animation.
- `src/pages/contact.astro` : adresse email et compte Instagram issus du brief, à confirmer avant une publication destinée au public.

Les polices Cormorant Garamond et Instrument Sans sont embarquées localement via Fontsource. Les images sont optimisées en WebP par Astro Assets. Chaque œuvre a sa propre page statique et ses métadonnées. Le sitemap est généré à la compilation.

## Vérification

Après avoir lancé `npm run preview` dans un autre terminal :

```bash
npm run verify
```

Le contrôle couvre les pages aux largeurs 375, 430, 768, 1024, 1280, 1440 et 1920 px, les liens principaux, le menu mobile, le clavier, l’absence de JavaScript et les règles WCAG A/AA avec axe. Les résultats et captures sont enregistrés dans `qa/`, sans être publiés.

Validation initiale : 70 contrôles de mise en page et 10 analyses axe sans violation. Audit Lighthouse mobile local : performance 99, accessibilité 100, bonnes pratiques 100, SEO 100 ; LCP 2,1 s, CLS 0. Ces mesures locales ne remplacent pas les données de visiteurs réels et peuvent varier selon l’appareil et le réseau.

## Hébergement

La configuration Sites est dans `.openai/hosting.json`. La version créée ici est privée. Pour un autre domaine, modifier `site` dans `astro.config.mjs` et le sitemap dans `public/robots.txt`, puis compiler à nouveau.
