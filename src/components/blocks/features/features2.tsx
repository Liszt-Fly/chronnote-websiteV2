import { HeaderSection } from '@/components/layout/header-section';
import { MailIcon, ScrollTextIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const featureIcons = [MailIcon, ScrollTextIcon];
const featureKeys = ['feature-1', 'feature-3'] as const;

export default function Features2Section() {
  const t = useTranslations('HomePage.features2');

  return (
    <section id="features2" className="temple-section px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
        />

        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="space-y-5 border-t border-border/70 pt-5">
            <span className="temple-bookmark">{t('panelKicker')}</span>
            <h3 className="max-w-sm font-serif text-[1.35rem] font-medium leading-snug text-foreground">
              {t('panelTitle')}
            </h3>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              {t('description')}
            </p>
            <div className="space-y-6">
              {featureIcons.map((Icon, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 border-b border-border/70 pb-5 last:border-b-0 last:pb-0"
                >
                  <div className="flex size-8 shrink-0 items-center justify-center border-l-2 border-primary/60 pl-3">
                    <Icon className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t(featureKeys[index])}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border/70 pt-5">
            <Image
              src="/images/img1.webp"
              alt="Chronnote page view"
              width={1207}
              height={929}
              className="h-auto w-full border border-border/60 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
