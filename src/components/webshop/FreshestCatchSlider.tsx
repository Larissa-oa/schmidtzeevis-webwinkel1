import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <span className="inline-block text-gold text-sm font-medium mb-2 tracking-wide uppercase">
              Vandaag Vers
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Freshest Catch
            </h2>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              Geselecteerd door onze visexperts, elke dag vers van de afslag.
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full bg-navy text-primary-foreground hover:bg-navy-light transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        >
          {featuredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/webshop/product/${product.id}`}
              className="flex-shrink-0 w-72 bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-gold text-navy text-xs font-semibold">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="text-xs font-medium text-foreground">{product.rating}</span>
                  </div>
                )}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1 group-hover:text-navy transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.shortDescription || product.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.priceLabel && (
                      <span className="text-xs text-muted-foreground">{product.priceLabel} </span>
                    )}
                    <span className="text-xl font-bold text-navy">
                      €{product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button size="sm" className="bg-navy hover:bg-navy-light text-primary-foreground">
                    Bekijk
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshestCatchSlider;