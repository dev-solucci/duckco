import { ScrollRewards } from "@/components/game/ScrollRewards";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { FeaturedDrop } from "@/components/sections/FeaturedDrop";
import { ClubSection } from "@/components/sections/ClubSection";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { Manifesto } from "@/components/sections/Manifesto";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <ScrollRewards />
      <Nav />
      <main>
        <Hero />
        <FeaturedDrop />
        <ClubSection />
        <CollectionSection />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
