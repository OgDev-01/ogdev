import HeroSection from "@/components/HeroSection/HeroSection";

export default async function Home() {
  return (
    <main className="w-full flex items-end ">
      <HeroSection />
    </main>
  );
}

export const runtime = "edge";
