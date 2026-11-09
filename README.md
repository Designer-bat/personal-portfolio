# personal-portfolio

Personal portfolio built with Next.js and Once UI.

## Requirements

- Node.js 20+ recommended
- npm (or your preferred package manager)

## Local development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Build

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Lint & format

```bash
npm run lint
npx @biomejs/biome format --write .
```

## Deployment

Vercel builds and deploys this Next.js app automatically when the repository is connected to the Vercel project.

Configure the Vercel project with:

- **Framework Preset:** Next.js (detected automatically)
- **Production Branch:** `main`
- **Build Command:** `npm run build`
- **Install Command:** `npm install` (or Vercel's default)
- **Output Directory:** leave at the Next.js default

Pushes to `main` trigger production deployments; pull requests receive Vercel preview deployments. No deployment GitHub Action or custom `vercel.json` is needed.
## Contributing

Feel free to open issues or PRs. For local changes, follow the development steps above.

## License

See the project `LICENSE` file for license details.

## Badges

- Build: ![CI](https://github.com/Designer-bat/personal-portfolio/actions/workflows/ci.yml/badge.svg)
- License: ![License](https://img.shields.io/github/license/Designer-bat/personal-portfolio.svg)

## Screenshots

Add screenshots by placing images in `public/images/` and reference them below.

![Screenshot](public/images/screenshot.png)

