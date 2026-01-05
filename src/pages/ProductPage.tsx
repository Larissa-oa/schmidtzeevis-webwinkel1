import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Minus, Plus, ShoppingCart, Clock, Fish, Shell, Waves, X, BookOpen, Users, Timer, Truck, Package, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import WebshopHeader from "@/components/webshop/WebshopHeader";
import WebshopFooter from "@/components/webshop/WebshopFooter";
import { allProducts, featuredProducts, recipes, fishCalendar, type Product } from "@/data/products";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import vismesImg from "@/assets/webshop/vismes.png";
import kreeft1Img from "@/assets/webshop/kreeft1.jpg";
import kreeft2Img from "@/assets/webshop/kreeft2.jpg";

const monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [addOnQuantity, setAddOnQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const product = allProducts.find(p => p.id === productId);
  
  // Mock add-on product (fish knife) - used across all products
  const addOnProduct = {
    id: "vis-mes",
    name: "Vis Mes",
    price: 24.95,
    image: vismesImg
  };
  
  // Product images - use kreeft images for canadese-kreeft, otherwise repeat main image
  const productImages = productId === "canadese-kreeft" 
    ? [product?.image, kreeft1Img, kreeft2Img].filter(Boolean)
    : [product?.image, product?.image, product?.image].filter(Boolean);

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

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {product.description}
                </p>
                {product.weight && (
                  <p className="text-muted-foreground mb-8 text-sm">
                    Gewicht per stuk: {product.weight} gram (levend gewicht)
                  </p>
                )}
                {!product.weight && <div className="mb-8"></div>}

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
                          className={`px-4 py-2.5 border text-sm font-medium transition-all ${
                            selectedVariant === idx
                              ? "border-2 border-navy"
                              : "border border-border hover:border-navy/50"
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity, Price & CTA */}
                <div className="mb-6">
                  {/* Mobile: Quantity and Price on same row, Button full width below */}
                  <div className="lg:hidden space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2 tracking-wide">
                          Aantal
                        </label>
                        <div className="inline-flex items-center border border-border">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2.5 hover:bg-accent transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2.5 hover:bg-accent transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        {product.priceLabel && (
                          <span className="text-xs text-muted-foreground block">{product.priceLabel}</span>
                        )}
                        <span className="text-2xl font-semibold text-navy">
                          €{currentPrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                    <Button size="lg" variant="elegant" className="w-full gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Toevoegen aan winkelwagen
                    </Button>
                  </div>

                  {/* Desktop: Original layout */}
                  <div className="hidden lg:block">
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
                  </div>
                </div>

                {/* Add-on Section */}
                <div className="mb-8 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-2 mb-4">
                    <h4 className="text-sm font-medium text-foreground">Add-on</h4>
                  </div>
                  <div className="flex items-start gap-4">
                    {/* Add-on Image */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={addOnProduct.image}
                        alt={addOnProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Add-on Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground mb-4">{addOnProduct.name}</p>
                      <div className="flex items-center gap-3">
                        {/* Quantity */}
                        <div className="inline-flex items-center border border-border bg-background">
                          <button
                            onClick={() => setAddOnQuantity(Math.max(1, addOnQuantity - 1))}
                            className="p-2 hover:bg-accent transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{addOnQuantity}</span>
                          <button
                            onClick={() => setAddOnQuantity(addOnQuantity + 1)}
                            className="p-2 hover:bg-accent transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        {/* Add to cart button */}
                        <Button size="sm" variant="outline" className="px-4">
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                        
                        {/* Price */}
                        <span className="text-sm font-semibold text-navy ml-auto">
                          €{addOnProduct.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Allergens & Delivery info */}
                <div className="border border-border bg-card">
                  {/* Allergens & Nutritional Info Accordion */}
                  <div className="p-4 border-b border-border">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="nutritional-info" className="border-0">
                        <AccordionTrigger className="px-0 py-2 hover:no-underline">
                          <div className="flex items-center gap-2.5">
                            <AlertCircle className="w-4 h-4 text-navy" strokeWidth={1.5} />
                            <span className="font-medium text-foreground text-xs tracking-wide">Allergenen & Voedingswaarde</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-0 pb-2 pt-3">
                          <div className="space-y-5">
                            {/* Allergens */}
                            <div>
                              <h3 className="font-semibold text-foreground text-xs mb-2 tracking-wide">Allergenen</h3>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Dit product kan sporen bevatten van schaaldieren, vis en weekdieren.
                              </p>
                            </div>
                            
                            <div className="h-px bg-border"></div>
                            
                            {/* Nutritional Info */}
                            <div>
                              <h3 className="font-semibold text-foreground text-xs mb-3 tracking-wide">Voedingswaarde per 100 gram</h3>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">Energie</span>
                                  <span className="font-medium text-foreground">520 kJ / 124 kcal</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">Vetten</span>
                                  <span className="font-medium text-foreground">2,5 g</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">waarvan verzadigd</span>
                                  <span className="font-medium text-foreground">0,5 g</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">Koolhydraten</span>
                                  <span className="font-medium text-foreground">0 g</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">Eiwitten</span>
                                  <span className="font-medium text-foreground">24 g</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                  <span className="text-muted-foreground">Zout</span>
                                  <span className="font-medium text-foreground">0,8 g</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* Delivery info */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-navy" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <h3 className="font-semibold text-foreground text-sm tracking-wide">Bezorging</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                            <span>Gratis vanaf €50,- | Dinsdag, woensdag, donderdag</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-px bg-border"></div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center">
                        <Package className="w-5 h-5 text-navy" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <h3 className="font-semibold text-foreground text-sm tracking-wide">Afhalen</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                            <span>Altijd mogelijk | Ma-Vr 09:00-18:00, Rotterdam</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fish Calendar - Visual Calendar Design */}
        <section className="py-12 bg-cream border-y border-border">
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
              
              <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                {productAvailability.map((month, idx) => {
                  const isInSeason = month.available && (idx >= 4 && idx <= 8); // Peak season May-Sept
                  const isCurrentMonth = idx === currentMonth;
                  
                  return (
                    <div 
                      key={month.month}
                      className={`relative flex flex-col items-center justify-center p-4 transition-all duration-200 rounded-sm border ${
                        isCurrentMonth
                          ? 'border-2 border-foreground/50' 
                          : 'border-border/60'
                      } bg-muted/20`}
                    >
                      <span className={`text-xs font-medium mb-2.5 ${
                        month.available
                          ? 'text-foreground'
                          : 'text-muted-foreground'
                      }`}>
                        {month.month}
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center">
                        {month.available ? (
                          <Fish className={`w-5 h-5 ${
                            isInSeason 
                              ? 'text-green-600' 
                              : 'text-gold'
                          }`} strokeWidth={1.5} />
                        ) : (
                          <Waves className="w-5 h-5 text-muted-foreground/30" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-8 mt-10 text-sm">
                <div className="flex items-center gap-3">
                  <Fish className="w-4 h-4 text-green-600" strokeWidth={1.5} />
                  <span className="text-foreground font-medium">In Seizoen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Fish className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <span className="text-foreground font-medium">Beschikbaar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Waves className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />
                  <span className="text-muted-foreground">Niet Beschikbaar</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upsell slider */}
        <section className="py-12 bg-background">
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

        {/* Recipes - Modern Accordion Design */}
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
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full space-y-6">
                  {recipes
                    .filter((recipe) => recipe.products.includes(productId))
                    .map((recipe, index) => {
                      // Get upsell products (exclude current product)
                      const upsellProducts = recipe.products
                        .filter(productIdInRecipe => productIdInRecipe !== productId)
                        .map(productIdInRecipe => allProducts.find(p => p.id === productIdInRecipe))
                        .filter((p): p is Product => p !== undefined);
                      
                      return (
                        <AccordionItem key={recipe.id} value={recipe.id} className="border border-border/60 rounded-lg bg-card overflow-hidden">
                          <AccordionTrigger className="px-6 py-5 hover:no-underline group">
                            <div className="flex items-start gap-5 w-full text-left">
                              {/* Recipe Image */}
                              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted">
                                <img
                                  src={recipe.image}
                                  alt={recipe.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* Recipe Info */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-serif text-lg md:text-xl font-semibold text-foreground mb-1.5 group-hover:text-navy transition-colors">
                                  {recipe.name}
                                </h3>
                                <p className="text-muted-foreground text-xs md:text-sm mb-2.5 line-clamp-2">
                                  {recipe.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1.5">
                                    <Timer className="w-3.5 h-3.5" />
                                    <span>30 min</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>4 pers</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent className="px-6 pb-6">
                            <div className="pt-4 border-t border-border/60">
                              {/* Recipe Description */}
                              <div className="mb-6">
                                <p className="text-foreground text-sm leading-relaxed mb-5">
                                  {recipe.description}
                                </p>
                                
                                {/* Ingredients */}
                                <div className="mb-6">
                                  <h4 className="font-serif text-base font-semibold text-foreground mb-3">Ingrediënten</h4>
                                  <ul className="space-y-2">
                                    {product && (
                                      <li className="flex items-center gap-2 text-foreground text-xs md:text-sm font-medium">
                                        <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                        <span>{product.name}</span>
                                      </li>
                                    )}
                                    {upsellProducts.map((upsellProduct) => (
                                      <li key={upsellProduct.id} className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                        <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                        <span>{upsellProduct.name}</span>
                                      </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                      <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                      <span>Olijfolie</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                      <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                      <span>Zeezout en peper</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                      <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                      <span>Verse kruiden (dille, peterselie)</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
                                      <span className="w-1.5 h-1.5 bg-navy rounded-full flex-shrink-0"></span>
                                      <span>Citroen</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                {/* Recipe Steps */}
                                <div>
                                  <h4 className="font-serif text-base font-semibold text-foreground mb-3">Bereiding</h4>
                                  <ol className="space-y-3">
                                    <li className="flex gap-3">
                                      <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
                                      <span className="text-muted-foreground text-xs md:text-sm pt-0.5">Verwarm de oven voor op 180°C. Bereid alle ingrediënten voor.</span>
                                    </li>
                                    <li className="flex gap-3">
                                      <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
                                      <span className="text-muted-foreground text-xs md:text-sm pt-0.5">Bereid de vis voor door deze schoon te maken en droog te deppen.</span>
                                    </li>
                                    <li className="flex gap-3">
                                      <span className="flex-shrink-0 w-6 h-6 bg-navy text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
                                      <span className="text-muted-foreground text-xs md:text-sm pt-0.5">Breng op smaak met zeezout, peper en verse kruiden. Bak of grill tot de vis gaar is.</span>
                                    </li>
                                  </ol>
                                </div>
                              </div>
                              
                              {/* Upsell Products */}
                              {upsellProducts.length > 0 && (
                                <div className="pt-5 border-t border-border/40">
                                  <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">
                                    Andere producten voor dit recept
                                  </p>
                                  <div className="flex flex-wrap gap-3">
                                    {upsellProducts.map((product) => (
                                      <Link
                                        key={product.id}
                                        to={`/webshop/product/${product.id}`}
                                        className="group flex flex-col w-28 flex-shrink-0"
                                      >
                                        <div className="aspect-square overflow-hidden bg-muted rounded-lg mb-2">
                                          <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                          />
                                        </div>
                                        <h5 className="font-medium text-foreground text-xs group-hover:text-navy transition-colors line-clamp-2 mb-1">
                                          {product.name}
                                        </h5>
                                        <p className="text-navy font-semibold text-xs">
                                          <span className="text-muted-foreground font-normal">vanaf </span>
                                          €{product.price.toFixed(2).replace('.', ',')}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                </Accordion>
            </div>
          </div>
        </section>

      </main>
      <WebshopFooter />
    </div>
  );
};

export default ProductPage;