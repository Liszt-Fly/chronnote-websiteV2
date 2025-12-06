'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MessageCircle, MessageSquare, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { ComponentType, SVGProps } from 'react';
import { useState } from 'react';

const WECHAT_QR_URL =
  'https://qiaoyangedu.oss-cn-beijing.aliyuncs.com/chronnote/WeChat.JPG';
const QQ_LINK = 'https://qm.qq.com/q/pAeSI78uVa';
const XIAOHONGSHU_QR_URL =
  'https://qiaoyangedu.oss-cn-beijing.aliyuncs.com/chronnote/rednote.jpg';

type ChannelKey = 'wechat' | 'qq' | 'xiaohongshu';

interface ChannelConfig {
  key: ChannelKey;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  href?: string;
  action?: 'wechat-modal' | 'xhs-modal';
}

export default function CallToActionSection() {
  const t = useTranslations('HomePage.calltoaction');
  const [wechatOpen, setWechatOpen] = useState(false);
  const [xhsOpen, setXhsOpen] = useState(false);

  const channels: ChannelConfig[] = [
    {
      key: 'wechat',
      icon: MessageCircle,
      action: 'wechat-modal',
    },
    {
      key: 'qq',
      icon: MessageSquare,
      href: QQ_LINK,
    },
    {
      key: 'xiaohongshu',
      icon: Sparkles,
      action: 'xhs-modal',
    },
  ];

  const handleChannelAction = (channel: ChannelConfig) => {
    if (channel.action === 'wechat-modal') {
      setWechatOpen(true);
    }
    if (channel.action === 'xhs-modal') {
      setXhsOpen(true);
    }
  };

  return (
    <section id="call-to-action" className="px-4 py-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border bg-gradient-to-br from-muted/60 via-muted/30 to-background p-10 text-center shadow-xl">
        <div className="space-y-6">
          <Badge className="mx-auto w-fit" variant="outline">
            {t('badge')}
          </Badge>
          <div className="space-y-4">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {channels.map((channel) => (
            <CommunityCard
              key={channel.key}
              icon={channel.icon}
              title={t(`channels.${channel.key}.title`)}
              description={t(`channels.${channel.key}.description`)}
              actionLabel={t(`channels.${channel.key}.action`)}
              href={channel.href}
              onAction={
                channel.action ? () => handleChannelAction(channel) : undefined
              }
            />
          ))}
        </div>
      </div>

      <Dialog open={wechatOpen} onOpenChange={setWechatOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('wechatModal.title')}</DialogTitle>
            <DialogDescription>
              {t('wechatModal.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-square overflow-hidden rounded-2xl border">
            <Image
              src={WECHAT_QR_URL}
              alt="Chronnote WeChat QR"
              width={640}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={xhsOpen} onOpenChange={setXhsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('xhsModal.title')}</DialogTitle>
            <DialogDescription>{t('xhsModal.description')}</DialogDescription>
          </DialogHeader>
          <div className="aspect-square overflow-hidden rounded-2xl border">
            <Image
              src={XIAOHONGSHU_QR_URL}
              alt="Chronnote Xiaohongshu QR"
              width={640}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

interface CommunityCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  onAction?: () => void;
}

function CommunityCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
  onAction,
}: CommunityCardProps) {
  return (
    <div className="h-full rounded-2xl border bg-card/80 p-6 text-left shadow-sm">
      <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button
        className="mt-6 w-full"
        size="lg"
        variant={href || onAction ? 'default' : 'outline'}
        asChild={Boolean(href) && !onAction}
        onClick={onAction}
        disabled={!href && !onAction}
      >
        {href && !onAction ? (
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            {actionLabel}
          </a>
        ) : (
          <span>{actionLabel}</span>
        )}
      </Button>
    </div>
  );
}
