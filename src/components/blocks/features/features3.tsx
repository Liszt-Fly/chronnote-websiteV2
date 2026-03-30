import { HeaderSection } from '@/components/layout/header-section';
import { CpuIcon, FingerprintIcon, ZapIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons = [ZapIcon, CpuIcon, FingerprintIcon];
const featureRows = [
  {
    titleKey: 'items.item-1.title',
    descriptionKey: 'items.item-1.description',
  },
  {
    titleKey: 'items.item-2.title',
    descriptionKey: 'items.item-2.description',
  },
  {
    titleKey: 'items.item-3.title',
    descriptionKey: 'items.item-3.description',
  },
] as const;

export default function Features3Section() {
  const t = useTranslations('HomePage.features3');

  return (
    <section id="features3" className="temple-section px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
        />

        <div className="space-y-0 border-t border-border/70">
          {icons.map((Icon, index) => (
            <article
              key={index}
              className="grid gap-3 border-b border-border/70 py-5 md:grid-cols-[0.12fr_0.28fr_1fr]"
            >
              <div className="flex items-start">
                <div className="flex size-8 items-center justify-center border-l-2 border-primary/60 pl-3">
                  <Icon className="size-3.5 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-[1rem] font-medium text-foreground">
                  {t(featureRows[index].titleKey)}
                </h3>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                {t(featureRows[index].descriptionKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
