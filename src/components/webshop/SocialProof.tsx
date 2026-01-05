import { Crown, ShieldCheck, Truck, Quote } from "lucide-react";

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
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-16">
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
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
            Wat onze klanten zeggen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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