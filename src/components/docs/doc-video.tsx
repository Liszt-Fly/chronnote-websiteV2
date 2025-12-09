'use client';

import { cn } from '@/lib/utils';

interface DocVideoProps {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
}

/**
 * Simple video player for docs pages
 *
 * - Auto plays (muted, loop, playsInline)
 * - Shows controls so users can pause / scrub
 *
 * Usage in MDX:
 *
 * <DocVideo
 *   src="/movies/原子库拖拽高清.mp4"
 *   poster="/images/docs/atom2.png"
 *   caption="原子库拖拽到白板的分屏示例"
 * />
 */
export function DocVideo({ src, poster, caption, className }: DocVideoProps) {
  if (!src) return null;

  return (
    <figure className={cn('my-6 space-y-3', className)}>
      <video
        src={src}
        poster={poster}
        className="h-auto w-full rounded-xl"
        autoPlay
        muted
        playsInline
        loop
      />
      {caption && (
        <figcaption className="text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
