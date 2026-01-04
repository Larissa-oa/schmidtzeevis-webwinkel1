import { Search, ShoppingCart, User, Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const WebshopHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-navy text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>010 – 214 06 73</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Bezorging vanaf €50,-</span>
            <span className="text-gold">Koninklijk sinds 1916</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/webshop" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold text-navy">Schmidt Zeevis</span>
              <span className="text-[10px] md:text-xs text-muted-foreground tracking-wider uppercase">Rotterdam</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/webshop" className="text-foreground hover:text-navy transition-colors font-medium text-sm">
              Webwinkel
            </Link>
            <Link to="/webshop/verse-vis" className="text-foreground hover:text-navy transition-colors font-medium text-sm">
              Verse Vis
            </Link>
            <Link to="/webshop/schotels" className="text-foreground hover:text-navy transition-colors font-medium text-sm">
              Schotels
            </Link>
            <Link to="/webshop/schaal-schelpdieren" className="text-foreground hover:text-navy transition-colors font-medium text-sm">
              Zeevruchten
            </Link>
            <Link to="/webshop/delicatessen" className="text-foreground hover:text-navy transition-colors font-medium text-sm">
              Delicatessen
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-accent rounded-full transition-colors">
              <User className="w-5 h-5 text-foreground" />
            </button>
            <Button variant="default" size="sm" className="bg-navy hover:bg-navy-light text-primary-foreground gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Winkelwagen</span>
              <span className="bg-gold text-navy text-xs font-bold px-1.5 py-0.5 rounded-full">0</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link to="/webshop" className="text-foreground hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium">
                Webwinkel
              </Link>
              <Link to="/webshop/verse-vis" className="text-foreground hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium">
                Verse Vis
              </Link>
              <Link to="/webshop/schotels" className="text-foreground hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium">
                Schotels
              </Link>
              <Link to="/webshop/schaal-schelpdieren" className="text-foreground hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium">
                Zeevruchten
              </Link>
              <Link to="/webshop/delicatessen" className="text-foreground hover:bg-accent px-4 py-3 rounded-lg transition-colors font-medium">
                Delicatessen
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default WebshopHeader;