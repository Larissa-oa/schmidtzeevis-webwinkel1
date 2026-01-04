import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { collections, allProducts, type Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/webshop/product/${product.id}`}
    className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
  >
    <div className="aspect-square overflow-hidden bg-muted">
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
    <div className="p-4">
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
          <span className="text-lg font-bold text-navy">
            €{product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <Button size="sm" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-primary-foreground">
          Bekijk
        </Button>
      </div>
    </div>
  </Link>
);

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const collection = collections.find(c => c.slug === slug);
  const products = allProducts.filter(p => p.category === slug);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <WebshopHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
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
        <div className="bg-cream border-b border-border">
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
        <section className="bg-cream py-10">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {collection.name}
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              {collection.description}
            </p>
          </div>
        </section>

        {/* Products grid */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {products.length} producten
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filteren
                </Button>
                <div className="flex border border-border rounded-md">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-accent" : ""}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-accent" : ""}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"}`}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Momenteel geen producten in deze collectie.
                </p>
                <Link to="/webshop" className="text-navy hover:underline">
                  Bekijk alle producten
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <WebshopFooter />
    </div>
  );
};

export default CollectionPage;