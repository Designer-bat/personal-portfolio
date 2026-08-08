# Contributing

Thanks for considering contributing to this project. A few guidelines:

 - Fork the repo and create a branch for your change: `git checkout -b feat/my-feature`
 - Keep commits focused and with clear messages (conventional commits recommended).
 - Run the dev server and ensure changes work locally:

```bash
npm install
npm run dev
```

 - Lint and format before opening a PR:

```bash
npm run lint
npx @biomejs/biome format --write .
```

 - Ensure tests pass (if any) and provide a clear PR description with testing steps.

Maintainers will review and request changes as needed.
