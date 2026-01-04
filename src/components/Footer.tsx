import { Fish, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-deep text-pearl">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-seafoam flex items-center justify-center">
                <Fish className="w-7 h-7 text-ocean-deep" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Ocean's Best</h3>
                <p className="text-xs text-pearl/70">Premium Seafood</p>
              </div>
            </a>
            <p className="text-pearl/80 mb-6">
              Delivering the freshest seafood from ocean to table since 1985. Quality you can taste.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-pearl/10 flex items-center justify-center hover:bg-seafoam transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pearl/10 flex items-center justify-center hover:bg-seafoam transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-pearl/10 flex items-center justify-center hover:bg-seafoam transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#freshest" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Fresh Catch
                </a>
              </li>
              <li>
                <a href="#collection" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Collection
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Fresh Fish
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Shellfish
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Premium Selection
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Fillets & Steaks
                </a>
              </li>
              <li>
                <a href="#" className="text-pearl/80 hover:text-seafoam transition-colors">
                  Gift Boxes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-seafoam flex-shrink-0 mt-0.5" />
                <span className="text-pearl/80">
                  123 Harbor Drive<br />
                  Oceanside, CA 92054
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-seafoam flex-shrink-0" />
                <a href="tel:+18001234567" className="text-pearl/80 hover:text-seafoam transition-colors">
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-seafoam flex-shrink-0" />
                <a href="mailto:hello@oceansbest.com" className="text-pearl/80 hover:text-seafoam transition-colors">
                  hello@oceansbest.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-pearl/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pearl/60 text-sm">
              © 2024 Ocean's Best. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-pearl/60 hover:text-pearl transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-pearl/60 hover:text-pearl transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-pearl/60 hover:text-pearl transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
