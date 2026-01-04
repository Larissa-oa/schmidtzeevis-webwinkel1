import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Minus, Plus, ShoppingCart, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { allProducts, featuredProducts, recipes, fishCalendar, type Product } from "@/data/products";

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

  // Current month for fish calendar
  const currentMonth = fishCalendar[new Date().getMonth()];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <WebshopHeader />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Images */}
              <div className="flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col gap-3">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? "border-navy" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                {/* Main image */}
                <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-muted">
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
                  <span className="inline-block px-3 py-1 rounded-full bg-gold text-navy text-sm font-semibold mb-4">
                    {product.badge}
                  </span>
                )}
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) ? "fill-gold text-gold" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>
                )}

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Variants */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Kies optie
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(idx)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
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
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Aantal
                  </label>
                  <div className="inline-flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-accent transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
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
                    <span className="text-3xl font-bold text-navy">
                      €{currentPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button size="lg" className="bg-navy hover:bg-navy-light text-primary-foreground gap-2 flex-1 max-w-xs">
                    <ShoppingCart className="w-5 h-5" />
                    Toevoegen aan winkelwagen
                  </Button>
                </div>

                {/* Delivery info */}
                <div className="p-4 bg-cream rounded-lg border border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-navy" />
                    <span>
                      <strong>Bezorging:</strong> Mogelijk vanaf €50,- | Afhalen altijd mogelijk
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upsell slider */}
        <section className="py-10 bg-cream">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Vaak samen gekocht
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 rounded-full border border-border hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 rounded-full bg-navy text-primary-foreground hover:bg-navy-light transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            >
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/webshop/product/${p.id}`}
                  className="flex-shrink-0 w-64 bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all group"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-foreground mb-1 line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy">
                        €{p.price.toFixed(2).replace('.', ',')}
                      </span>
                      <Button size="sm" variant="outline" className="border-navy text-navy hover:bg-navy hover:text-primary-foreground">
                        Bekijk
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Fish Calendar */}
        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Viskalender - {currentMonth.month}
            </h2>
            <div className="bg-card p-6 rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">
                Deze vissoorten zijn nu op hun best:
              </p>
              <div className="flex flex-wrap gap-2">
                {currentMonth.fish.map((fish) => (
                  <span
                    key={fish}
                    className="px-4 py-2 bg-navy/10 text-navy rounded-full text-sm font-medium"
                  >
                    {fish}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recipes */}
        <section className="py-10 bg-cream">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Recepten met dit product
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {recipe.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {recipe.description}
                    </p>
                    <Button variant="outline" size="sm" className="w-full border-navy text-navy hover:bg-navy hover:text-primary-foreground">
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