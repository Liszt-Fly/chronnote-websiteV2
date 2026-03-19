import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
    <section
      id="hero"
      className="temple-section overflow-hidden px-4 pb-8 pt-10 md:pt-14"
    >
      <div className="temple-page-width">
        <div className="temple-measure-wide space-y-7">
          <div className="flex items-center gap-3">
            <span className="temple-kicker">{t('introduction')}</span>
            <div className="h-px flex-1 bg-border/55" />
          </div>

          <div className="space-y-5">
            <p className="temple-measure text-[0.94rem] tracking-[0.015em] text-foreground/52 temple-seraph md:text-[1rem]">
              {t('maxim')}
            </p>
            <h1 className="temple-measure-wide font-serif text-[2.02rem] font-medium leading-[1.22] tracking-[0.002em] text-foreground/76 md:text-[2.85rem]">
              {t('title')}
            </h1>
            <p className="temple-measure text-[0.92rem] leading-8 text-muted-foreground">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <Button
              asChild
              variant="ghost"
              className="rounded-md px-0 text-sm font-normal text-foreground/66 hover:bg-transparent hover:text-foreground/82"
            >
              <LocaleLink href="/pricing">
                <Download className="size-4" />
                {t('primary')}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
