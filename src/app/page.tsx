import Band from "@/components/Band";
import Closing from "@/components/Closing";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Integrations from "@/components/Integrations";
import Principles from "@/components/Principles";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Integrations />
      <Features />
      <Band />
      <Steps />
      <Principles />
      <Faq />
      <Closing />
    </main>
  );
}
