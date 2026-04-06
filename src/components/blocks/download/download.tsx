'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Apple, Globe, Laptop, Smartphone, TabletSmartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';

const INTERNAL_RELEASE_API = '/api/downloads/latest';

interface BuildTarget {
  version?: string;
  url?: string;
}

interface BuildInfo {
  windows: BuildTarget;
  macIntel: BuildTarget;
  macApple: BuildTarget;
}

const INITIAL_BUILD_INFO: BuildInfo = {
  windows: {},
  macIntel: {},
  macApple: {},
};

export default function DownloadSection() {
  const t = useTranslations('HomePage.download');
  const [buildInfo, setBuildInfo] = useState<BuildInfo>(INITIAL_BUILD_INFO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadBuilds() {
      setLoading(true);
      try {
        const response = await fetch(`${INTERNAL_RELEASE_API}?t=${Date.now()}`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to fetch release info');
        const payload = (await response.json()) as BuildInfo;
        if (cancelled) return;
        setBuildInfo({
          windows: payload.windows ?? INITIAL_BUILD_INFO.windows,
          macIntel: payload.macIntel ?? INITIAL_BUILD_INFO.macIntel,
          macApple: payload.macApple ?? INITIAL_BUILD_INFO.macApple,
        });
      } catch (error) {
        if (!cancelled) console.error('Failed to load download manifests', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadBuilds();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="download" className="temple-section px-4 pt-0">
      <div className="temple-page-width border-t border-border/70 pt-8">
        <div className="temple-section-grid">

          {/* Left rail */}
          <div className="temple-rail space-y-3">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/50">
              {t('eyebrow')}
            </span>
            <h2 className="max-w-[14rem] text-[1.45rem] font-medium leading-[1.18] tracking-[-0.02em] text-foreground/86 md:text-[1.8rem]">
              {t('title')}
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {t('description')}
            </p>
          </div>

          {/* Right content */}
          <div>

            {/* macOS group */}
            <OsGroupHeader
              icon={<Apple className="size-3.5" />}
              label={t('mac.title')}
              subtitle={t('mac.subtitle')}
            />
            <DownloadRow
              arch={t('mac.intel')}
              badge={t('mac.badgeIntel')}
              info={buildInfo.macIntel}
              loading={loading}
              primaryLabel={t('downloadNow')}
            />
            <DownloadRow
              arch={t('mac.apple')}
              badge={t('mac.badgeApple')}
              info={buildInfo.macApple}
              loading={loading}
              primaryLabel={t('downloadNow')}
            />

            {/* Windows group */}
            <OsGroupHeader
              icon={<Laptop className="size-3.5" />}
              label={t('windows.title')}
              subtitle={t('windows.subtitle')}
              className="mt-6"
            />
            <DownloadRow
              arch={t('windows.subtitle')}
              badge={t('windows.badge')}
              info={buildInfo.windows}
              loading={loading}
              primaryLabel={t('downloadNow')}
            />

            {/* Other platforms */}
            <div className="mt-8 border-t border-border/45 pt-6">
              <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/40">
                {t('otherPlatforms')}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <PlatformItem
                  icon={<Globe className="size-4" />}
                  title={t('web.title')}
                  description={t('web.description')}
                />
                <PlatformItem
                  icon={<Smartphone className="size-4" />}
                  title={t('ios.title')}
                  description={t('ios.description')}
                />
                <PlatformItem
                  icon={<TabletSmartphone className="size-4" />}
                  title={t('android.title')}
                  description={t('android.description')}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function OsGroupHeader({
  icon,
  label,
  subtitle,
  className,
}: {
  icon: ReactNode;
  label: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 border-b border-border/45 pb-2 ${className ?? ''}`}
    >
      <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-foreground/55">
        {icon}
        {label}
      </span>
      <span className="text-[0.75rem] text-border">—</span>
      <span className="text-[0.75rem] text-muted-foreground/60">{subtitle}</span>
    </div>
  );
}

function DownloadRow({
  arch,
  badge,
  info,
  loading,
  primaryLabel,
}: {
  arch: string;
  badge: string;
  info: BuildTarget;
  loading: boolean;
  primaryLabel: string;
}) {
  const t = useTranslations('HomePage.download');
  const versionLabel = info.version
    ? t('versionLabel', { version: info.version })
    : t('unknownVersion');

  return (
    <div className="flex flex-col gap-3 border-b border-border/45 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[0.88rem] font-medium text-foreground/80">{arch}</span>
          <span className="rounded-sm border border-border/60 bg-muted/60 px-1.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-foreground/50">
            {badge}
          </span>
        </div>
        {loading ? (
          <Skeleton className="mt-1 h-3.5 w-28" />
        ) : (
          <p className="text-[0.76rem] text-muted-foreground/70">{versionLabel}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {loading || !info.url ? (
          <Button
            size="sm"
            className="h-8 rounded-md px-3.5 text-xs font-medium"
            disabled
          >
            {primaryLabel}
          </Button>
        ) : (
          <Button
            asChild
            size="sm"
            className="h-8 rounded-md px-3.5 text-xs font-medium"
          >
            <a href={info.url} target="_blank" rel="noreferrer">
              {primaryLabel}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

function PlatformItem({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  const t = useTranslations('HomePage.download');
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border/40 bg-muted/30 px-4 py-4">
      <div className="flex items-center gap-2">
        <span className="text-foreground/40">{icon}</span>
        <span className="text-[0.8rem] font-medium text-foreground/65">{title}</span>
      </div>
      <p className="text-[0.75rem] leading-5 text-muted-foreground/80">{description}</p>
      <Button
        size="sm"
        variant="ghost"
        disabled
        className="mt-auto h-7 w-fit px-2 text-[0.72rem] font-medium text-foreground/40"
      >
        {t('comingSoon')}
      </Button>
    </div>
  );
}
