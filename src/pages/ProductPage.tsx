import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Minus, Plus, ShoppingCart, Clock, Fish, Shell, Waves, X, BookOpen, Users, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { allProducts, featuredProducts, recipes, fishCalendar, type Product } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const product = allProducts.find(p => p.id === productId);
  
  // Mock multiple images
  const productImages = [product?.image, product?.image, product?.image].filter(Boolean);

  // Related products
  const relatedProducts = featuredProducts.filter(p => p.id !== productId).slice(0, 4);

  // Get product-specific fish availability (mock based on category)
  const productFishName = product?.name.split(' ')[0] || 'Vis';
  const productAvailability = fishCalendar.map((month, idx) => ({
    month: monthNames[idx],
    available: month.fish.some(f => 
      f.toLowerCase().includes(productFishName.toLowerCase()) || 
      productFishName.toLowerCase().includes(f.toLowerCase().slice(0, 4))
    ) || idx >= 2 && idx <= 9 // Default availability spring-autumn
  }));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <WebshopHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-semibold text-foreground mb-4">
            Product niet gevonden
          </h1>
          <Link to="/webshop" className="text-navy hover:underline">
            Terug naar webwinkel
          </Link>
        </main>
        <WebshopFooter />
      </div>
    );
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const currentPrice = product.variants?.[selectedVariant]?.price || product.price;
  const currentMonth = new Date().getMonth();

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
              <Link to={`/webshop/${product.category}`} className="text-muted-foreground hover:text-navy transition-colors capitalize">
                {product.category.replace('-', ' ')}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product details */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-3">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden border transition-colors ${
                        selectedImage === idx ? "border-navy" : "border-border hover:border-navy/50"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                {/* Main image */}
                <div className="flex-1 aspect-square overflow-hidden bg-muted">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Product info */}
              <div>
                {product.badge && (
                  <span className="inline-block px-3 py-1.5 bg-navy text-primary-foreground text-xs font-medium tracking-wide mb-4">
                    {product.badge}
                  </span>
                )}
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                  {product.name}
                </h1>

                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3 tracking-wide">
                      Kies optie
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(idx)}
                          className={`px-4 py-2.5 border text-sm font-medium transition-colors ${
                            selectedVariant === idx
                              ? "border-navy bg-navy text-primary-foreground"
                              : "border-border hover:border-navy"
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-3 tracking-wide">
                    Aantal
                  </label>
                  <div className="inline-flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center gap-6 mb-8">
                  <div>
                    {product.priceLabel && (
                      <span className="text-sm text-muted-foreground">{product.priceLabel} </span>
                    )}
                    <span className="text-3xl font-semibold text-navy">
                      €{currentPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button size="lg" variant="elegant" className="gap-2 flex-1 max-w-xs">
                    <ShoppingCart className="w-5 h-5" />
                    Toevoegen aan winkelwagen
                  </Button>
                </div>

                {/* Delivery info */}
                <div className="p-5 bg-cream border border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-navy" strokeWidth={1.5} />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Bezorging:</strong> Mogelijk vanaf €50,- | Afhalen altijd mogelijk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upsell slider */}
        <section className="py-12 bg-cream border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
                Vaak samen gekocht
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 border border-border hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 bg-navy text-primary-foreground hover:bg-navy-light transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            >
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/webshop/product/${p.id}`}
                  className="flex-shrink-0 w-64 bg-card group"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 border border-t-0 border-border">
                    <h3 className="font-serif font-semibold text-foreground mb-1 line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-navy">
                        €{p.price.toFixed(2).replace('.', ',')}
                      </span>
                      <Button size="sm" variant="elegantOutline">
                        Bekijk
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Fish Calendar - Visual Calendar Design */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
                  Seizoenskalender
                </span>
                <h2 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
                  Beschikbaarheid van {product.name}
                </h2>
              </div>
              
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {productAvailability.map((month, idx) => {
                  const isInSeason = month.available && (idx >= 4 && idx <= 8); // Peak season May-Sept
                  const isCurrentMonth = idx === currentMonth;
                  
                  return (
                    <div 
                      key={month.month}
                      className={`relative flex flex-col items-center p-4 transition-all duration-300 ${
                        isCurrentMonth
                          ? 'bg-navy text-primary-foreground ring-2 ring-gold ring-offset-2' 
                          : isInSeason
                            ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200' 
                            : month.available
                              ? 'bg-amber-50 hover:bg-amber-100 border border-amber-200' 
                              : 'bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className={`text-xs font-medium mb-2 ${
                        isCurrentMonth 
                          ? 'text-primary-foreground' 
                          : isInSeason
                            ? 'text-emerald-700'
                            : month.available
                              ? 'text-amber-700'
                              : 'text-slate-400'
                      }`}>
                        {month.month}
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {month.available ? (
                          <Fish className={`w-5 h-5 ${
                            isCurrentMonth 
                              ? 'text-gold' 
                              : isInSeason 
                                ? 'text-emerald-600' 
                                : 'text-amber-600'
                          }`} strokeWidth={1.5} />
                        ) : (
                          <Waves className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
                        )}
                      </div>
                      {isCurrentMonth && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded-sm" />
                  <span className="text-foreground font-medium">In Seizoen</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-amber-100 border border-amber-300 rounded-sm" />
                  <span className="text-foreground font-medium">Beschikbaar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-navy rounded-sm" />
                  <span className="text-foreground font-medium">Huidige Maand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-slate-100 border border-slate-200 rounded-sm" />
                  <span className="text-muted-foreground">Niet Beschikbaar</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipes - Elegant Card Design */}
        <section className="py-16 bg-gradient-to-b from-cream to-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
                Culinaire Inspiratie
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
                Recepten met dit product
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
                Ontdek hoe u dit product kunt bereiden met onze chef-recepten
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {recipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="group text-left relative overflow-hidden rounded-lg bg-card shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image with overlay */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                          <Timer className="w-3.5 h-3.5" />
                          <span>30 min</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs">
                          <Users className="w-3.5 h-3.5" />
                          <span>4 pers</span>
                        </div>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-primary-foreground mb-2 group-hover:text-gold transition-colors">
                        {recipe.name}
                      </h3>
                      <p className="text-primary-foreground/70 text-sm line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-gold/0 group-hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <BookOpen className="w-5 h-5 text-navy" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Modal */}
        <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
          <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card">
            {selectedRecipe && (
              <>
                {/* Recipe Header Image */}
                <div className="relative aspect-video">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                        <Timer className="w-4 h-4" />
                        <span>30 minuten</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-primary-foreground/80 text-sm">
                        <Users className="w-4 h-4" />
                        <span>4 personen</span>
                      </div>
                    </div>
                    <h2 className="font-serif text-3xl font-semibold text-primary-foreground">
                      {selectedRecipe.name}
                    </h2>
                  </div>
                </div>

                {/* Recipe Content */}
                <div className="p-8">
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {selectedRecipe.description}
                  </p>

                  {/* Mock recipe steps */}
                  <div className="mb-8">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Bereiding</h3>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
                        <span>Verwarm de oven voor op 180°C. Bereid alle ingrediënten voor.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
                        <span>Bereid de vis voor door deze schoon te maken en droog te deppen.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
                        <span>Breng op smaak met zeezout, peper en verse kruiden.</span>
                      </li>
                    </ol>
                  </div>

                  {/* Products used in recipe */}
                  <div className="border-t border-border pt-8">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                      Producten in dit recept
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Alle ingrediënten zijn verkrijgbaar in onze webwinkel
                    </p>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {selectedRecipe.products.map((productId) => {
                        const recipeProduct = allProducts.find(p => p.id === productId);
                        if (!recipeProduct) return null;
                        return (
                          <Link
                            key={productId}
                            to={`/webshop/product/${productId}`}
                            onClick={() => setSelectedRecipe(null)}
                            className="flex-shrink-0 w-40 group"
                          >
                            <div className="aspect-square overflow-hidden bg-muted rounded-lg mb-3">
                              <img
                                src={recipeProduct.image}
                                alt={recipeProduct.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="font-medium text-foreground text-sm group-hover:text-navy transition-colors line-clamp-1">
                              {recipeProduct.name}
                            </h4>
                            <p className="text-navy font-semibold text-sm">
                              €{recipeProduct.price.toFixed(2).replace('.', ',')}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <WebshopFooter />
    </div>
  );
};

export default ProductPage;