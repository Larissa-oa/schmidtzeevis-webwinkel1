import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "./ui/button";

import salmonImg from "@/assets/salmon.jpg";
import seabassImg from "@/assets/seabass.jpg";
import snapperImg from "@/assets/snapper.jpg";
import tunaImg from "@/assets/tuna.jpg";

const freshCatches = [
  {
    id: 1,
    name: "Wild Atlantic Salmon",
    weight: "2-3 lbs",
    price: 45.99,
    rating: 4.9,
    image: salmonImg,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Mediterranean Sea Bass",
    weight: "1.5-2 lbs",
    price: 38.99,
    rating: 4.8,
    image: seabassImg,
    badge: "Fresh Today",
  },
  {
    id: 3,
    name: "Red Snapper",
    weight: "2-2.5 lbs",
    price: 52.99,
    rating: 4.9,
    image: snapperImg,
    badge: "Premium",
  },
  {
    id: 4,
    name: "Bluefin Tuna Steak",
    weight: "1 lb",
    price: 89.99,
    rating: 5.0,
    image: tunaImg,
    badge: "Chef's Choice",
  },
];

const FreshestCatch = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="freshest" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-seafoam/10 text-seafoam text-sm font-medium mb-4">
              Today's Selection
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Freshest Catch
            </h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Caught this morning, delivered today. Our top picks selected by expert fishmongers.
            </p>
          </div>
          
          <div className="flex gap-2 mt-6 md:mt-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-card border border-border hover:bg-muted transition-colors shadow-soft"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-ocean-medium text-pearl hover:bg-ocean-deep transition-colors shadow-soft"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {freshCatches.map((fish, index) => (
            <div
              key={fish.id}
              className="flex-shrink-0 w-80 bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={fish.image}
                  alt={fish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-coral text-pearl text-xs font-semibold">
                    {fish.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-coral text-coral" />
                  <span className="text-sm font-medium text-foreground">{fish.rating}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                  {fish.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{fish.weight}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-ocean-medium">
                    ${fish.price}
                  </span>
                  <Button variant="elegant" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreshestCatch;
