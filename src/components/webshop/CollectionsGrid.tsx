import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { collections } from "@/data/products";

const CollectionsGrid = () => {
  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-gold-dark text-sm font-medium mb-2 tracking-wide uppercase">
            Ontdek ons assortiment
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Collecties
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.slice(0, 8).map((collection, index) => (
            <Link
              key={collection.id}
              to={`/webshop/${collection.slug}`}
              className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="font-serif text-lg font-bold text-primary-foreground mb-1">
                  {collection.name}
                </h3>
                <p className="text-sea-light text-sm mb-3 line-clamp-2 opacity-90">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold font-medium">
                    {collection.productCount} producten
                  </span>
                  <span className="flex items-center gap-1 text-primary-foreground text-sm font-medium group-hover:gap-2 transition-all">
                    Bekijk
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link 
            to="/webshop/alle-producten" 
            className="inline-flex items-center gap-2 text-navy font-medium hover:gap-3 transition-all"
          >
            Bekijk alle categorieën
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionsGrid;