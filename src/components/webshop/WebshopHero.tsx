const WebshopHero = () => {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Wave pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <svg className="absolute bottom-0 w-full h-40" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            className="text-gold-light"
            d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,40 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-14 md:py-20 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 text-gold/90 text-sm font-medium mb-5 tracking-wide">
            <span className="w-10 h-px bg-gold/60"></span>
            Koninklijke kwaliteit sinds 1916
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-primary-foreground mb-5 tracking-tight">
            Webwinkel
          </h1>
          <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg leading-relaxed">
            Elke dag meer dan 133 soorten verse vis, direct van de afslag naar uw deur.
          </p>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14">
          <path 
            fill="hsl(var(--background))" 
            d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default WebshopHero;