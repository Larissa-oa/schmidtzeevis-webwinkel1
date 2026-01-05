import { Fish, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import logoSz from "@/assets/logosz.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pearl/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoSz} alt="Schmidt Zeevis" className="h-8 w-auto" />
            <div>
              <h1 className="font-serif text-xl font-bold text-ocean-deep">Ocean's Best</h1>
              <p className="text-xs text-muted-foreground">Premium Seafood</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link to="/webshop" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Webwinkel
            </Link>
            <a href="#freshest" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Verse vangst
            </a>
            <Link to="/webshop/alle-producten" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Alle producten
            </Link>
            <Link to="/webshop/verse-vis" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Verse vis
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="elegant" size="sm" className="hidden sm:flex gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart (0)</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-ocean-deep"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/webshop" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Webwinkel
              </Link>
              <a href="#freshest" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Verse vangst
              </a>
              <Link to="/webshop/alle-producten" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Alle producten
              </Link>
              <Link to="/webshop/verse-vis" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Verse vis
              </Link>
              <Button variant="elegant" size="sm" className="w-full gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Cart (0)</span>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
