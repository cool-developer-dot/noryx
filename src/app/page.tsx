import Cta from "@/components/Cta";
import Experience from "@/components/Experience";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Problem from "@/components/Problem";
import Stack from "@/components/Stack";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <Experience />
      <Stack />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
