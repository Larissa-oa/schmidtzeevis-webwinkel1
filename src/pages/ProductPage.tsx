import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Minus, Plus, ShoppingCart, Clock, Fish, Shell, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { allProducts, featuredProducts, recipes, fishCalendar, type Product } from "@/data/products";

const monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
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
                {productAvailability.map((month, idx) => (
                  <div 
                    key={month.month}
                    className={`relative flex flex-col items-center p-4 transition-colors ${
                      month.available 
                        ? idx === currentMonth 
                          ? 'bg-navy text-primary-foreground' 
                          : 'bg-cream hover:bg-cream-dark' 
                        : 'bg-muted/50'
                    }`}
                  >
                    <span className={`text-xs font-medium mb-2 ${
                      month.available 
                        ? idx === currentMonth ? 'text-primary-foreground' : 'text-muted-foreground' 
                        : 'text-muted-foreground/50'
                    }`}>
                      {month.month}
                    </span>
                    <div className={`w-8 h-8 flex items-center justify-center ${
                      month.available ? '' : 'opacity-30'
                    }`}>
                      {month.available ? (
                        <Fish className={`w-5 h-5 ${idx === currentMonth ? 'text-gold-light' : 'text-navy'}`} strokeWidth={1.5} />
                      ) : (
                        <Waves className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                      )}
                    </div>
                    {idx === currentMonth && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-cream border border-border" />
                  <span className="text-muted-foreground">Beschikbaar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-navy" />
                  <span className="text-muted-foreground">Huidige maand</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted/50" />
                  <span className="text-muted-foreground">Niet in seizoen</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section className="py-12 bg-cream border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-block text-gold-dark text-xs font-medium mb-3 tracking-[0.2em] uppercase">
                Inspiratie
              </span>
              <h2 className="font-serif text-2xl font-semibold text-foreground tracking-tight">
                Recepten met dit product
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-card group"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 border border-t-0 border-border">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {recipe.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                      {recipe.description}
                    </p>
                    <Button variant="elegantOutline" size="sm" className="w-full">
                      Bekijk recept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <WebshopFooter />
    </div>
  );
};

export default ProductPage;