import { HeaderSection } from '@/components/layout/header-section';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

interface WorkspaceCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function FeaturesSection() {
  const t = useTranslations('HomePage.features');

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'capture',
      title: t('workflow.steps.capture.title'),
      description: t('workflow.steps.capture.description'),
    },
    {
      id: 'organize',
      title: t('workflow.steps.organize.title'),
      description: t('workflow.steps.organize.description'),
    },
    {
      id: 'synthesize',
      title: t('workflow.steps.synthesize.title'),
      description: t('workflow.steps.synthesize.description'),
    },
  ];

  const workspaceCards: WorkspaceCard[] = [
    {
      id: 'editor',
      title: t('proof.cards.editor.title'),
      description: t('proof.cards.editor.description'),
      imageSrc: '/images/docs/pageview1.webp',
      imageAlt: 'Chronnote workspace editor',
    },
    {
      id: 'mindmap',
      title: t('proof.cards.mindmap.title'),
      description: t('proof.cards.mindmap.description'),
      imageSrc: '/images/docs/atom2.webp',
      imageAlt: 'Chronnote mindmap workspace',
    },
    {
      id: 'todo',
      title: t('proof.cards.todo.title'),
      description: t('proof.cards.todo.description'),
      imageSrc: '/images/docs/notebook.webp',
      imageAlt: 'Chronnote task and notebook workspace',
    },
  ];

  return (
    <section id="features" className="temple-section px-4 pt-6">
      <div className="temple-page-width space-y-14">
        <HeaderSection
          title={t('eyebrow')}
          titleClassName="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/55"
          subtitle={t('title')}
          subtitleAs="h2"
          subtitleClassName="max-w-4xl text-left text-[1.8rem] font-medium leading-[1.08] tracking-[-0.035em] text-foreground/88 md:text-[3rem]"
          description={t('description')}
          descriptionClassName="max-w-2xl text-left text-[0.96rem] leading-7 text-muted-foreground"
          className="items-start gap-3 text-left"
        />

        <div className="temple-section-grid gap-y-10 border-t border-border/40 pt-8">
          <div className="temple-rail space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
              {t('workflow.eyebrow')}
            </p>
            <h3 className="max-w-xs text-[1.2rem] font-medium leading-[1.3] text-foreground/82 md:text-[1.5rem]">
              {t('workflow.title')}
            </h3>
            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              {t('workflow.description')}
            </p>
          </div>

          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <article
                key={step.id}
                className="grid gap-3 border-b border-border/45 py-5 last:border-b-0 md:grid-cols-[72px_minmax(0,1fr)] md:gap-5"
              >
                <span className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-foreground/42">
                  0{index + 1}
                </span>
                <div className="space-y-2">
                  <h4 className="text-[1rem] font-medium text-foreground/86 md:text-[1.08rem]">
                    {step.title}
                  </h4>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6 border-t border-border/40 pt-8">
          <div className="space-y-3">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">
              {t('proof.eyebrow')}
            </p>
            <h3 className="max-w-3xl text-[1.35rem] font-medium leading-[1.22] tracking-[-0.02em] text-foreground/84 md:text-[2rem]">
              {t('proof.title')}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {t('proof.description')}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {workspaceCards.map((card) => (
              <article key={card.id} className="space-y-4">
                <div className="temple-workspace-frame temple-workspace-frame-card">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    width={1600}
                    height={1000}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-medium text-foreground/86">
                    {card.title}
                  </h4>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
