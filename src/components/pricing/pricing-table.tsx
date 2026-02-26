'use client';

import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { usePricePlans } from '@/config/price-config';
import { cn } from '@/lib/utils';
import {
  PaymentTypes,
  type PlanInterval,
  PlanIntervals,
  type PricePlan,
} from '@/payment/types';
import { ArrowRight, Coins, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PricingCard } from './pricing-card';

interface PricingTableProps {
  metadata?: Record<string, string>;
  currentPlan?: PricePlan | null;
  className?: string;
}

const LIFETIME_TAB = 'lifetime' as const;
type PricingTab = PlanInterval | typeof LIFETIME_TAB;
const TREND_WIDTH = 760;
const TREND_HEIGHT = 220;
const TREND_PADDING = { top: 18, right: 14, bottom: 24, left: 14 };
const PRICE_TREND_POINTS = [24, 25, 24, 26, 25, 27, 26, 28, 26];

type Point = { x: number; y: number };

function parseCreditExample(example: string): { left: string; right: string } {
  const [left, right] = example.split('=').map((part) => part.trim());
  return {
    left: left || example,
    right: right || '',
  };
}

function smoothPath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return d;
}

function createTrendShape(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);
  const top = TREND_PADDING.top;
  const bottom = TREND_HEIGHT - TREND_PADDING.bottom;
  const left = TREND_PADDING.left;
  const right = TREND_WIDTH - TREND_PADDING.right;
  const stepX = (right - left) / Math.max(values.length - 1, 1);

  const points: Point[] = values.map((value, index) => ({
    x: left + stepX * index,
    y: top + ((max - value) / range) * (bottom - top),
  }));

  const linePath = smoothPath(points);
  const areaPath =
    `${linePath} L ${points[points.length - 1]?.x ?? right} ${bottom}` +
    ` L ${points[0]?.x ?? left} ${bottom} Z`;

  const gridYs = Array.from({ length: 4 }, (_, i) => {
    const ratio = i / 3;
    return top + ratio * (bottom - top);
  });

  return {
    linePath,
    areaPath,
    points,
    min,
    max,
    gridYs,
    bottom,
    left,
    right,
  };
}

/**
 * Pricing Table Component
 *
 * 1. Displays all pricing plans with selection tabs:
 * monthly/yearly for subscriptions, lifetime for one-time plans
 * 2. If a plan is disabled, it will not be displayed in the pricing table
 * 3. If a price is disabled, it will not be displayed in the pricing table
 */
