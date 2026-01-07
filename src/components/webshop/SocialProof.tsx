import { Crown, ShieldCheck, Truck, Quote } from "lucide-react";
import { useEffect } from "react";

const testimonials = [
  {
    id: 1,
    text: "De versheid van de vis is ongeëvenaard. Echt restaurant kwaliteit thuis.",
    author: "Maria de V.",
  },
  {
    id: 2,
    text: "Al jaren trouwe klant. De Ocean Paradise schotel is een feest voor elke gelegenheid.",
    author: "Peter K.",
  },
  {
    id: 3,
    text: "Snelle bezorging en prachtig verpakt. De oesters waren perfect.",
    author: "Anne B.",
  }
];

const trustBadges = [
  {
    icon: Crown,
    title: "Koninklijk",
    description: "Hofleverancier sinds 1916"
  },
  {
    icon: ShieldCheck,
    title: "BRCGS Gecertificeerd",
    description: "Hoogste voedselveiligheid"
  },
  {
    icon: Truck,
    title: "Verse Bezorging",
    description: "Gekoeld aan huis geleverd"
  }
];

const SocialProof = () => {
  useEffect(() => {
    // Load Trustpilot script if not already loaded
    if (!document.querySelector('script[src*="trustpilot.com"]')) {
      const script = document.createElement('script');
      script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="pt-8 pb-14 md:pt-10 md:pb-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-20 md:mb-24 max-w-4xl mx-auto">
          {trustBadges.map((badge) => (
            <div 
              key={badge.title}
              className="flex items-center gap-5 p-8 bg-background"
            >
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-7 h-7 text-gold-dark" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-medium text-foreground text-sm tracking-wide">{badge.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
            Klantbeoordelingen
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-6">
            Wat onze klanten zeggen
          </h2>
          
          {/* Trustpilot Widget */}
          <div className="flex justify-center">
            <div 
              className="trustpilot-widget scale-75 origin-center" 
              data-locale="en-US" 
              data-template-id="53aa8807dec7e10d38f59f32" 
              data-businessunit-id="62e8dfb8b92b34e1c629da7c" 
              data-style-height="150px" 
              data-style-width="100%" 
              data-token="40a6d903-d5e5-4d9c-9ae3-734c0f44eed4"
            >
              <a 
                href="https://www.trustpilot.com/review/eatsous.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="sr-only"
              >
                Trustpilot
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative p-8 bg-cream"
            >
              <Quote className="w-6 h-6 text-gold/40 mb-4" strokeWidth={1.5} />
              <p className="text-foreground text-sm leading-relaxed mb-6">
                {testimonial.text}
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;