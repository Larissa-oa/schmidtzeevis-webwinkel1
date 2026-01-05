import { useState } from "react";
import { Star, Filter } from "lucide-react";
import { Button } from "./ui/button";

import salmonImg from "@/assets/salmon.jpg";
import seabassImg from "@/assets/seabass.jpg";
import snapperImg from "@/assets/snapper.jpg";
import tunaImg from "@/assets/tuna.jpg";
import mackerelImg from "@/assets/mackerel.jpg";
import lobsterImg from "@/assets/lobster.jpg";
import shrimpImg from "@/assets/shrimp.jpg";
import codImg from "@/assets/cod.jpg";

const categories = ["All", "Fish", "Shellfish", "Premium", "Fillets"];

const products = [
  {
    id: 1,
    name: "Wild Atlantic Salmon",
    category: "Fish",
    weight: "2-3 lbs",
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.9,
    reviews: 128,
    image: salmonImg,
    inStock: true,
  },
  {
    id: 2,
    name: "Mediterranean Sea Bass",
    category: "Fish",
    weight: "1.5-2 lbs",
    price: 38.99,
    rating: 4.8,
    reviews: 89,
    image: seabassImg,
    inStock: true,
  },
  {
    id: 3,
    name: "Red Snapper",
    category: "Premium",
    weight: "2-2.5 lbs",
    price: 52.99,
    rating: 4.9,
    reviews: 64,
    image: snapperImg,
    inStock: true,
  },
  {
    id: 4,
    name: "Bluefin Tuna Steak",
    category: "Premium",
    weight: "1 lb",
    price: 89.99,
    rating: 5.0,
    reviews: 156,
    image: tunaImg,
    inStock: true,
  },
  {
    id: 5,
    name: "Fresh Mackerel",
    category: "Fish",
    weight: "1-1.5 lbs",
    price: 22.99,
    rating: 4.7,
    reviews: 45,
    image: mackerelImg,
    inStock: true,
  },
  {
    id: 6,
    name: "Maine Lobster",
    category: "Shellfish",
    weight: "1.5 lbs",
    price: 75.99,
    rating: 4.9,
    reviews: 203,
    image: lobsterImg,
    inStock: false,
  },
  {
    id: 7,
    name: "Jumbo Shrimp",
    category: "Shellfish",
    weight: "1 lb (16-20 count)",
    price: 28.99,
    rating: 4.8,
    reviews: 178,
    image: shrimpImg,
    inStock: true,
  },
  {
    id: 8,
    name: "Atlantic Cod Fillet",
    category: "Fillets",
    weight: "1 lb",
    price: 32.99,
    rating: 4.7,
    reviews: 92,
    image: codImg,
    inStock: true,
  },
];

const ProductCollection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="collection" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-ocean-medium/10 text-ocean-medium text-sm font-medium mb-4">
            Our Products
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Seafood Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our full range of premium seafood. Every item is sourced responsibly and delivered at peak freshness.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-ocean-medium text-pearl shadow-soft"
                  : "bg-card text-foreground hover:bg-ocean-medium/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
                    <span className="px-4 py-2 bg-card rounded-full text-foreground font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                {product.originalPrice && product.inStock && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-coral text-pearl text-xs font-semibold">
                      Sale
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-coral text-coral" />
                    <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>
                
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{product.weight}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-ocean-medium">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="elegant" 
                    size="sm"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add" : "Notify"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-ocean-medium text-ocean-medium hover:bg-ocean-medium hover:text-pearl">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCollection;
