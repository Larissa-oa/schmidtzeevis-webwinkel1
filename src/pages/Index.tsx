import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FreshestCatch from "@/components/FreshestCatch";
import ProductCollection from "@/components/ProductCollection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FreshestCatch />
        <ProductCollection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
