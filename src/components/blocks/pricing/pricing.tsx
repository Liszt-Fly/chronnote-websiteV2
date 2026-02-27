import { HeaderSection } from '@/components/layout/header-section';
import { PricingTable } from '@/components/pricing/pricing-table';
import { Badge } from '@/components/ui/badge';
import { BadgeCheckIcon, Clock3Icon, LockKeyholeIcon, SparklesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';

export default function PricingSection() {
  const t = useTranslations('HomePage.pricing');
  const earlyBirdItems = t('earlyBird.description')
    .split('\n')
    .map((line) => line.replace(/\r/g, ''))
    .filter((line) => line.trim().length > 0)
    .reduce<Array<{ text: string; subItems: string[] }>>((acc, line) => {
      const isSubItem = /^\s*-\s+/.test(line);
      if (isSubItem) {
        const subItem = line.replace(/^\s*-\s+/, '').trim();
        if (acc.length === 0) {
          acc.push({ text: subItem, subItems: [] });
        } else {
          acc[acc.length - 1].subItems.push(subItem);
        }
        return acc;
      }

      acc.push({ text: line.trim(), subItems: [] });
      return acc;
    }, []);
  const primaryItems = earlyBirdItems.map((item) => item.text);
  const caseItems = earlyBirdItems.flatMap((item) => item.subItems);
  const infoIcons = [SparklesIcon, Clock3Icon, LockKeyholeIcon];

  return (
    <section id="pricing" className="px-4 py-16">
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        <HeaderSection
          subtitle={t('subtitle')}
          subtitleAs="h2"
          subtitleClassName="text-4xl font-bold"
          description={t('description')}
          descriptionAs="p"
        />

        <div className="relative overflow-hidden rounded-3xl border border-amber-300/60 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 p-6 shadow-[0_16px_46px_-24px_rgba(249,115,22,0.6)] dark:border-amber-900/70 dark:from-amber-950/55 dark:via-zinc-950 dark:to-rose-950/40">
          <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-orange-300/30 blur-3xl dark:bg-orange-600/20" />
          <div className="pointer-events-none absolute -bottom-14 -left-8 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-600/15" />
          <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_1px_1px,rgba(249,115,22,0.22)_1px,transparent_0)] [background-size:16px_16px] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(251,146,60,0.16)_1px,transparent_0)]" />

          <div className="relative grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-5">
              <Badge className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-300/70 bg-amber-100/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-900 shadow-sm dark:border-amber-700/60 dark:bg-amber-900/45 dark:text-amber-100">
                <BadgeCheckIcon className="size-3.5" />
                {t('earlyBird.title')}
              </Badge>

              <div className="space-y-1">
                <h3 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
                  {t('earlyBird.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('earlyBird.lead')}
                </p>
              </div>

              <div className="grid gap-3">
                {primaryItems.map((item, index) => {
                  const ItemIcon = infoIcons[index % infoIcons.length];
                  return (
                    <div
                      key={`${item}-${index}`}
                      className="group flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-background/70 p-3 backdrop-blur transition-colors hover:border-amber-300 dark:border-amber-900/50 dark:bg-background/45 dark:hover:border-amber-700/60"
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-100">
                        <ItemIcon className="size-3.5" />
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-orange-200/75 bg-gradient-to-br from-orange-100/90 to-rose-100/80 p-4 shadow-[0_12px_30px_-24px_rgba(244,63,94,0.6)] dark:border-orange-900/55 dark:from-orange-950/40 dark:to-rose-950/30">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-700/90 dark:text-orange-200/85">
                  PRICE LOCK
                </p>
                <p className="mt-2 text-2xl font-black leading-none tracking-tight text-foreground">
                  {t('earlyBird.lockTitle')}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {t('earlyBird.lockDescription')}
                </p>
              </div>

              {caseItems.length > 0 && (
                <div className="rounded-2xl border border-amber-200/75 bg-background/80 p-4 backdrop-blur dark:border-amber-900/50 dark:bg-background/45">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
                    <SparklesIcon className="size-3.5" />
                    {t('earlyBird.casesTitle')}
                  </p>
                  <div className="mt-3 space-y-2">
                    {caseItems.map((item, index) => (
                      <div
                        key={`${item}-${index}`}
                        className="rounded-xl border border-border/60 bg-background/70 p-2.5 text-xs leading-relaxed text-foreground/85 dark:bg-background/55"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Suspense
          fallback={<div className="h-96 animate-pulse bg-muted rounded-lg" />}
        >
          <PricingTable />
        </Suspense>
      </div>
    </section>
  );
}
