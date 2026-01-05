import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { collections, allProducts, type Product } from "@/data/products";

const priceRanges = [
  { label: "Alle prijzen", min: 0, max: Infinity },
  { label: "€0 - €25", min: 0, max: 25 },
  { label: "€25 - €50", min: 25, max: 50 },
  { label: "€50 - €100", min: 50, max: 100 },
  { label: "€100+", min: 100, max: Infinity },
];

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/webshop/product/${product.id}`}
    className="group bg-card"
  >
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
    <div className="p-4 border border-t-0 border-border">
      <h3 className="font-serif text-base font-semibold text-foreground mb-1 group-hover:text-navy transition-colors line-clamp-1">
        {product.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
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
);

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [expandedFilters, setExpandedFilters] = useState({ price: true, products: true });
  
  const collection = collections.find(c => c.slug === slug);
  const allCollectionProducts = allProducts.filter(p => p.category === slug);
  
  // Filter products
  const products = allCollectionProducts.filter(p => {
    const range = priceRanges[selectedPriceRange];
    return p.price >= range.min && p.price < range.max;
  });

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <WebshopHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-4">
            Collectie niet gevonden
          </h1>
          <Link to="/webshop" className="text-navy hover:underline">
            Terug naar webwinkel
          </Link>
        </main>
        <WebshopFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WebshopHeader />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/webshop" className="text-muted-foreground hover:text-navy transition-colors">
                Webwinkel
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{collection.name}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="bg-cream border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl">
              <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
                Collectie
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-3 tracking-tight">
                {collection.name}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products with sidebar */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Price Filter */}
                  <div className="border-b border-border pb-6">
                    <button 
                      onClick={() => setExpandedFilters(f => ({ ...f, price: !f.price }))}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h3 className="font-medium text-foreground text-sm tracking-wide">Prijs</h3>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.price && (
                      <div className="mt-4 space-y-2">
                        {priceRanges.map((range, idx) => (
                          <button
                            key={range.label}
                            onClick={() => setSelectedPriceRange(idx)}
                            className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                              selectedPriceRange === idx 
                                ? 'bg-navy text-primary-foreground' 
                                : 'text-muted-foreground hover:bg-accent'
                            }`}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Product Navigation */}
                  <div>
                    <button 
                      onClick={() => setExpandedFilters(f => ({ ...f, products: !f.products }))}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <h3 className="font-medium text-foreground text-sm tracking-wide">Producten</h3>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedFilters.products ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.products && (
                      <div className="mt-4 space-y-1">
                        {allCollectionProducts.map((product) => (
                          <Link
                            key={product.id}
                            to={`/webshop/product/${product.id}`}
                            className="block px-3 py-2 text-sm text-muted-foreground hover:text-navy hover:bg-accent transition-colors truncate"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Other Collections */}
                  <div className="pt-6 border-t border-border">
                    <h3 className="font-medium text-foreground text-sm tracking-wide mb-4">Andere Collecties</h3>
                    <div className="space-y-1">
                      {collections.filter(c => c.slug !== slug).slice(0, 5).map((c) => (
                        <Link
                          key={c.id}
                          to={`/webshop/${c.slug}`}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-navy hover:bg-accent transition-colors"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">
                    {products.length} {products.length === 1 ? 'product' : 'producten'}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex border border-border">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 transition-colors ${viewMode === "grid" ? "bg-navy text-primary-foreground" : "hover:bg-accent"}`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 transition-colors ${viewMode === "list" ? "bg-navy text-primary-foreground" : "hover:bg-accent"}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid */}
                {products.length > 0 ? (
                  <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      Geen producten gevonden met de huidige filters.
                    </p>
                    <Button 
                      variant="elegantOutline" 
                      onClick={() => setSelectedPriceRange(0)}
                    >
                      Filters wissen
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <WebshopFooter />
    </div>
  );
};

export default CollectionPage;
