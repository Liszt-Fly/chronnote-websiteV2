'use client';

import { HeaderSection } from '@/components/layout/header-section';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const featureItems = [
  {
    titleKey: 'items.item-1.title',
    descriptionKey: 'items.item-1.description',
  },
  {
    titleKey: 'items.item-2.title',
    descriptionKey: 'items.item-2.description',
  },
] as const;

export default function FeaturesSection() {
  const t = useTranslations('HomePage.features');

  return (
    <section id="features" className="temple-section px-4">
      <div className="temple-page-width space-y-10">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
          className="items-start text-left"
          subtitleClassName="temple-measure-wide text-[1.34rem] text-foreground/80 md:text-[1.6rem]"
          descriptionClassName="temple-measure leading-8"
        />

        <div className="grid gap-14 border-t border-border/40 pt-10 lg:grid-cols-[0.5fr_0.5fr]">
          <div className="space-y-7">
            <div className="space-y-7">
              {featureItems.map((item, index) => (
                <article
                  key={item.titleKey}
                  className="border-b border-border/55 pb-7 last:border-b-0 last:pb-0"
                >
                  <p className="temple-kicker">
                    {t('chamberLabel', { index: index + 1 })}
                  </p>
                  <h3 className="mt-2 text-[0.95rem] font-medium text-foreground/84">
                    {t(item.titleKey)}
                  </h3>
                  <p className="temple-measure mt-3 text-sm leading-8 text-muted-foreground">
                    {t(item.descriptionKey)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <span className="temple-bookmark">{t('panelKicker')}</span>
            <h3 className="temple-measure font-serif text-[1.08rem] font-medium leading-[1.7] text-foreground/74">
              {t('panelTitle')}
            </h3>
            <p className="temple-measure text-sm leading-8 text-muted-foreground">
              {t('panelDescription')}
            </p>
            <div className="grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
              <div className="overflow-hidden border border-border/45">
                <Image
                  src="/blocks/charts-light.png"
                  alt="Chronnote feature overview"
                  width={1207}
                  height={929}
                  className="h-auto w-full object-cover dark:hidden"
                />
                <Image
                  src="/blocks/charts.png"
                  alt="Chronnote feature overview"
                  width={1207}
                  height={929}
                  className="hidden h-auto w-full object-cover dark:block"
                />
              </div>
              <div className="grid gap-4">
                <div className="overflow-hidden border border-border/45">
                  <Image
                    src="/images/docs/pageview.webp"
                    alt="Chronnote page view"
                    width={1356}
                    height={934}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden border border-border/45">
                  <Image
                    src="/images/docs/notebook.webp"
                    alt="Chronnote notebook view"
                    width={1356}
                    height={934}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
