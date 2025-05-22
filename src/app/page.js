import Image from "next/image";
import PageLayout from "@/components/shared/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import TemplateCarousel from "@/components/home/TemplateCarousel";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TemplateCarousel />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </PageLayout>
  );
}
