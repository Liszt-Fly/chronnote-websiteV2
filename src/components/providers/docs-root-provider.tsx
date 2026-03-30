'use client';

import type { Translations } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';

interface DocsRootProviderProps {
  children: ReactNode;
  locale: string;
  locales: Array<{
    locale: string;
    name: string;
  }>;
  translations: Partial<Translations>;
}

export function DocsRootProvider({
  children,
  locale,
  locales,
  translations,
}: DocsRootProviderProps) {
  return (
    <RootProvider
      search={{ enabled: true }}
      theme={{ enabled: false }}
      i18n={{ locale, locales, translations }}
    >
      {children}
    </RootProvider>
  );
}
