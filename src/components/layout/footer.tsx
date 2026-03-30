'use client';

import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ModeSwitcherHorizontal } from '@/components/layout/mode-switcher-horizontal';
import { useFooterLinks } from '@/config/footer-config';
import { useSocialLinks } from '@/config/social-config';
import { LocaleLink } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type React from 'react';

const ICP_BEIAN_URL = 'https://beian.miit.gov.cn/';

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations();
  const footerLinks = useFooterLinks();
  const socialLinks = useSocialLinks();

  return (
    <footer className={cn('border-t border-border/70', className)}>
      <Container className="max-w-[72rem] px-4">
        <div className="temple-section-grid py-16">
          <div className="flex flex-col items-start">
            <div className="space-y-5">
              {/* logo and name */}
              <div className="flex items-center space-x-3">
                <Logo />
                <span className="font-serif text-2xl font-medium">
                  {t('Metadata.name')}
                </span>
              </div>

              {/* tagline */}
              <p className="max-w-xl py-2 text-base leading-7 text-muted-foreground md:pr-12">
                {t('Marketing.footer.tagline')}
              </p>

              {/* social links */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-2">
                  {socialLinks?.map((link) => (
                    <a
                      key={link.title}
                      href={link.href || '#'}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.title}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card/65 hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="sr-only">{link.title}</span>
                      {link.icon ? link.icon : null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* footer links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerLinks?.map((section) => (
              <div key={section.title} className="items-start">
                <span className="temple-kicker text-[0.68rem]">
                  {section.title}
                </span>
                <ul className="mt-4 list-inside space-y-3">
                  {section.items?.map(
                    (item) =>
                      item.href && (
                        <li key={item.title}>
                          <LocaleLink
                            href={item.href || '#'}
                            target={item.external ? '_blank' : undefined}
                            className="text-sm text-muted-foreground hover:text-foreground"
                          >
                            {item.title}
                          </LocaleLink>
                        </li>
                      )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="border-t border-border/70 py-8">
        <Container className="max-w-[72rem] px-4 flex items-center justify-between gap-x-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-x-4">
            <span className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {t('Metadata.name')} All Rights
              Reserved.
            </span>
            <a
              href={ICP_BEIAN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground text-sm hover:text-foreground"
            >
              {t('Marketing.footer.icp')}
            </a>
          </div>

          <div className="flex items-center gap-x-4">
            <ModeSwitcherHorizontal />
          </div>
        </Container>
      </div>
    </footer>
  );
}
