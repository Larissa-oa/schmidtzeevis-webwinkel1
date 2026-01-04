const WebshopHero = () => {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Subtle wave pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            className="text-sea-light"
            d="M0,50 C360,80 720,20 1080,50 C1260,65 1380,45 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-gold text-sm font-medium mb-4">
            <span className="w-8 h-px bg-gold"></span>
            Koninklijke kwaliteit sinds 1916
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Webwinkel
          </h1>
          <p className="text-sea-light text-base md:text-lg max-w-lg">
            Elke dag meer dan 133 soorten verse vis, direct van de afslag naar uw deur.
          </p>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
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