import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const routes = [
  {
    label: 'home',
    file: 'index.html',
    requiredText: ['Dana Htet Aung', 'Services', 'Portfolio', 'Resume'],
    requiredAssets: ['/assets/styles.css', '/assets/site.js'],
    actions: [
      ['LinkedIn', 'https://www.linkedin.com/in/dana-htetaung-1b55782b6/'],
      ['Email', 'mailto:danahtetaungbiz@gmail.com'],
      ['Services', '/services/'],
      ['Portfolio', '/portfolio/'],
      ['Resume', '/resume/'],
    ],
  },
  {
    label: 'services',
    file: 'services/index.html',
    requiredText: ['Services', 'Automation', 'Data dashboards', 'Permit intelligence', 'custom software'],
    requiredAssets: ['/assets/styles.css', '/assets/site.js'],
    actions: [
      ['Back', '/'],
      ['Phone', 'tel:8352105599'],
      ['Email', 'mailto:danahtetaungbiz@gmail.com'],
    ],
  },
  {
    label: 'portfolio',
    file: 'portfolio/index.html',
    requiredText: ['Portfolio', 'Vanity PermitOps', 'Contribution', 'Technologies'],
    requiredAssets: ['/assets/styles.css', '/assets/site.js'],
    actions: [
      ['Back', '/'],
      ['PermitOps', 'https://permitops.com'],
    ],
  },
  {
    label: 'resume',
    file: 'resume/index.html',
    requiredText: ['Resume', 'Skills', 'Experience', 'Education', 'Projects'],
    requiredAssets: ['/assets/styles.css', '/assets/site.js'],
    actions: [
      ['Back', '/'],
      ['View PDF', '/assets/resume.pdf'],
      ['Download PDF', '/assets/resume.pdf'],
    ],
  },
];

const failures = [];

function textContent(markup) {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? '';
}

function anchors(markup) {
  return [...markup.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((match) => ({
    attributes: match[1],
    href: attribute(match[1], 'href'),
    label: attribute(match[1], 'aria-label') || textContent(match[2]),
  }));
}

function report(file, message) {
  failures.push(`${file}: ${message}`);
}

for (const route of routes) {
  const absolutePath = path.join(repositoryRoot, route.file);
  let markup;

  try {
    markup = await readFile(absolutePath, 'utf8');
  } catch {
    report(route.file, 'required route file is missing');
    continue;
  }

  if (!/<html\b[^>]*\blang\s*=\s*["']en["']/i.test(markup)) {
    report(route.file, 'missing html lang="en"');
  }
  if (!/<meta\b[^>]*\bname\s*=\s*["']viewport["'][^>]*>/i.test(markup)) {
    report(route.file, 'missing viewport metadata');
  }
  if (!/<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["'][^"']+["'][^>]*>/i.test(markup)) {
    report(route.file, 'missing non-empty description metadata');
  }
  if (!/<title>\s*[^<]*Dana[^<]*<\/title>/i.test(markup)) {
    report(route.file, 'title must identify Dana');
  }

  const headings = [...markup.matchAll(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi)]
    .filter((match) => !/\bhidden\b/i.test(match[1]) && textContent(match[2]));
  if (headings.length !== 1) {
    report(route.file, `expected one visible primary heading, found ${headings.length}`);
  }

  const visibleText = textContent(markup);
  for (const expectedText of route.requiredText) {
    if (!visibleText.toLowerCase().includes(expectedText.toLowerCase())) {
      report(route.file, `missing required text "${expectedText}"`);
    }
  }

  for (const asset of route.requiredAssets) {
    if (!markup.includes(asset)) {
      report(route.file, `missing shared asset reference ${asset}`);
    }
  }

  const routeAnchors = anchors(markup);
  for (const [label, href] of route.actions) {
    const matchingAction = routeAnchors.find((anchor) =>
      anchor.href === href && anchor.label.toLowerCase().includes(label.toLowerCase()),
    );
    if (!matchingAction) {
      report(route.file, `missing ${label} action with href ${href}`);
    }
  }

  if (route.label === 'resume') {
    const downloadAction = routeAnchors.find((anchor) => anchor.label.includes('Download PDF'));
    if (!downloadAction || !/\bdownload(?:\s|=|$)/i.test(downloadAction.attributes)) {
      report(route.file, 'Download PDF action must use the download attribute');
    }
  }
}

try {
  const resume = await stat(path.join(repositoryRoot, 'assets/resume.pdf'));
  if (!resume.isFile() || resume.size === 0) {
    report('assets/resume.pdf', 'resume asset must be a non-empty file');
  }
} catch {
  report('assets/resume.pdf', 'resume asset is missing');
}

if (failures.length) {
  console.error(`Site validation failed with ${failures.length} issue${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Site validation passed for ${routes.length} routes.`);
}
