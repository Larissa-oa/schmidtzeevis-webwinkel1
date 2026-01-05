// Image imports
import oceanParadiseImg from "@/assets/webshop/oceanparadise.png";
import lobsterImg from "@/assets/webshop/lobster.jpg";
import tunaTatakiImg from "@/assets/webshop/tuna-tataki.jpg";
import oystersImg from "@/assets/webshop/oysters.jpg";
import verseVisImg from "@/assets/webshop/verse-vis.jpg";
import schotelsImg from "@/assets/webshop/schotels.jpg";
import sashimiImg from "@/assets/webshop/sashimi.jpg";
import delicatessenImg from "@/assets/webshop/delicatessen.jpg";
import schaalSchelpdierenImg from "@/assets/webshop/schaal-schelpdieren.jpg";
import kantEnKlaarImg from "@/assets/webshop/kant-en-klaar.jpg";
import diepvriesImg from "@/assets/webshop/diepvries.jpg";


// Collection images
import alleImg from "@/assets/collecties/alle.avif";
import conservenImg from "@/assets/collecties/conserven.avif";
import delicatessenCollectieImg from "@/assets/collecties/delicatessen.jpg";
import diepvriesCollectieImg from "@/assets/collecties/diepvries.jpg";
import diversenImg from "@/assets/collecties/diversen.jpg";
import kantenklaarImg from "@/assets/collecties/kantenklaar.jpg";
import kruidenImg from "@/assets/collecties/kruiden.avif";
import merchandiseImg from "@/assets/collecties/merchandise.jpg";
import olieenazijnImg from "@/assets/collecties/olieenazijn.jpg";
import sauzenImg from "@/assets/collecties/sauzen.jpg";
import schaalEnSchelpdierenImg from "@/assets/collecties/SchaalenSchelpdieren.avif";
import schotelsCollectieImg from "@/assets/collecties/schotels.jpg";
import sushiensashimiImg from "@/assets/collecties/sushiensashimi.jpg";
import versevisImg from "@/assets/collecties/versevis.avif";
import specialsImg from "@/assets/collecties/specials.jpg";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  priceLabel?: string;
  image: string;
  category: string;
  badge?: string;
  rating?: number;
  variants?: ProductVariant[];
  portions?: string[];
  inStock?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export const collections: Collection[] = [
  {
    id: "alle-producten",
    name: "Alle Producten",
    slug: "alle-producten",
    description: "Bekijk ons complete assortiment",
    image: alleImg,
    productCount: 250
  },
  {
    id: "verse-vis",
    name: "Verse Vis",
    slug: "verse-vis",
    description: "Elke dag vers van de afslag",
    image: versevisImg,
    productCount: 133
  },
  {
    id: "specials",
    name: "Specials",
    slug: "specials",
    description: "Exclusieve producten",
    image: specialsImg,
    productCount: 24
  },
  {
    id: "schaal-schelpdieren",
    name: "Schaal- en Schelpdieren",
    slug: "schaal-schelpdieren",
    description: "Kreeft, oesters en meer",
    image: schaalEnSchelpdierenImg,
    productCount: 45
  },
  {
    id: "delicatessen",
    name: "Delicatessen",
    slug: "delicatessen",
    description: "Gerookte vis en salades",
    image: delicatessenCollectieImg,
    productCount: 32
  },
  {
    id: "kant-en-klaar",
    name: "Kant-en-klaar",
    slug: "kant-en-klaar",
    description: "Direct te serveren",
    image: kantenklaarImg,
    productCount: 20
  },
  {
    id: "schotels",
    name: "Schotels",
    slug: "schotels",
    description: "Luxe schotels",
    image: schotelsCollectieImg,
    productCount: 18
  },
  {
    id: "conserven",
    name: "Conserven",
    slug: "conserven",
    description: "Vis uit blik",
    image: conservenImg,
    productCount: 15
  },
  {
    id: "diepvries",
    name: "Diepvries",
    slug: "diepvries",
    description: "Ingevroren voor versheid",
    image: diepvriesCollectieImg,
    productCount: 28
  },
  {
    id: "sauzen",
    name: "Sauzen",
    slug: "sauzen",
    description: "Sauzen en dressings",
    image: sauzenImg,
    productCount: 12
  },
  {
    id: "diversen",
    name: "Diversen",
    slug: "diversen",
    description: "Overige producten",
    image: diversenImg,
    productCount: 10
  },
  {
    id: "sushi-sashimi",
    name: "Sushi en Sashimi",
    slug: "sushi-sashimi",
    description: "Verse sashimi",
    image: sushiensashimiImg,
    productCount: 15
  },
  {
    id: "olie-azijn",
    name: "Olie en Azijn",
    slug: "olie-azijn",
    description: "Premium oliën",
    image: olieenazijnImg,
    productCount: 8
  },
  {
    id: "kruiden-specerijen",
    name: "Kruiden en Specerijen",
    slug: "kruiden-specerijen",
    description: "Kruiden voor vis",
    image: kruidenImg,
    productCount: 14
  },
  {
    id: "merchandise",
    name: "Merchandise",
    slug: "merchandise",
    description: "Schmidt artikelen",
    image: merchandiseImg,
    productCount: 6
  }
];

