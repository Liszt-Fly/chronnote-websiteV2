import { Button } from '@/components/ui/button';
import { LocaleLink } from '@/i18n/navigation';
import { Download } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('HomePage.hero');

  return (
    <section
      id="hero"
      className="temple-section overflow-hidden px-4 pb-8 pt-8 md:pt-10"
    >
      <div className="temple-page-width space-y-6 md:space-y-7">
        <div className="space-y-4">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
            {t('eyebrow')}
          </p>
          <div className="space-y-3">
            <h1 className="max-w-5xl text-[2.15rem] font-medium leading-[1.06] tracking-[-0.04em] text-foreground/92 md:text-[3.5rem] lg:text-[4rem]">
              {t('title')}
            </h1>
            <p className="max-w-xl text-[0.96rem] leading-7 text-muted-foreground md:text-[1rem]">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              asChild
              className="h-10 rounded-md px-4 text-sm font-medium"
            >
              <LocaleLink href="/pricing">
                <Download className="size-4" />
                {t('primary')}
              </LocaleLink>
            </Button>
            <p className="text-sm text-muted-foreground">{t('secondary')}</p>
          </div>
        </div>

        <div className="temple-gallery-block mt-0">
          <div className="temple-workspace-frame temple-workspace-frame-hero">
            <Image
              src="/images/media/title.webp"
              alt="Chronnote title workspace"
              width={3528}
              height={2240}
              className="h-full w-full object-cover object-top"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
