'use client';

import { HeaderSection } from '@/components/layout/header-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { IconName } from 'lucide-react/dynamic';
import { useTranslations } from 'next-intl';

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function FaqSection() {
  const t = useTranslations('HomePage.faqs');

  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      icon: 'calendar-clock',
      question: t('items.item-1.question'),
      answer: t('items.item-1.answer'),
    },
    {
      id: 'item-2',
      icon: 'wallet',
      question: t('items.item-2.question'),
      answer: t('items.item-2.answer'),
    },
    {
      id: 'item-3',
      icon: 'refresh-cw',
      question: t('items.item-3.question'),
      answer: t('items.item-3.answer'),
    },
    {
      id: 'item-4',
      icon: 'hand-coins',
      question: t('items.item-4.question'),
      answer: t('items.item-4.answer'),
    },
    {
      id: 'item-5',
      icon: 'mail',
      question: t('items.item-5.question'),
      answer: t('items.item-5.answer'),
    },
  ];

  const visibleFaqItems = faqItems.filter(
    (item) => item.question && item.question.trim().length > 0
  );

  return (
    <section id="faqs" className="temple-section px-4">
      <div className="mx-auto max-w-5xl space-y-12">
        <HeaderSection
          title={t('title')}
          titleAs="h2"
          subtitle={t('subtitle')}
          subtitleAs="p"
        />

        <div className="grid gap-10 md:grid-cols-[0.24fr_0.76fr]">
          <div className="border-t border-border/70 pt-6">
            <span className="temple-bookmark">{t('title')}</span>
          </div>

          <Accordion
            type="single"
            collapsible
            className="border-t border-border/70"
          >
            {visibleFaqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-border/70"
              >
                <AccordionTrigger className="cursor-pointer py-5 text-left text-base hover:no-underline">
                  <span className="grid w-full gap-2 md:grid-cols-[0.1fr_0.9fr]">
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      0{index + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2 pb-5 md:grid-cols-[0.1fr_0.9fr]">
                    <span />
                    <p className="text-base leading-7 text-muted-foreground">
                      {item.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
