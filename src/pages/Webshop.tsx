import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopHero from "@/components/webshop/WebshopHero";
import FreshestCatchSlider from "@/components/webshop/FreshestCatchSlider";
import CollectionsGrid from "@/components/webshop/CollectionsGrid";
import SocialProof from "@/components/webshop/SocialProof";
import WebshopFooter from "@/components/webshop/WebshopFooter";

const Webshop = () => {
  return (
    <div className="min-h-screen bg-background">
      <WebshopHeader />
      <main>
        <WebshopHero />
        <FreshestCatchSlider />
        <CollectionsGrid />
        <SocialProof />
      </main>
      <WebshopFooter />
    </div>
  );
};

export default Webshop;