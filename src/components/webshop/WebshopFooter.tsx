import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const WebshopFooter = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Schmidt Zeevis</h3>
            <p className="text-sea-light text-sm mb-4 leading-relaxed">
              Koninklijke kwaliteit sinds 1916. Elke dag meer dan 133 soorten verse vis, direct van de afslag.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-navy-light flex items-center justify-center hover:bg-gold hover:text-navy transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Webwinkel</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/webshop/verse-vis" className="text-sea-light hover:text-gold transition-colors">
                  Verse Vis
                </Link>
              </li>
              <li>
                <Link to="/webshop/schotels" className="text-sea-light hover:text-gold transition-colors">
                  Schotels
                </Link>
              </li>
              <li>
                <Link to="/webshop/schaal-schelpdieren" className="text-sea-light hover:text-gold transition-colors">
                  Schaal- en Schelpdieren
                </Link>
              </li>
              <li>
                <Link to="/webshop/delicatessen" className="text-sea-light hover:text-gold transition-colors">
                  Delicatessen
                </Link>
              </li>
              <li>
                <Link to="/webshop/viskalender" className="text-sea-light hover:text-gold transition-colors">
                  Viskalender
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Informatie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ons-verhaal" className="text-sea-light hover:text-gold transition-colors">
                  Ons Verhaal
                </Link>
              </li>
              <li>
                <Link to="/bestellen-bezorgen" className="text-sea-light hover:text-gold transition-colors">
                  Bestellen & Bezorgen
                </Link>
              </li>
              <li>
                <Link to="/veelgestelde-vragen" className="text-sea-light hover:text-gold transition-colors">
                  Veelgestelde Vragen
                </Link>
              </li>
              <li>
                <Link to="/algemene-voorwaarden" className="text-sea-light hover:text-gold transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sea-light hover:text-gold transition-colors">
                  Privacy Statement
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sea-light">
                  Matlingeweg 333<br />
                  3044 EV Rotterdam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="tel:+31102140673" className="text-sea-light hover:text-gold transition-colors">
                  010 – 214 06 73
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href="mailto:info@schmidtzeevis.nl" className="text-sea-light hover:text-gold transition-colors">
                  info@schmidtzeevis.nl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="text-sea-light">
                  Di - Za: 09:00 - 17:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-light mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sea-light">
          <p>© {new Date().getFullYear()} Schmidt Zeevis. Alle rechten voorbehouden.</p>
          <p>Bezorging mogelijk vanaf €50,-</p>
        </div>
      </div>
    </footer>
  );
};

export default WebshopFooter;