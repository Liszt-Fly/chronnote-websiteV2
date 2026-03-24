import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();

const globalProvidersPath = resolve(root, 'src/app/[locale]/providers.tsx');
const docsLayoutPath = resolve(root, 'src/app/[locale]/docs/layout.tsx');
const docsProviderPath = resolve(
  root,
  'src/components/providers/docs-root-provider.tsx'
);

const globalProviders = readFileSync(globalProvidersPath, 'utf8');
const docsLayout = readFileSync(docsLayoutPath, 'utf8');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(
  !globalProviders.includes('fumadocs-ui/provider'),
  'Global locale providers must not import fumadocs RootProvider.'
);

assert(
  !globalProviders.includes('<RootProvider'),
  'Global locale providers must not render fumadocs RootProvider.'
);

assert(existsSync(docsProviderPath), 'DocsRootProvider component must exist.');

const docsProvider = readFileSync(docsProviderPath, 'utf8');

assert(
  docsProvider.includes("from 'fumadocs-ui/provider'"),
  'DocsRootProvider must import fumadocs RootProvider.'
);

assert(
  docsProvider.includes('search={{ enabled: true }}') ||
    docsProvider.includes('search={{enabled:true}}'),
  'DocsRootProvider must explicitly enable docs search.'
);

assert(
  docsProvider.includes('theme={{ enabled: false }}') ||
    docsProvider.includes('theme={{enabled:false}}'),
  'DocsRootProvider must not create a nested theme provider.'
);

assert(
  docsLayout.includes('DocsRootProvider'),
  'Docs layout must render DocsRootProvider.'
);

console.log('Docs provider scope checks passed.');