export function PricingTable({
  metadata,
  currentPlan,
  className,
}: PricingTableProps) {
  const t = useTranslations('PricingPage');

  // Get price plans with translations
  const pricePlans = usePricePlans();
  const plans = Object.values(pricePlans);

  // Current plan ID for comparison
  const currentPlanId = currentPlan?.id || null;

  // Filter plans into free, subscription and one-time plans
  const freePlans = plans.filter((plan) => plan.isFree && !plan.disabled);

  const subscriptionPlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      !plan.disabled &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.SUBSCRIPTION
      )
  );

  const oneTimePlans = plans.filter(
    (plan) =>
      !plan.isFree &&
      !plan.disabled &&
      plan.prices.some(
        (price) => !price.disabled && price.type === PaymentTypes.ONE_TIME
      )
  );

  // Check if any plan has a monthly price option
  const hasMonthlyOption = subscriptionPlans.some((plan) =>
    plan.prices.some(
      (price) =>
        price.type === PaymentTypes.SUBSCRIPTION &&
        price.interval === PlanIntervals.MONTH
    )
  );

  // Check if any plan has a yearly price option
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

  const handleTabChange = (value: string) => {
    setActiveTab(value as PricingTab);
  };

  const selectedInterval: PlanInterval =
    activeTab === LIFETIME_TAB ? PlanIntervals.MONTH : activeTab;
  const visibleSubscriptionPlans =
    activeTab === LIFETIME_TAB ? [] : subscriptionPlans;
  const visibleOneTimePlans = activeTab === LIFETIME_TAB ? oneTimePlans : [];
  const creditExamples = [
    t('aiCredits.example1'),
    t('aiCredits.example2'),
    t('aiCredits.example3'),
  ].map(parseCreditExample);
  const trendShape = createTrendShape(PRICE_TREND_POINTS);

  return (
    <div className={cn('flex flex-col gap-12', className)}>
      {/* Show pricing tabs when there are at least two choices */}
      {[hasMonthlyOption, hasYearlyOption, hasLifetimeOption].filter(Boolean)
        .length > 1 && (
        <div className="flex justify-center">
          <ToggleGroup
            size="sm"
            type="single"
            value={activeTab}
            onValueChange={(value) => value && handleTabChange(value)}
            className="border rounded-lg p-1"
          >
            {hasMonthlyOption && (
              <ToggleGroupItem
                value="month"
                className={cn(
                  'px-3 py-0 cursor-pointer text-sm rounded-md',
                  'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                )}
              >
                {t('monthly')}
              </ToggleGroupItem>
            )}
            {hasYearlyOption && (
              <ToggleGroupItem
                value="year"
                className={cn(
                  'px-3 py-0 cursor-pointer text-sm rounded-md',
                  'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                )}
              >
                {t('yearly')}
              </ToggleGroupItem>
            )}
            {hasLifetimeOption && (
              <ToggleGroupItem
                value={LIFETIME_TAB}
                className={cn(
                  'px-3 py-0 cursor-pointer text-sm rounded-md',
                  'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
                )}
              >
                {t('lifetime')}
              </ToggleGroupItem>
            )}
          </ToggleGroup>
        </div>
      )}

      {/* Calculate total number of visible plans */}
      {(() => {
        const totalVisiblePlans =
          freePlans.length +
          visibleSubscriptionPlans.length +
          visibleOneTimePlans.length;
        return (
          <div
            className={cn(
              'grid gap-6',
              // Universal solution that handles any number of cards
              totalVisiblePlans === 1 && 'grid-cols-1 max-w-md mx-auto w-full',
              totalVisiblePlans === 2 &&
                'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full',
              totalVisiblePlans >= 3 &&
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {/* Render free plans (always visible) */}
            {freePlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                metadata={metadata}
                isCurrentPlan={currentPlanId === plan.id}
              />
            ))}

            {/* Render subscription plans with the selected interval */}
            {visibleSubscriptionPlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                interval={selectedInterval}
                paymentType={PaymentTypes.SUBSCRIPTION}
                metadata={metadata}
                isCurrentPlan={currentPlanId === plan.id}
              />
            ))}

            {/* Render one-time plans */}
            {visibleOneTimePlans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                paymentType={PaymentTypes.ONE_TIME}
                metadata={metadata}
                isCurrentPlan={currentPlanId === plan.id}
              />
            ))}
          </div>
        );
      })()}

      <div className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 via-background to-cyan-50/70 p-6 shadow-[0_12px_40px_-24px_rgba(16,185,129,0.55)] dark:border-emerald-900/40 dark:from-emerald-950/30 dark:via-background dark:to-cyan-950/25">
          <div className="pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/15" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />

          <div className="relative flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-1.5 border-emerald-200 bg-emerald-100/70 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200"
              >
                <Sparkles className="size-3.5" />
                {t('aiCredits.tag')}
              </Badge>
              <h3 className="text-xl font-semibold tracking-tight">
                {t('aiCredits.title')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('aiCredits.description')}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200/70 bg-background/80 px-5 py-4 backdrop-blur dark:border-emerald-900/50 dark:bg-background/60">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t('aiCredits.ratioLabel')}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xl font-bold">
                <Coins className="size-5 text-emerald-600 dark:text-emerald-400" />
                <span>{t('aiCredits.ratio')}</span>
              </div>
            </div>
          </div>

          <div className="relative mt-5 rounded-2xl border border-emerald-200/70 bg-background/65 p-3 dark:border-emerald-900/50 dark:bg-background/40">
            <div className="mb-2 px-1">
              <p className="text-xs font-medium text-muted-foreground">
                {t('aiCredits.trendTitle')}
              </p>
            </div>

            <svg
              viewBox={`0 0 ${TREND_WIDTH} ${TREND_HEIGHT}`}
              className="h-44 w-full"
              role="img"
              aria-label={t('aiCredits.trendAriaLabel')}
            >
              <defs>
                <linearGradient
                  id="price-trend-line"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgb(16 185 129)" />
                  <stop offset="100%" stopColor="rgb(6 182 212)" />
                </linearGradient>
                <linearGradient
                  id="price-trend-fill"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(16,185,129,0.28)" />
                  <stop offset="100%" stopColor="rgba(16,185,129,0.03)" />
                </linearGradient>
                <filter id="price-trend-glow">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {trendShape.gridYs.map((y, index) => (
                <line
                  key={index}
                  x1={trendShape.left}
                  y1={y}
                  x2={trendShape.right}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.12"
                />
              ))}

              <path d={trendShape.areaPath} fill="url(#price-trend-fill)" />
              <path
                d={trendShape.linePath}
                fill="none"
                stroke="url(#price-trend-line)"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {trendShape.points.map((point, index) => (
                <circle
                  key={`${point.x}-${point.y}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="2"
                  fill="rgb(16 185 129)"
                  fillOpacity="0.75"
                />
              ))}

              <circle
                r="10"
                fill="rgba(16,185,129,0.28)"
                filter="url(#price-trend-glow)"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path={trendShape.linePath}
                  keyPoints="0;1;0"
                  keyTimes="0;0.5;1"
                />
              </circle>
              <circle
                r="5.5"
                fill="white"
                stroke="rgb(16 185 129)"
                strokeWidth="3"
              >
                <animateMotion
                  dur="6s"
                  repeatCount="indefinite"
                  path={trendShape.linePath}
                  keyPoints="0;1;0"
                  keyTimes="0;0.5;1"
                />
              </circle>
            </svg>

            <p className="mt-2 px-1 text-xs text-muted-foreground">
              {t('aiCredits.trendNotice')}
            </p>
          </div>

          <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {creditExamples.map((example, index) => (
              <div
                key={`${example.left}-${example.right}-${index}`}
                className="rounded-xl border border-border/70 bg-background/75 px-4 py-3 backdrop-blur transition-colors hover:border-emerald-300/70 dark:hover:border-emerald-700/60"
              >
                <p className="text-xs font-medium text-muted-foreground">
                  {t('aiCredits.examplePrefix', { index: index + 1 })}
                </p>
                <div className="mt-1.5 flex items-center justify-between gap-2 text-sm font-semibold">
                  <span>{example.left}</span>
                  <ArrowRight className="size-4 text-emerald-600/80 dark:text-emerald-400/80" />
                  <span className="text-emerald-700 dark:text-emerald-300">
                    {example.right}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
