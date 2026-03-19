'use client';

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
    if (channel.action === 'wechat-modal') setWechatOpen(true);
    if (channel.action === 'xhs-modal') setXhsOpen(true);
  };

  return (
    <section id="call-to-action" className="temple-section px-4 pt-0">
      <div className="temple-page-width border-t border-border/70 pt-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
          <div className="space-y-3">
            <span className="temple-bookmark">{t('badge')}</span>
            <h2 className="temple-measure font-serif text-[1.55rem] text-foreground/86 temple-seraph md:text-[1.9rem]">
              {t('title')}
            </h2>
          </div>

          <div className="space-y-6">
            <p className="temple-measure text-sm leading-8 text-muted-foreground">
              {t('description')}
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="overflow-hidden border border-border/45">
                <Image
                  src="/images/docs/atom2.webp"
                  alt="Chronnote atom view"
                  width={1356}
                  height={934}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-border/45">
                <Image
                  src="/images/img1.webp"
                  alt="Chronnote room view"
                  width={1207}
                  height={929}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden border border-border/45">
                <Image
                  src="/images/media/title.webp"
                  alt="Chronnote workspace board"
                  width={3528}
                  height={2240}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-0 border-t border-border/70">
              {channels.map((channel, index) => (
                <EndnoteRow
                  key={channel.key}
                  index={index + 1}
                  icon={channel.icon}
                  title={t(`channels.${channel.key}.title`)}
                  description={t(`channels.${channel.key}.description`)}
                  actionLabel={t(`channels.${channel.key}.action`)}
                  href={channel.href}
                  onAction={
                    channel.action
                      ? () => handleChannelAction(channel)
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
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
          <div className="aspect-square overflow-hidden border border-border/70">
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
          <div className="aspect-square overflow-hidden border border-border/70">
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

interface EndnoteRowProps {
  index: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  actionLabel: string;
  href?: string;
  onAction?: () => void;
}

function EndnoteRow({
  index,
  icon: Icon,
  title,
  description,
  actionLabel,
  href,
  onAction,
}: EndnoteRowProps) {
  const content = (
    <div className="grid gap-3 py-4 transition-colors hover:text-foreground md:grid-cols-[0.08fr_0.12fr_0.55fr_0.25fr]">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        0{index}
      </span>
      <span className="flex items-center text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <h3 className="text-base font-medium text-foreground">{title}</h3>
      </div>
      <span className="text-sm text-muted-foreground">{actionLabel}</span>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        className="block border-b border-border/70"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onAction}
      className="block w-full border-b border-border/70 text-left"
    >
      {content}
    </button>
  );
}