export const featuredProducts: Product[] = [
  {
    id: "ocean-paradise",
    name: "Ocean Paradise",
    description: "Een luxueuze schotel met de beste vruchten van de zee. Inclusief Noordzeekrab, gamba's, Zeeuwse oesters en gerookte zalm.",
    shortDescription: "Luxe fruits de mer schotel",
    price: 69.50,
    priceLabel: "Vanaf",
    image: oceanParadiseImg,
    category: "schotels",
    badge: "Populair",
    rating: 4.9,
    variants: [
      { id: "op-2", name: "Ocean Paradise 2 personen", price: 69.50 },
      { id: "op-4", name: "Ocean Paradise 4 personen", price: 129.50 }
    ]
  },
  {
    id: "canadese-kreeft",
    name: "Canadese Kreeft Gekookt",
    description: "Vers gekookte Canadese kreeft, perfect als hoofdgerecht of als onderdeel van uw fruits de mer.",
    shortDescription: "Vers gekookte kreeft",
    price: 38.50,
    priceLabel: "Vanaf",
    image: lobsterImg,
    category: "schaal-schelpdieren",
    badge: "Chef's Keuze",
    rating: 5.0
  },
  {
    id: "tonijn-tataki",
    name: "Tonijn Tataki",
    description: "Gebakken tonijn in dunne plakken met sesamkorst, geserveerd met sojadressing en wasabi.",
    shortDescription: "Gebakken tonijn met sesam",
    price: 18.95,
    priceLabel: "Vanaf",
    image: tunaTatakiImg,
    category: "sushi-sashimi",
    badge: "Nieuw",
    rating: 4.8
  },
  {
    id: "oesters-zeeuwse",
    name: "Zeeuwse Oesters",
    description: "Creuses oesters uit de Oosterschelde, bekend om hun zilte smaak en romige textuur.",
    shortDescription: "Premium Zeeuwse creuses",
    price: 12.90,
    priceLabel: "Vanaf",
    image: oystersImg,
    category: "schaal-schelpdieren",
    rating: 4.9,
    variants: [
      { id: "oz-6", name: "6 stuks", price: 12.90 },
      { id: "oz-12", name: "12 stuks", price: 24.50 },
      { id: "oz-24", name: "24 stuks", price: 46.00 }
    ]
  },
  {
    id: "zeebaars",
    name: "Zeebaars",
    description: "Verse zeebaars uit de Middellandse Zee.",
    shortDescription: "Premium zeebaars",
    price: 28.95,
    priceLabel: "Per kg",
    image: verseVisImg,
    category: "verse-vis",
    rating: 4.8
  }
];

