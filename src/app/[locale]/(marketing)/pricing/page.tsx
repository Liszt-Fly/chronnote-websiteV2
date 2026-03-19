import FaqSection from '@/components/blocks/faqs/faqs';
import PricingSection from '@/components/blocks/pricing/pricing';

export default async function PricingPage() {
  return (
    <div className="flex flex-col">
      <PricingSection />
      <FaqSection />
    </div>
  );
}
