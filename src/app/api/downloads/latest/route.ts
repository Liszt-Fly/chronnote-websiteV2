import { NextResponse } from 'next/server';

const WINDOWS_RELEASE_URL = 'https://api.chronnote.top/release/latest.yml';
const MAC_RELEASE_URL = 'https://api.chronnote.top/release/latest-mac.yml';

interface BuildTarget {
  version?: string;
  url?: string;
}

interface BuildInfo {
  windows: BuildTarget;
  macIntel: BuildTarget;
  macApple: BuildTarget;
}

const EMPTY: BuildInfo = { windows: {}, macIntel: {}, macApple: {} };

export async function GET() {
  try {
    const [windowsResult, macResult] = await Promise.allSettled([
      fetchWindowsRelease(),
      fetchMacRelease(),
    ]);

    const windows =
      windowsResult.status === 'fulfilled' ? windowsResult.value : EMPTY.windows;
    const macIntel =
      macResult.status === 'fulfilled' ? macResult.value.intel : EMPTY.macIntel;
    const macApple =
      macResult.status === 'fulfilled' ? macResult.value.apple : EMPTY.macApple;

    return NextResponse.json(
      { windows, macIntel, macApple } satisfies BuildInfo,
      { status: 200 }
    );
  } catch {
    return NextResponse.json(EMPTY, { status: 200 });
  }
}

async function fetchWindowsRelease(): Promise<BuildTarget> {
  const response = await fetch(WINDOWS_RELEASE_URL, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch Windows release');

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
  const response = await fetch(MAC_RELEASE_URL, { cache: 'no-store' });

  if (!response.ok) throw new Error('Failed to fetch macOS release');

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
    manifest.matchAll(/^\s*(?:-\s*)?(?:url|path):\s*(.+)\s*$/gm)
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
