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

This project supports deployment via GitHub Actions on Linux using Cloudflare Workers and OpenNext.

### GitHub Actions deploy workflow
A deploy workflow is available at `.github/workflows/deploy-cloudflare.yml`.

#### Required secrets
Set the following GitHub Actions secrets in your repository settings:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Optional secrets:

- `CLOUDFLARE_ZONE_ID`
- `WRANGLER_ENV`

#### How it works
The workflow installs dependencies, runs:

```bash
npm run build
```

and then deploys with:

```bash
npx wrangler@latest deploy --account-id "$CLOUDFLARE_ACCOUNT_ID"
```

If `CLOUDFLARE_ZONE_ID` or `WRANGLER_ENV` are set, they are appended automatically.

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


