import { HeaderSection } from '@/components/layout/header-section';
import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function PricingEntrySection() {
  const t = useTranslations('HomePage.pricing');

  return (
    <section id="pricing" className="temple-section px-4">
      <div className="temple-page-width space-y-12 border-t border-border/50 pt-8">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
          className="items-start text-left"
          subtitleClassName="temple-measure-wide text-[1.34rem] text-foreground/78 md:text-[1.6rem]"
          descriptionClassName="temple-measure leading-8"
        />

        <div className="temple-section-grid">
          <div className="temple-rail space-y-5">
            <span className="temple-bookmark">{t('earlyBird.title')}</span>
            <h3 className="temple-measure font-serif text-[1.08rem] font-medium leading-[1.7] text-foreground/72">
              {t('earlyBird.lockTitle')}
            </h3>
            <p className="temple-measure text-sm leading-8 text-muted-foreground">
              {t('earlyBird.lead')}
            </p>
          </div>

          <div className="space-y-5 border-l border-border/42 pl-7">
            <p className="temple-kicker">{t('earlyBird.casesTitle')}</p>
            <p className="temple-measure text-sm leading-8 text-muted-foreground">
              {t('earlyBird.lockDescription')}
            </p>
            <Button
              asChild
              variant="ghost"
              className="h-auto rounded-md px-0 text-sm font-normal text-foreground/72 hover:bg-transparent hover:text-foreground/88"
            >
              <LocaleLink href="/pricing">
                {t('entryLabel')}
                <ArrowRight className="size-4" />
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
