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

console.log('Homepage precision-workspace checks passed.');
