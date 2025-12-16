'use client';

import {
  Apple,
  Globe,
  Laptop,
  Smartphone,
  TabletSmartphone,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const WINDOWS_RELEASE_URL = 'https://api.chronnote.top/release/latest.yml';
const MAC_RELEASE_URL = 'https://api.chronnote.top/release/latest-mac.yml';
const FEISHU_FALLBACK_URL =
  'https://gcne267coy02.feishu.cn/docx/JA1ndaZ2ZosjTmxz4fIc4AqtnCb';

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
        const [windowsResult, macResult] = await Promise.allSettled([
          fetchWindowsRelease(),
          fetchMacRelease(),
        ]);

        if (cancelled) return;

        setBuildInfo({
          windows:
            windowsResult.status === 'fulfilled'
              ? windowsResult.value
              : INITIAL_BUILD_INFO.windows,
          macIntel:
            macResult.status === 'fulfilled'
              ? macResult.value.intel
              : INITIAL_BUILD_INFO.macIntel,
          macApple:
            macResult.status === 'fulfilled'
              ? macResult.value.apple
              : INITIAL_BUILD_INFO.macApple,
        });
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load download manifests', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadBuilds();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="download" className="bg-muted/30 px-4 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            {t('eyebrow')}
          </Badge>
          <div className="space-y-4">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DesktopCard
            icon={<Apple className="size-6" />}
            title={t('mac.title')}
            description={t('mac.subtitle')}
          >
            <DownloadRow
              title={t('mac.intel')}
              badge={t('mac.badgeIntel')}
              info={buildInfo.macIntel}
              loading={loading}
              buttonLabel={t('downloadNow')}
            />
            <DownloadRow
              title={t('mac.apple')}
              badge={t('mac.badgeApple')}
              info={buildInfo.macApple}
              loading={loading}
              buttonLabel={t('downloadNow')}
            />
          </DesktopCard>

          <DesktopCard
            icon={<Laptop className="size-6" />}
            title={t('windows.title')}
            description={t('windows.subtitle')}
          >
            <DownloadRow
              title={t('windows.subtitle')}
              badge={t('windows.badge')}
              info={buildInfo.windows}
              loading={loading}
              buttonLabel={t('downloadNow')}
            />
          </DesktopCard>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground">{t('otherPlatforms')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <PlatformCard
              icon={<Globe className="size-5" />}
              title={t('web.title')}
              description={t('web.description')}
            />
            <PlatformCard
              icon={<Smartphone className="size-5" />}
              title={t('ios.title')}
              description={t('ios.description')}
            />
            <PlatformCard
              icon={<TabletSmartphone className="size-5" />}
              title={t('android.title')}
              description={t('android.description')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopCard({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <Card className="h-full border border-border/60 bg-card/80 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
            {icon}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{description}</p>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}

function DownloadRow({
  title,
  badge,
  info,
  buttonLabel,
  loading,
}: {
  title: string;
  badge: string;
  info: BuildTarget;
  buttonLabel: string;
  loading: boolean;
}) {
  const t = useTranslations('HomePage.download');
  const versionLabel = info.version
    ? t('versionLabel', { version: info.version })
    : t('unknownVersion');

  return (
    <div className="flex flex-col gap-4 border-b border-dashed border-border/60 pb-6 last:border-none last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        {loading ? (
          <Skeleton className="h-4 w-28" />
        ) : (
          <p className="text-sm text-muted-foreground">{versionLabel}</p>
        )}
      </div>
      <DownloadButtonGroup
        primaryHref={info.url}
        primaryLabel={buttonLabel}
        fallbackHref={FEISHU_FALLBACK_URL}
        fallbackLabel={t('fallbackDownload')}
        disabled={loading}
      />
    </div>
  );
}

function DownloadButtonGroup({
  primaryHref,
  primaryLabel,
  fallbackHref,
  fallbackLabel,
  disabled,
}: {
  primaryHref?: string;
  primaryLabel: string;
  fallbackHref: string;
  fallbackLabel: string;
  disabled: boolean;
}) {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
      {disabled || !primaryHref ? (
        <Button size="lg" className="w-full sm:w-auto" disabled>
          {primaryLabel}
        </Button>
      ) : (
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href={primaryHref} target="_blank" rel="noreferrer">
            {primaryLabel}
          </a>
        </Button>
      )}

      {disabled ? (
        <Button
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          disabled
        >
          {fallbackLabel}
        </Button>
      ) : (
        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
          <a href={fallbackHref} target="_blank" rel="noreferrer">
            {fallbackLabel}
          </a>
        </Button>
      )}
    </div>
  );
}

function PlatformCard({
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
    <Card className="h-full border border-border/60 bg-card/60 shadow-none">
      <CardContent className="flex h-full flex-col items-center gap-4 py-8 text-center">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button size="sm" variant="outline" disabled className="mt-auto">
          {t('comingSoon')}
        </Button>
      </CardContent>
    </Card>
  );
}

async function fetchWindowsRelease(): Promise<BuildTarget> {
  const response = await fetch(`${WINDOWS_RELEASE_URL}?t=${Date.now()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Windows release');
  }

  const manifest = await response.text();
  const parsed = parseYamlManifest(manifest);
  const executable = parsed.urls.find(
    (url) => /\.exe($|\?)/i.test(url) && !url.includes('blockmap')
  );

  return {
    version: parsed.version,
    url: executable ? resolveManifestUrl(executable, response.url) : undefined,
  };
}

async function fetchMacRelease(): Promise<{
  intel: BuildTarget;
  apple: BuildTarget;
}> {
  const response = await fetch(`${MAC_RELEASE_URL}?t=${Date.now()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch macOS release');
  }

  const manifest = await response.text();
  const parsed = parseYamlManifest(manifest);
  const universal = parsed.urls.find(
    (url) => url.includes('universal.dmg') && !url.includes('blockmap')
  );
  const appleSilicon = parsed.urls.find(
    (url) => url.includes('arm64.dmg') && !url.includes('blockmap')
  );
  const fallbackDmg = parsed.urls.find(
    (url) => url.endsWith('.dmg') && !url.includes('blockmap')
  );

  return {
    intel: {
      version: parsed.version,
      url:
        universal || fallbackDmg
          ? resolveManifestUrl(universal ?? fallbackDmg!, response.url)
          : undefined,
    },
    apple: {
      version: parsed.version,
      url:
        appleSilicon || universal || fallbackDmg
          ? resolveManifestUrl(
              (appleSilicon ?? universal ?? fallbackDmg)!,
              response.url
            )
          : undefined,
    },
  };
}

function parseYamlManifest(manifest: string): {
  version?: string;
  urls: string[];
} {
  const version = manifest.match(/version:\s*([^\n]+)/)?.[1]?.trim();
  const urls = Array.from(
    manifest.matchAll(/^(?:\s*-\s*)?(?:url|path):\s*(.+)\s*$/gm)
  ).map((match) => match[1].trim());

  return { version, urls };
}

function resolveManifestUrl(url: string, manifestUrl: string) {
  try {
    return new URL(url, manifestUrl).toString();
  } catch {
    return url;
  }
}
