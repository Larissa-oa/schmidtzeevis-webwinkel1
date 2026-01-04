import { Star, Award, Truck, Shield } from "lucide-react";

const testimonials = [
  {
    id: 1,
    text: "De versheid van de vis is ongeëvenaard. Echt restaurant kwaliteit thuis.",
    author: "Maria de V.",
    rating: 5
  },
  {
    id: 2,
    text: "Al jaren trouwe klant. De Ocean Paradise schotel is een feest voor elke gelegenheid.",
    author: "Peter K.",
    rating: 5
  },
  {
    id: 3,
    text: "Snelle bezorging en prachtig verpakt. De oesters waren perfect.",
    author: "Anne B.",
    rating: 5
  }
];

const trustBadges = [
  {
    icon: Award,
    title: "Koninklijk",
    description: "Hofleverancier sinds 1916"
  },
  {
    icon: Shield,
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
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {trustBadges.map((badge) => (
            <div 
              key={badge.title}
              className="flex items-center gap-4 p-5 bg-card rounded-lg border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-6 h-6 text-navy" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
            Wat onze klanten zeggen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-card p-6 rounded-lg border border-border"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;