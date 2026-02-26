import { HeaderSection } from '@/components/layout/header-section';
import { PricingTable } from '@/components/pricing/pricing-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BadgePercent } from 'lucide-react';
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

        <Alert className="border-amber-200/80 bg-amber-50/60 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
          <BadgePercent />
          <AlertTitle>{t('earlyBird.title')}</AlertTitle>
          <AlertDescription>
            <ul className="list-disc space-y-1 pl-5">
              {earlyBirdItems.map((item, index) => (
                <li key={index}>
                  {item.text}
                  {item.subItems.length > 0 && (
                    <ul className="mt-1 list-disc space-y-1 pl-5">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={`${index}-${subIndex}`}>{subItem}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>

        <Suspense
          fallback={<div className="h-96 animate-pulse bg-muted rounded-lg" />}
        >
          <PricingTable />
        </Suspense>
      </div>
    </section>
  );
}
