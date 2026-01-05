import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { featuredProducts } from "@/data/products";

const FreshestCatchSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-14 md:py-20 bg-background border-t-0">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
              Vandaag Vers
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Verse Vangst
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">
              Geselecteerd door onze visexperts, elke dag vers van de afslag.
            </p>
          </div>
          
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 bg-navy text-primary-foreground hover:bg-navy-light transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        >
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/webshop/product/${product.id}`}
              className="flex-shrink-0 w-72 bg-card group"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1.5 bg-navy text-primary-foreground text-xs font-medium tracking-wide">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 border border-t-0 border-border">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-navy transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-1">
                  {product.shortDescription || product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.priceLabel && (
                      <span className="text-xs text-muted-foreground">{product.priceLabel} </span>
                    )}
                    <span className="text-lg font-semibold text-navy">
                      €{product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button size="sm" variant="elegantOutline">
                    Bekijk
                  </Button>
                </div>
              </div>
            </Link>
          ))}
          
          {/* See all products card */}
          <Link
            to="/webshop/alle-producten"
            className="flex-shrink-0 w-72 bg-navy group flex flex-col items-center justify-center aspect-square relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-90" />
            <div className="relative z-10 text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 border-2 border-gold/30 rounded-full flex items-center justify-center">
                <ChevronRight className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2">
                Alle Producten
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Bekijk ons complete assortiment
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FreshestCatchSlider;