export const allProducts: Product[] = [
  ...featuredProducts,
  {
    id: "schmidt-royale",
    name: "Schmidt Royale",
    description: "Onze signature schotel met een selectie van de allerbeste zeevruchten en verse vis.",
    price: 99.50,
    priceLabel: "Vanaf",
    image: schotelsImg,
    category: "schotels",
    variants: [
      { id: "sr-2", name: "Schmidt Royale 2 personen", price: 99.50 },
      { id: "sr-4", name: "Schmidt Royale 4 personen", price: 189.50 }
    ]
  },
  {
    id: "viskwartet",
    name: "Viskwartet Klassiek",
    description: "Vier klassieke vissoorten perfect bereid: zalm, tonijn, kabeljauw en zeebaars.",
    price: 89.50,
    priceLabel: "Vanaf",
    image: verseVisImg,
    category: "schotels"
  },
  {
    id: "fruits-de-mer",
    name: "Fruits de Mer Schotel",
    description: "De ultieme schaal- en schelpdierenschotel voor de echte liefhebber.",
    price: 99.50,
    priceLabel: "Vanaf",
    image: schaalSchelpdierenImg,
    category: "schotels"
  },
  {
    id: "sashimischotel",
    name: "Sashimischotel",
    description: "Verse sashimi van tonijn, zalm en zeebaars met wasabi en gember.",
    price: 57.50,
    priceLabel: "Vanaf",
    image: sashimiImg,
    category: "sushi-sashimi"
  },
  {
    id: "kaviaar-elite",
    name: "Schmidt Elite Beluga Caviar",
    description: "De allerfijnste Beluga kaviaar, met zorg geselecteerd.",
    price: 185.00,
    priceLabel: "Vanaf",
    image: specialsImg,
    category: "delicatessen",
    badge: "Premium"
  },
  {
    id: "gamba",
    name: "Gamba's",
    description: "Grote gamba's, perfect voor de grill of in een wok.",
    price: 24.95,
    priceLabel: "Vanaf",
    image: schaalSchelpdierenImg,
    category: "schaal-schelpdieren"
  },
  {
    id: "zalm-gerookt",
    name: "Gerookte Zalm",
    description: "Ambachtelijk gerookte Noorse zalm, dun gesneden.",
    price: 32.50,
    priceLabel: "Per kg",
    image: delicatessenImg,
    category: "delicatessen"
  },
  {
    id: "zeebaars",
    name: "Zeebaars",
    description: "Verse zeebaars uit de Middellandse Zee.",
    price: 28.95,
    priceLabel: "Per kg",
    image: verseVisImg,
    category: "verse-vis"
  }
];

export const recipes = [
  {
    id: "recipe-1",
    name: "Gegrilde Zeebaars met Kreeft Saus",
    description: "Een verfijnd gerecht met gegrilde zeebaars bedekt met een romige kreeft saus. Perfect voor een bijzondere gelegenheid.",
    image: verseVisImg,
    products: ["zeebaars", "canadese-kreeft", "gamba"]
  },
  {
    id: "recipe-2",
    name: "Fruits de Mer Platter",
    description: "Imponeer uw gasten met een royale schaal vol zeevruchten. Een feestelijk gerecht voor de echte liefhebber.",
    image: oceanParadiseImg,
    products: ["canadese-kreeft", "oesters-zeeuwse", "gamba"]
  },
  {
    id: "recipe-3",
    name: "Zalm Tartaar met Oesters",
    description: "Verfijnde tartaar van gerookte zalm met kappertjes, dille en verse Zeeuwse oesters. Een elegant voorgerecht.",
    image: delicatessenImg,
    products: ["zalm-gerookt", "oesters-zeeuwse"]
  },
  {
    id: "recipe-4",
    name: "Zeebaars op Bedje van Gamba's",
    description: "Gegrilde zeebaarsfilet geserveerd op een bedje van gebakken gamba's met knoflook en peterselie.",
    image: verseVisImg,
    products: ["zeebaars", "gamba"]
  },
  {
    id: "recipe-5",
    name: "Kreeft Thermidor",
    description: "Klassiek Frans gerecht met gekookte kreeft in een romige kaas-groente saus, geserveerd in de kreeftschaal.",
    image: lobsterImg,
    products: ["canadese-kreeft", "gamba"]
  }
];

export const fishCalendar = [
  { month: "Januari", fish: ["Kabeljauw", "Schol", "Tong", "Heilbot"] },
  { month: "Februari", fish: ["Kabeljauw", "Schol", "Tarbot", "Griet"] },
  { month: "Maart", fish: ["Tonijn", "Makreel", "Zeebaars", "Dorade"] },
  { month: "April", fish: ["Tonijn", "Makreel", "Zeebaars", "Sardines"] },
  { month: "Mei", fish: ["Zalm", "Makreel", "Sardines", "Ansjovis"] },
  { month: "Juni", fish: ["Zalm", "Tonijn", "Zwaardvis", "Sardines"] },
  { month: "Juli", fish: ["Kreeft", "Gamba's", "Inktvis", "Tonijn"] },
  { month: "Augustus", fish: ["Kreeft", "Langoustine", "Tonijn", "Zwaardvis"] },
  { month: "September", fish: ["Oesters", "Mosselen", "Makreel", "Sardines"] },
  { month: "Oktober", fish: ["Oesters", "Mosselen", "Kabeljauw", "Schelvis"] },
  { month: "November", fish: ["Kabeljauw", "Schelvis", "Schol", "Tong"] },
  { month: "December", fish: ["Kreeft", "Oesters", "Kabeljauw", "Heilbot"] }
];