'use client';

import { Loader2, RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/formatter';

const API_ENDPOINT = 'https://api.chronnote.top/version/features';

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface VersionItem {
  version: string;
  createdAt?: string;
  releaseDate?: string;
  features?: FeaturePayload;
}

interface FeatureObject {
  features?: string[];
  optimizations?: string[];
  bugfixes?: string[];
  [key: string]: string[] | undefined;
}

type FeaturePayload = FeatureObject | string[] | undefined;

interface ApiResponse {
  code: number;
  message?: string;
  data?: {
    items: VersionItem[];
    pagination: Pagination;
  };
}

interface Section {
  title: string;
  items: string[];
}

export function ChangelogFeed() {
  const t = useTranslations('ChangelogPage');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageData, setPageData] = useState<{
    items: VersionItem[];
    pagination: Pagination;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_ENDPOINT}?page=${page}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`${t('fetchError')} (${response.status})`);
        }

        const payload: ApiResponse = await response.json();

        if (payload.code !== 0 || !payload.data) {
          throw new Error(payload.message || t('unknownError'));
        }

        setPageData(payload.data);
        setCurrentPage(page);
      } catch (err) {
        const message = err instanceof Error ? err.message : t('networkError');
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const items = pageData?.items ?? [];
  const totalPages = pageData?.pagination?.totalPages ?? 1;

  const handleRetry = () => fetchData(currentPage);

  return (
    <div className="mt-10 space-y-6">
      {loading && (
        <div className="flex items-center justify-center py-10 text-muted-foreground">
          <Loader2 className="mr-2 size-5 animate-spin" />
          {t('loading')}
        </div>
      )}

      {!loading && error && (
        <Alert variant="destructive">
          <AlertTitle>{t('errorTitle')}</AlertTitle>
          <AlertDescription className="space-y-3">
            <p>{error}</p>
            <Button onClick={handleRetry} variant="outline" size="sm">
              <RefreshCcw className="mr-2 size-4" />
              {t('retry')}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
          {t('empty')}
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-6">
          {items.map((item) => (
            <VersionCard key={item.version} item={item} />
          ))}
        </div>
      )}

      {!loading && !error && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <Button
                key={pageNumber}
                variant={pageNumber === currentPage ? 'default' : 'outline'}
                onClick={() => fetchData(pageNumber)}
                disabled={pageNumber === currentPage || loading}
                size="sm"
              >
                {pageNumber}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function VersionCard({ item }: { item: VersionItem }) {
  const t = useTranslations('ChangelogPage');
  const sections = useMemo(() => buildSections(item.features, t), [item, t]);
  const dateLabel = item.createdAt || item.releaseDate;
  const formattedDate = dateLabel ? formatDate(new Date(dateLabel)) : null;

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            {t('versionLabel', { version: item.version })}
          </h2>
          <Badge variant="secondary" className="w-fit">
            {item.version}
          </Badge>
        </div>
        {formattedDate && (
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
        )}
        <Separator />
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t('noDetails')}</p>
        ) : (
          sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="font-semibold">{section.title}</h3>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {section.items.map((entry, idx) => (
                  <li key={idx}>{entry}</li>
                ))}
              </ul>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function buildSections(payload: FeaturePayload, t: any) {
  if (!payload) return [];

  if (Array.isArray(payload)) {
    return payload.length ? [{ title: t('features'), items: payload }] : [];
  }

  if (!isFeatureObject(payload)) return [];

  const definitions = [
    { label: t('newFeatures'), keys: ['features', '新功能'] },
    { label: t('improvements'), keys: ['optimizations', '改进'] },
    { label: t('bugfixes'), keys: ['bugfixes', '修复'] },
  ];

  const sections: Section[] = [];

  definitions.forEach(({ label, keys }) => {
    const combined: string[] = [];
    keys.forEach((key) => {
      const items = payload[key];
      if (Array.isArray(items)) {
        combined.push(...items);
      }
    });
    if (combined.length) {
      sections.push({ title: label, items: combined });
    }
  });

  return sections;
}

function isFeatureObject(value: FeaturePayload): value is FeatureObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
