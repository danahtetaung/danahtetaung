# Quickstart: Mobile-Friendly Portfolio

## Install validation dependencies

```powershell
npm ci
npx playwright install chromium
```

## Run the local site

```powershell
npm run dev
```

Open `http://127.0.0.1:4173`.

## Validate

```powershell
npm run validate
npm test
```

The checks must cover `/`, `/services/`, `/portfolio/`, and `/resume/` at 320x568, 360x800, 390x844, 412x915, 768x1024, 844x390, and 1440x900.

## Delivery boundary

Push only `codex/mobile-friendly-portfolio`. Verify the generated preview and repository binding before opening or marking a pull request ready. Do not describe the custom domain as updated until the deployed preview or production URL is directly inspected.
