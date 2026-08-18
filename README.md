# Dana Htet Aung — Portfolio

This repository contains Dana Htet Aung's static portfolio website. It uses semantic HTML, one shared responsive stylesheet, and small dependency-free JavaScript enhancements. There is no application framework or production build bundle.

## Public routes

- `/` — contact links and primary navigation
- `/services/` — services, phone, and email actions
- `/portfolio/` — project summary and public project link
- `/resume/` — readable HTML resume plus PDF view/download actions

Shared production files live in `assets/`:

- `styles.css` provides the monochrome responsive system and visible focus states.
- `site.js` improves skip-link focus while leaving navigation functional without JavaScript.
- `resume.pdf` is the downloadable resume used by the resume route.

## Local development

Install a current Node.js release and npm, then run:

```powershell
npm ci
npx playwright install chromium
npm run dev
```

Open `http://127.0.0.1:4173`. Stop the server with `Ctrl+C`.

## Validation

```powershell
npm run validate
npm run build
npm test
npm audit --audit-level=high
```

`npm run validate` checks the four route documents, metadata, public destinations, local assets, and resume PDF. `npm run build` runs that structural validation; the site itself is already deployable static content. `npm test` starts the local server and runs the complete Playwright acceptance suite.

The browser suite covers every route at 320, 360, 390, 412, 768, 844-by-390 landscape, and 1,440 pixels wide. It also checks:

- zero horizontal overflow and 200% text reflow;
- 44-by-44-pixel minimum primary targets;
- keyboard focus visibility and exact accessible names;
- mobile-safe resume content and desktop PDF preview;
- working public/contact destinations and no-script content;
- the homepage remains free of the removed decorative wave asset.

The responsive implementation currently passes 39/39 Playwright tests with zero high-severity dependency findings.

## Deployment status

Passing checks on a local or GitHub branch does not prove that [danahtetaung.com](https://danahtetaung.com/) has deployed the branch. A pull-request preview must be opened and checked separately; the custom domain must then be verified directly after an approved production merge/deployment.

Keep delivery status separate:

1. source implemented;
2. tests passed;
3. feature branch merged locally;
4. feature branch pushed;
5. preview verified;
6. pull request created;
7. production deployed and custom domain verified.
