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
# optionally export static files
npm run export
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

Recommended: deploy on Vercel — connect the repository and use the default Next.js settings.

Alternatively, build locally and serve the `.next` output on a Node server.

## Contributing

Feel free to open issues or PRs. For local changes, follow the development steps above.

## License

See the project `LICENSE` file for license details.

