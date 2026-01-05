import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { collections } from "@/data/products";
import { Button } from "@/components/ui/button";

const CollectionsGrid = () => {
  return (
    <section className="pt-8 pb-14 md:pt-10 md:pb-20 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
            Ontdek ons assortiment
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
            Collecties
          </h2>
        </div>

        {/* Grid - Show all collections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/webshop/${collection.slug}`}
              className="group relative aspect-[16/10] sm:aspect-[5/3] overflow-hidden bg-card"
            >
              {/* Image */}
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-foreground mb-4 tracking-tight">
                  {collection.name}
                </h3>
                <div className="flex items-center gap-2 text-primary-foreground/90 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Bekijk collectie</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Subtle border on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;