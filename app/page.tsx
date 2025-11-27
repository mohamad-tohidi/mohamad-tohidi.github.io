import { StorySection } from "@/components/story-section"
import { TranslationSection } from "@/components/translation-section"
import { HighlightSection } from "@/components/highlight-section"
import { ChatDemo } from "@/components/chat-demo"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"

const slides = [
  {
    id: 2,
    label: "هوشمند",
    title: "پاسخ، به سلیقه شما،",
    subtitle: "با رفرنس‌دهی به منابع شما.",
  },
  {
    id: 3,
    label: "سریع",
    title: "پاسخ‌های فوری.",
    subtitle: "بدون انتظار.",
  },
  {
    id: 4,
    label: "یکپارچه",
    title: "بخشی از برند شما.",
    subtitle: "کاملاً بومی.",
  },
]

export default function Home() {
  return (
    <main className="relative h-screen snap-y snap-mandatory overflow-y-auto">
      <ScrollIndicator totalSections={9} />

      <HeroSection />

      <TranslationSection index={1} />

      <HighlightSection index={2} />

      {slides.map((slide, index) => (
        <StorySection
          key={slide.id}
          label={slide.label}
          title={slide.title}
          subtitle={slide.subtitle}
          index={index + 3}
        />
      ))}

      <ChatDemo />

      <PortfolioSection index={7} />

      <ContactSection index={8} />
    </main>
  )
}
