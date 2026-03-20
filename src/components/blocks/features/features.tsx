'use client';

import { HeaderSection } from '@/components/layout/header-section';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { BookOpenText, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type * as React from 'react';

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

interface CarouselCardItem {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  icon: React.ReactNode;
}

export default function FeaturesSection() {
  const t = useTranslations('HomePage.features');
  const integration = useTranslations('HomePage.integration');
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards: CarouselCardItem[] = [
    {
      id: 'editor',
      title: integration('items.item-2.title'),
      description: integration('items.item-2.description'),
      videoSrc: '/movies/双面编辑器.mp4',
      posterSrc: '/images/docs/pageview1.webp',
      icon: <EditorIcon className="size-6" />,
    },
    {
      id: 'mindmap',
      title: integration('items.item-1.title'),
      description: integration('items.item-1.description'),
      videoSrc: '/movies/思维导图.mp4',
      posterSrc: '/images/docs/atom2.webp',
      icon: <Sparkles className="size-6" />,
    },
    {
      id: 'todo',
      title: integration('items.item-6.title'),
      description: integration('items.item-6.description'),
      videoSrc: '/movies/待办清单.mp4',
      posterSrc: '/images/docs/notebook.webp',
      icon: <BookOpenText className="size-6" />,
    },
  ];

  useEffect(() => {
    if (!api) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % cards.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [api, cards.length]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentIndex);
  }, [api, currentIndex]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section id="features" className="temple-section px-4">
      <div className="temple-page-width space-y-12">
        <HeaderSection
          title={t('title')}
          subtitle={t('subtitle')}
          subtitleAs="h2"
          description={t('description')}
          className="items-start text-left"
          subtitleClassName="temple-measure-wide text-[1.34rem] text-foreground/80 md:text-[1.6rem]"
          descriptionClassName="temple-measure leading-8"
        />

        <div className="temple-section-grid border-t border-border/40 pt-10">
          <div className="temple-rail space-y-8">
            <div className="space-y-8">
              {featureItems.map((item, index) => (
                <article
                  key={item.titleKey}
                  className="border-b border-border/48 pb-8 last:border-b-0 last:pb-0"
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
            <div className="temple-gallery-block">
              <Carousel
                setApi={setApi}
                opts={{
                  align: 'start',
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {cards.map((card, index) => (
                    <CarouselItem key={card.id} className="flex justify-center">
                      <FeatureCarouselCard
                        card={card}
                        isActive={index === currentIndex}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4 top-1/2 size-8 border-border/60 bg-background/88 shadow-sm backdrop-blur-sm md:-left-5" />
                <CarouselNext className="-right-4 top-1/2 size-8 border-border/60 bg-background/88 shadow-sm backdrop-blur-sm md:-right-5" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCarouselCardProps {
  card: CarouselCardItem;
  isActive: boolean;
}

function FeatureCarouselCard({ card, isActive }: FeatureCarouselCardProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-3xl overflow-hidden rounded-xl border border-border/60 bg-card/95 shadow-xl shadow-black/6 backdrop-blur-sm dark:bg-card/80'
      )}
    >
      <div className="flex flex-col gap-3 px-4 pb-4 pt-3 md:px-6 md:pb-5 md:pt-4">
        <div className="flex gap-3.5">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            {card.icon}
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Chronnote · Pillar
            </p>
            <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
            <p className="text-xs text-muted-foreground md:max-w-xl md:text-sm">
              {card.description}
            </p>
          </div>
        </div>

        <div className="mt-3 w-full">
          <div className="w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20">
            {isActive ? (
              <video
                key={card.videoSrc}
                src={card.videoSrc}
                poster={card.posterSrc}
                className="h-auto max-h-[280px] w-full rounded-xl object-contain pointer-events-none md:max-h-[320px]"
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
              />
            ) : (
              <img
                src={card.posterSrc}
                alt={card.title}
                className="aspect-video h-auto w-full rounded-xl object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EditorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <rect
        x="3.5"
        y="4"
        width="17"
        height="16"
        rx="4"
        className="fill-none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity="0.35"
      />
      <rect
        x="6"
        y="6.3"
        width="5.2"
        height="0.9"
        rx="0.45"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="6"
        y="9"
        width="8.6"
        height="0.9"
        rx="0.45"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="6"
        y="11.4"
        width="6.4"
        height="0.9"
        rx="0.45"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="14.2"
        y="9.8"
        width="3.8"
        height="3.8"
        rx="1"
        className="fill-none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M15.4 11.1h1.4M15.4 12.3h1.4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
