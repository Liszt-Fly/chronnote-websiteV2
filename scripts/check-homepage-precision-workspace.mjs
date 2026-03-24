import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const hero = read('src/components/blocks/hero/hero.tsx');
const features = read('src/components/blocks/features/features.tsx');
const headerSection = read('src/components/layout/header-section.tsx');
const homePage = read('src/app/[locale]/(marketing)/(home)/page.tsx');
const globals = read('src/styles/globals.css');
const zhMessages = read('messages/zh.json');
const pricingEntry = read('src/components/blocks/pricing/pricing-entry.tsx');
const callToAction = read('src/components/blocks/calltoaction/calltoaction.tsx');

assert(
  !hero.includes("t('introduction')") && !hero.includes("t('maxim')"),
  'Hero should remove the old introductory temple language.'
);

assert(
  hero.includes("t('eyebrow')") &&
    hero.includes("t('title')") &&
    hero.includes("t('description')") &&
    hero.includes('/images/media/title.webp'),
  'Hero should use a direct eyebrow, title, short description, and a single main screenshot.'
);

assert(
  hero.includes('space-y-6 md:space-y-7') &&
    hero.includes('max-w-xl') &&
    hero.includes('gap-3 pt-1') &&
    hero.includes('max-w-5xl text-[2.15rem]'),
  'Hero should tighten vertical rhythm and keep a narrower description measure.'
);

assert(
  !features.includes('Carousel') && !features.includes('currentIndex'),
  'Features should no longer use the carousel-based marketing layout.'
);

assert(
  features.includes('workflowSteps') &&
    features.includes('workspaceCards') &&
    features.includes("t('workflow.title')") &&
    features.includes("t('proof.title')"),
  'Features should define workflow steps and workspace proof sections.'
);

assert(
  features.includes('/images/docs/pageview1.webp') &&
    features.includes('/images/docs/atom2.webp') &&
    features.includes('/images/docs/notebook.webp') &&
    !features.includes('/images/docs/pageview.webp') &&
    !features.includes('/images/docs/sidebar-tabs.png'),
  'Workspace proof should use a unified set of real product screenshots.'
);

assert(
  !headerSection.includes("cn('temple-kicker', titleClassName)"),
  'HeaderSection should not force a temple kicker styling by default.'
);

assert(
  homePage.includes('<HeroSection />') &&
    homePage.includes('<FeaturesSection />') &&
    homePage.includes('<PricingEntrySection />') &&
    homePage.includes('<CallToActionSection />'),
  'Home page should still include hero, features, pricing entry, and CTA blocks.'
);

assert(
  globals.includes('.temple-workspace-frame-hero') &&
    globals.includes('aspect-ratio: 1.94 / 1;') &&
    globals.includes('border: 1px solid color-mix(in oklab, var(--border) 30%, transparent);'),
  'Hero screenshot frame should feel lighter and slightly larger.'
);

assert(
  pricingEntry.includes('space-y-8') &&
    pricingEntry.includes('variant="outline"'),
  'Pricing entry should be denser and use a clearer secondary CTA.'
);

assert(
  callToAction.includes('max-w-[14rem]') &&
    callToAction.includes('space-y-5'),
  'CTA should constrain the title for a cleaner break and use tighter spacing.'
);

assert(
  zhMessages.includes('"workflow": {\n        "eyebrow": "核心流程"') &&
    zhMessages.includes('"proof": {\n        "eyebrow": "工作台证据"') &&
    zhMessages.includes('"title": "想更早进入 Chronnote？"') &&
    zhMessages.includes('"casesTitle": "价格说明"'),
  'Chinese homepage labels should use Chinese rhythm labels and a tighter CTA title.'
);

console.log('Homepage precision-workspace checks passed.');
