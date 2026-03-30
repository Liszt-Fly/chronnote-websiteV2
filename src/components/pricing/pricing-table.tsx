'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePricePlans } from '@/config/price-config';
import { formatPrice } from '@/lib/formatter';
import { cn } from '@/lib/utils';
import {
  PaymentTypes,
  type PlanInterval,
  PlanIntervals,
  type Price,
  type PricePlan,
} from '@/payment/types';
import { ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

interface PricingTableProps {
  metadata?: Record<string, string>;
  currentPlan?: PricePlan | null;
  className?: string;
}

const LIFETIME_TAB = 'lifetime' as const;
type PricingTab = PlanInterval | typeof LIFETIME_TAB;

function getPriceForPlan(
  plan: PricePlan,
  interval?: PlanInterval,
  paymentType?: PaymentTypes
): Price | undefined {
  if (plan.isFree) return undefined;

  return plan.prices.find((price) => {
    if (price.disabled) return false;
    if (paymentType === PaymentTypes.ONE_TIME) {
      return price.type === PaymentTypes.ONE_TIME;
    }

    return (
      price.type === PaymentTypes.SUBSCRIPTION && price.interval === interval
    );
  });
}

export function PricingTable({
  metadata,
  currentPlan,
  className,
}: PricingTableProps) {
  const t = useTranslations('PricingPage');
  const cardT = useTranslations('PricingPage.PricingCard');
  const locale = useLocale();
  const pricePlans = usePricePlans();
  const plans = Object.values(pricePlans).filter((plan) => !plan.disabled);

  const freePlans = plans.filter((plan) => plan.isFree);
  const subscriptionPlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.SUBSCRIPTION
      )
  );
  const oneTimePlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.ONE_TIME
      )
  );

  const hasMonthlyOption = subscriptionPlans.some((plan) =>
    plan.prices.some(
      (price) =>
        price.type === PaymentTypes.SUBSCRIPTION &&
        price.interval === PlanIntervals.MONTH
    )
  );
  const hasYearlyOption = subscriptionPlans.some((plan) =>
    plan.prices.some(
      (price) =>
        price.type === PaymentTypes.SUBSCRIPTION &&
        price.interval === PlanIntervals.YEAR
    )
  );
  const hasLifetimeOption = oneTimePlans.length > 0;

  const defaultTab: PricingTab = hasMonthlyOption
    ? PlanIntervals.MONTH
    : hasYearlyOption
      ? PlanIntervals.YEAR
      : hasLifetimeOption
        ? LIFETIME_TAB
        : PlanIntervals.MONTH;

  const [activeTab, setActiveTab] = useState<PricingTab>(defaultTab);
  const selectedInterval: PlanInterval =
    activeTab === LIFETIME_TAB ? PlanIntervals.MONTH : activeTab;

  const visiblePlans =
    activeTab === LIFETIME_TAB
      ? [...freePlans, ...oneTimePlans]
      : [...freePlans, ...subscriptionPlans];

  const rowLabels = [
    { key: 'description', label: t('description') },
    { key: 'price', label: t('title') },
    { key: 'feature1', label: 'I' },
    { key: 'feature2', label: 'II' },
    { key: 'feature3', label: 'III' },
    { key: 'feature4', label: 'IV' },
  ] as const;

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {[hasMonthlyOption, hasYearlyOption, hasLifetimeOption].filter(Boolean)
        .length > 1 && (
        <div className="flex justify-center">
          <ToggleGroup
            size="sm"
            type="single"
            value={activeTab}
            onValueChange={(value) =>
              value && setActiveTab(value as PricingTab)
            }
            className="border border-border/70 p-0.5"
          >
            {hasMonthlyOption && (
              <ToggleGroupItem
                value="month"
                className="rounded-none px-2.5 py-0 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {t('monthly')}
              </ToggleGroupItem>
            )}
            {hasYearlyOption && (
              <ToggleGroupItem
                value="year"
                className="rounded-none px-2.5 py-0 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {t('yearly')}
              </ToggleGroupItem>
            )}
            {hasLifetimeOption && (
              <ToggleGroupItem
                value={LIFETIME_TAB}
                className="rounded-none px-2.5 py-0 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              >
                {t('lifetime')}
              </ToggleGroupItem>
            )}
          </ToggleGroup>
        </div>
      )}

      <div className="overflow-x-auto">
        <div
          className="grid min-w-[760px] border-t border-border/70"
          style={{
            gridTemplateColumns: `0.18fr repeat(${visiblePlans.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="border-b border-border/70 py-5" />
          {visiblePlans.map((plan) => {
            const paymentType = plan.isLifetime
              ? PaymentTypes.ONE_TIME
              : PaymentTypes.SUBSCRIPTION;
            const price = getPriceForPlan(plan, selectedInterval, paymentType);
            const formattedPrice = plan.isFree
              ? cardT('freePrice')
              : price
                ? formatPrice(price.amount, price.currency, locale)
                : cardT('notAvailable');

            return (
              <div
                key={plan.id}
                className="border-b border-l border-border/70 px-4 py-5"
              >
                <p className="temple-kicker">{plan.name}</p>
                <h3 className="mt-2.5 font-serif text-[1.45rem] font-medium text-foreground">
                  {formattedPrice}
                </h3>
                {!plan.isFree && price && (
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {plan.isLifetime
                      ? t('lifetime')
                      : selectedInterval === PlanIntervals.YEAR
                        ? cardT('perYear')
                        : cardT('perMonth')}
                  </p>
                )}
              </div>
            );
          })}

          {rowLabels.map((row) => (
            <>
              <div
                key={`${row.key}-label`}
                className="border-b border-border/70 py-4 pr-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              >
                {row.label}
              </div>
              {visiblePlans.map((plan) => {
                const featureValue =
                  row.key === 'description'
                    ? plan.description
                    : row.key === 'price'
                      ? plan.isFree
                        ? cardT('getStartedForFree')
                        : plan.isLifetime
                          ? cardT('getLifetimeAccess')
                          : cardT('getStarted')
                      : plan.features?.[
                          Number.parseInt(row.key.replace('feature', ''), 10) -
                            1
                        ] || '—';

                return (
                  <div
                    key={`${plan.id}-${row.key}`}
                    className="border-b border-l border-border/70 px-4 py-4 text-sm leading-7 text-muted-foreground"
                  >
                    {row.key === 'price' ? (
                      <span className="inline-flex items-center gap-2 text-foreground">
                        {featureValue}
                        <ArrowRight className="size-4 text-primary" />
                      </span>
                    ) : (
                      featureValue
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="grid gap-5 border-y border-border/70 py-5 md:grid-cols-[0.32fr_0.68fr]">
        <p className="temple-kicker">{t('aiCredits.title')}</p>
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted-foreground">
            {t('aiCredits.description')}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              t('aiCredits.example1'),
              t('aiCredits.example2'),
              t('aiCredits.example3'),
            ].map((item, index) => (
              <div
                key={`${item}-${index}`}
                className="border-l border-border/70 pl-4 text-sm leading-7 text-muted-foreground"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  0{index + 1}
                </p>
                <p className="mt-2 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
