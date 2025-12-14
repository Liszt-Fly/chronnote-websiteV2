/* Integration section – carousel (走马灯) layout */
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
import { Atom, BookOpenText, Layers3, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import type * as React from 'react';

interface IntegrationFeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentClassName: string;
}

export default function IntegrationSection() {
  const t = useTranslations('HomePage.integration');
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards: IntegrationFeatureCard[] = [
    // 1. Atom Library
    {
      id: 'item-4',
      title: t('items.item-4.title'),
      description: t('items.item-4.description'),
      icon: <Atom className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
    // 2. Chron Editor
    {
      id: 'item-2',
      title: t('items.item-2.title'),
      description: t('items.item-2.description'),
      icon: <EditorIcon className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
    // 3. Chron Reader
    {
      id: 'item-3',
      title: t('items.item-3.title'),
      description: t('items.item-3.description'),
      icon: <BookOpenText className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
    // 4. Chron Mindmap
    {
      id: 'item-1',
      title: t('items.item-1.title'),
      description: t('items.item-1.description'),
      icon: <Sparkles className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
    // 5. Chron Whiteboard
    {
      id: 'item-5',
      title: t('items.item-5.title'),
      description: t('items.item-5.description'),
      icon: <Layers3 className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
    // 6. Chron TodoList
    {
      id: 'item-6',
      title: t('items.item-6.title'),
      description: t('items.item-6.description'),
      icon: <WorkflowIcon className="size-6" />,
      accentClassName: 'bg-card/95 dark:bg-card/80',
    },
  ];

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section id="integration" className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-5xl">
        <HeaderSection
          title={t('subtitle')}
          titleAs="p"
          titleClassName="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground"
          subtitle={t('title')}
          subtitleAs="h2"
          subtitleClassName="text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
          description={t('description')}
          descriptionAs="p"
          descriptionClassName="mt-4 text-base md:text-lg text-muted-foreground md:max-w-none"
        />
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'start',
            loop: true,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {cards.map((card, index) => {
              const isActive = index === currentIndex;

              return (
              <CarouselItem key={card.id} className="flex justify-center">
                <IntegrationCarouselCard
                  card={card}
                  isActive={isActive}
                />
              </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="-left-14 md:-left-16 size-7 bg-background/80 border border-border/60 shadow-sm backdrop-blur-sm" />
          <CarouselNext className="-right-14 md:-right-16 size-7 bg-background/80 border border-border/60 shadow-sm backdrop-blur-sm" />
        </Carousel>

        <div className="mt-4 flex justify-center gap-1">
          {cards.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={cn(
                'h-1.5 rounded-full transition-all',
                index === currentIndex
                  ? 'w-4 bg-primary'
                  : 'w-1.5 bg-primary/40'
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* outer frame */}
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

      {/* top bar */}
      <rect
        x="6"
        y="6.3"
        width="5.2"
        height="0.9"
        rx="0.45"
        fill="currentColor"
        opacity="0.9"
      />

      {/* text lines */}
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

      {/* composition block / cursor */}
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

function WorkflowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* outer soft square */}
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        className="fill-none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity="0.35"
      />

      {/* flowing path */}
      <path
        d="M6 15.5C7.4 13.8 8.7 13 10.5 13c2.1 0 3.1.9 4.6.9 1.2 0 2.1-.4 2.9-1.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* orbiting nodes */}
      <circle cx="8" cy="8.4" r="1.15" fill="currentColor" />
      <circle cx="16.2" cy="9.2" r="1.15" fill="currentColor" />
      <circle cx="11.8" cy="17" r="1.15" fill="currentColor" />
    </svg>
  );
}

interface IntegrationCarouselCardProps {
  card: IntegrationFeatureCard;
  isActive: boolean;
}

function IntegrationCarouselCard({
  card,
  isActive,
}: IntegrationCarouselCardProps) {
  const videoSrc =
    card.id === 'item-4'
      ? '/movies/原子库轮播.mp4'
      : card.id === 'item-2'
        ? '/movies/双面编辑器.mp4'
        : card.id === 'item-3'
          ? '/movies/Reader视频.mp4'
          : card.id === 'item-1'
            ? '/movies/思维导图.mp4'
            : card.id === 'item-5'
              ? '/movies/无限白板.mp4'
              : card.id === 'item-6'
                ? '/movies/待办清单.mp4'
                : '/movies/Chronnote新闻实事.mp4';

  const shouldRenderVideo = isActive;

  return (
    <div
      className={cn(
        'relative w-full max-w-3xl md:max-w-4xl overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-2xl shadow-black/40 backdrop-blur-sm',
        card.accentClassName
      )}
    >
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3 md:px-6 md:pb-5 md:pt-4">
        {/* Header */}
        <div className="flex gap-3.5">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            {card.icon}
          </div>

          <div className="space-y-0.5">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Chronnote · Pillar
            </p>
            <h3 className="text-lg font-semibold md:text-xl">{card.title}</h3>
            <p className="text-xs text-muted-foreground md:text-sm md:max-w-xl">
              {card.description}
            </p>
          </div>
        </div>

        {/* Video */}
        <div className="mt-3 w-full">
          <div className="w-full overflow-hidden rounded-xl">
            {shouldRenderVideo ? (
              <video
                src={videoSrc}
                className="h-auto w-full max-h-[360px] rounded-xl pointer-events-none"
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
              />
            ) : (
              <div className="w-full max-h-[360px] aspect-video rounded-xl bg-muted/30" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
