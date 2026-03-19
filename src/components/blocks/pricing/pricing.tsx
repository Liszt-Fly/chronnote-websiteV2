import { HeaderSection } from '@/components/layout/header-section';
import { PricingTable } from '@/components/pricing/pricing-table';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

export default function PricingSection() {
  const t = useTranslations('HomePage.pricing');

  return (
    <section id="pricing" className="temple-section px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <HeaderSection
          subtitle={t('subtitle')}
          subtitleAs="h2"
          title={t('title')}
        />

        <div className="grid gap-5 border-b border-t border-border/70 py-5 md:grid-cols-[0.78fr_1fr] md:py-6">
          <div className="space-y-2.5">
            <span className="temple-bookmark">{t('earlyBird.title')}</span>
            <h3 className="max-w-md font-serif text-[1.45rem] font-medium leading-snug text-foreground">
              {t('earlyBird.lockTitle')}
            </h3>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              {t('earlyBird.lead')}
            </p>
          </div>

          <div className="py-1 md:border-l md:border-border/70 md:pl-5">
            <p className="temple-kicker">{t('earlyBird.casesTitle')}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {t('earlyBird.lockDescription')}
            </p>
          </div>
        </div>

        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}
        >
          <PricingTable />
        </Suspense>
      </div>
    </section>
  );
}
