import { Button } from "./ui/button";
import { Waves, Anchor } from "lucide-react";
import heroImage from "@/assets/hero-fish.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-medium/70 to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 opacity-20 animate-float">
        <Waves className="w-20 h-20 text-pearl" />
      </div>
      <div className="absolute bottom-32 right-10 opacity-20 animate-float" style={{ animationDelay: "1s" }}>
        <Anchor className="w-16 h-16 text-pearl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 rounded-full bg-seafoam/20 text-pearl text-sm font-medium mb-6 animate-fade-in">
            🐟 Fresh from the Ocean Daily
          </span>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-pearl leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            The Finest <br />
            <span className="text-seafoam">Seafood</span> <br />
            Delivered Fresh
          </h1>
          
          <p className="text-lg md:text-xl text-pearl/90 mb-10 max-w-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
            From ocean to table in 24 hours. Experience the difference of truly fresh, sustainably sourced seafood.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="gold" size="xl">
              Shop Fresh Catch
            </Button>
            <Button variant="elegantOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-navy">
              Our Story
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-8 mt-12 pt-8 border-t border-pearl/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-pearl">
              <div className="text-3xl font-bold font-serif">24h</div>
              <div className="text-sm text-pearl/70">Ocean to Door</div>
            </div>
            <div className="text-pearl">
              <div className="text-3xl font-bold font-serif">100%</div>
              <div className="text-sm text-pearl/70">Sustainable</div>
            </div>
            <div className="text-pearl">
              <div className="text-3xl font-bold font-serif">5★</div>
              <div className="text-sm text-pearl/70">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(42, 33%, 97%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
