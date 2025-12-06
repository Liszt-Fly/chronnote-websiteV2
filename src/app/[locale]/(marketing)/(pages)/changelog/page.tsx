import { ChangelogFeed } from '@/components/changelog/changelog-feed';
import Container from '@/components/layout/container';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const pt = await getTranslations({ locale, namespace: 'ChangelogPage' });

  return constructMetadata({
    title: pt('title') + ' | ' + t('title'),
    description: pt('description'),
    canonicalUrl: getUrlWithLocale('/changelog', locale),
  });
}

export default async function ChangelogPage() {
  const t = await getTranslations('ChangelogPage');

  return (
    <Container className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-center text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        <ChangelogFeed />
      </div>
    </Container>
  );
}
