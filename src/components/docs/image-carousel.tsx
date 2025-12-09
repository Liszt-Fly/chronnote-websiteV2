'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageCarouselItem {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface ImageCarouselProps {
  images: ImageCarouselItem[];
  className?: string;
}

/**
 * Simple image carousel for MDX docs usage
 *
 * Usage in MDX:
 *
 * <ImageCarousel
 *   images={[
 *     { src: "/images/docs/atom-1.png", alt: "原子库视图" },
 *     { src: "/images/docs/atom-2.png", alt: "白板分屏拖拽" },
 *   ]}
 * />
 */
export function ImageCarousel({ images, className }: ImageCarouselProps) {
  if (!images?.length) return null;

  return (
    <div className={cn('relative my-6', className)}>
      <Carousel
        opts={{
          align: 'start',
          dragFree: false,
          containScroll: 'trimSnaps',
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={img.src}>
              <figure className="flex flex-col items-center gap-2">
                <div className="relative w-full overflow-hidden rounded-xl border bg-background">
                  <Image
                    src={img.src}
                    alt={img.alt ?? img.title ?? `Slide ${index + 1}`}
                    width={1280}
                    height={720}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                {(img.title || img.description) && (
                  <figcaption className="text-center text-xs text-muted-foreground">
                    {img.title && (
                      <div className="font-medium">{img.title}</div>
                    )}
                    {img.description && (
                      <div className="mt-0.5">{img.description}</div>
                    )}
                  </figcaption>
                )}
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 bg-background/80 backdrop-blur-sm" />
        <CarouselNext className="right-0 bg-background/80 backdrop-blur-sm" />
      </Carousel>
    </div>
  );
}
