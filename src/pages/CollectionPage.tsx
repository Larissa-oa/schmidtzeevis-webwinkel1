import { useParams, Link } from "react-router-dom";
import { ChevronRight, Grid3X3, List, ChevronDown, Search, Filter, Fish, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { collections, allProducts, type Product } from "@/data/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const priceRanges = [
  { label: "Alle prijzen", min: 0, max: Infinity },
  { label: "€0 - €25", min: 0, max: 25 },
  { label: "€25 - €50", min: 25, max: 50 },
  { label: "€50 - €100", min: 50, max: 100 },
  { label: "€100+", min: 100, max: Infinity },
];

const seasonalityOptions = [
  { value: "all", label: "Alle", icon: null },
  { value: "in-season", label: "In Seizoen", icon: Fish, color: "text-green-600" },
  { value: "available", label: "Beschikbaar", icon: Fish, color: "text-gold" },
  { value: "unavailable", label: "Niet Beschikbaar", icon: Waves, color: "text-muted-foreground/30" },
];

const ProductCard = ({ product }: { product: Product }) => (
  <Link
    to={`/webshop/product/${product.id}`}
    className="group bg-card"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
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
  const [selectedSeasonality, setSelectedSeasonality] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const collection = collections.find(c => c.slug === slug);
  const allCollectionProducts = allProducts.filter(p => p.category === slug);
  
  // Filter products
  const products = allCollectionProducts.filter(p => {
    const range = priceRanges[selectedPriceRange];
    const matchesPrice = p.price >= range.min && p.price < range.max;
    const matchesSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPrice && matchesSearch;
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
              {/* Sidebar - Hidden on mobile, shown on desktop. Mobile filter is in accordion below */}
              <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Price Filter */}
                  <div className="border-b border-border pb-6">
                    <h3 className="font-medium text-foreground text-sm tracking-wide mb-4">Prijs</h3>
                    <div className="space-y-2">
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
                  </div>

                  {/* Seasonality Filter */}
                  <div className="border-b border-border pb-6">
                    <h3 className="font-medium text-foreground text-sm tracking-wide mb-4">Seizoensgebonden</h3>
                    <div className="space-y-2">
                      {seasonalityOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => setSelectedSeasonality(option.value)}
                            className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors ${
                              selectedSeasonality === option.value 
                                ? 'bg-navy text-primary-foreground' 
                                : 'text-muted-foreground hover:bg-accent'
                            }`}
                          >
                            {IconComponent && (
                              <IconComponent className={`w-4 h-4 ${selectedSeasonality === option.value ? 'text-primary-foreground' : option.color}`} strokeWidth={1.5} />
                            )}
                            <span>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Product Navigation */}
                  <div>
                    <h3 className="font-medium text-foreground text-sm tracking-wide mb-4">Producten</h3>
                    <div className="space-y-1">
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
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 mb-6 pb-4 border-b border-border">
                  {/* Search Bar - Full width on mobile, max-width on desktop */}
                  <div className="relative w-full lg:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="zoeken op titel"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between gap-3">
                    {/* Mobile: Filter button + View buttons + Product count */}
                    <div className="lg:hidden flex items-center gap-2">
                      <div className="flex border border-border">
                        <button
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                          className={`p-2 transition-colors ${isFilterOpen ? "bg-navy text-primary-foreground" : "hover:bg-accent"}`}
                        >
                          <Filter className="w-4 h-4" />
                        </button>
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
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {products.length} {products.length === 1 ? 'product' : 'producten'}
                      </p>
                    </div>

                    {/* Desktop: View buttons + Product count */}
                    <div className="hidden lg:flex items-center gap-2">
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
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {products.length} {products.length === 1 ? 'product' : 'producten'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Filter Accordion - Shown when filter button is clicked */}
                {isFilterOpen && (
                  <div className="lg:hidden mb-6">
                    <Accordion type="single" collapsible defaultValue="filters" className="border border-border rounded-lg">
                      <AccordionItem value="filters" className="border-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <span className="font-medium text-sm">Filters</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-6 pt-2">
                            {/* Price Filter */}
                            <div>
                              <h3 className="font-medium text-foreground text-sm tracking-wide mb-3">Prijs</h3>
                              <div className="space-y-2">
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
                            </div>

                            {/* Seasonality Filter */}
                            <div>
                              <h3 className="font-medium text-foreground text-sm tracking-wide mb-3">Seizoensgebonden</h3>
                              <div className="space-y-2">
                                {seasonalityOptions.map((option) => {
                                  const IconComponent = option.icon;
                                  return (
                                    <button
                                      key={option.value}
                                      onClick={() => setSelectedSeasonality(option.value)}
                                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors ${
                                        selectedSeasonality === option.value 
                                          ? 'bg-navy text-primary-foreground' 
                                          : 'text-muted-foreground hover:bg-accent'
                                      }`}
                                    >
                                      {IconComponent && (
                                        <IconComponent className={`w-4 h-4 ${selectedSeasonality === option.value ? 'text-primary-foreground' : option.color}`} strokeWidth={1.5} />
                                      )}
                                      <span>{option.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}

                {/* Grid */}
                {products.length > 0 ? (
                  <>
                    <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                    
                    {/* Other Collections - Mobile only, at end of products */}
                    <div className="lg:hidden mt-12 pt-8 border-t border-border">
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
                  </>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      Geen producten gevonden met de huidige filters.
                    </p>
                    <Button 
                      variant="elegantOutline" 
                      onClick={() => {
                        setSelectedPriceRange(0);
                        setSearchQuery("");
                      }}
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
