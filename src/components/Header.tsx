import { Fish, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pearl/95 backdrop-blur-sm shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-ocean-medium flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Fish className="w-7 h-7 text-pearl" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-ocean-deep">Ocean's Best</h1>
              <p className="text-xs text-muted-foreground">Premium Seafood</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#freshest" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Fresh Catch
            </a>
            <a href="#collection" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Collection
            </a>
            <a href="#about" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-ocean-medium transition-colors font-medium">
              Contact
            </a>
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
              <a href="#freshest" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Fresh Catch
              </a>
              <a href="#collection" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Collection
              </a>
              <a href="#about" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-ocean-medium transition-colors font-medium py-2">
                Contact
              </a>
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
