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
      className="temple-section overflow-hidden px-4 pb-10 pt-8 md:pt-12"
    >
      <div className="temple-page-width space-y-8 md:space-y-10">
        <div className="space-y-5">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
            {t('eyebrow')}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-balance text-[2.5rem] font-medium leading-[1.02] tracking-[-0.045em] text-foreground/92 md:text-[4.8rem]">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-[0.98rem] leading-7 text-muted-foreground md:text-[1.02rem]">
              {t('description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
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
