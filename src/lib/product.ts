export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  region: string;
  altitude: string;
  process: string;
  roastLevel: string;
  flavor: string[];
  price: number;
  currency: string;
  weight: string;
  description: string;
  story: StorySection[];
}

export interface StorySection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  scrollRange: [number, number]; // [start, end] of 0-1 scroll progress
}

export const acehGayoProduct: CoffeeProduct = {
  id: "aceh-gayo-01",
  name: "Aceh Gayo Arabica",
  origin: "Indonesia",
  region: "Aceh Gayo Highlands",
  altitude: "1,200 – 1,600 masl",
  process: "Wet-Hulled (Giling Basah)",
  roastLevel: "Medium-Dark",
  flavor: ["Dark Chocolate", "Cedar", "Tropical Fruit", "Brown Sugar", "Herbal"],
  price: 24.99,
  currency: "USD",
  weight: "250g",
  description:
    "Grown in the volcanic highlands of Aceh, this single-origin Arabica is wet-hulled in the traditional Gayo method — producing a full-bodied cup with an earthy depth, dark chocolate warmth, and a smooth, lingering finish.",
  story: [
    {
      id: "origin",
      title: "Highland Origin",
      subtitle: "Aceh Gayo, Sumatra",
      description:
        "At 1,400 meters above sea level, volcanic soil meets tropical rain. The Gayo highlands of Aceh nurture each cherry with the patience of centuries — where every bean inherits the spirit of the land.",
      scrollRange: [0.05, 0.22],
    },
    {
      id: "craft",
      title: "Arabica Craft & Roast",
      subtitle: "Wet-Hulled Tradition",
      description:
        "Harvested by hand. Wet-hulled in the ancient Giling Basah method. Slow-roasted to a medium-dark perfection — unlocking layers of complexity that only patience can reveal.",
      scrollRange: [0.25, 0.42],
    },
    {
      id: "aroma",
      title: "Aroma & Flavor Notes",
      subtitle: "A Symphony of Earth & Sweetness",
      description:
        "Dark chocolate meets cedar wood. Tropical fruit dances with brown sugar. Each sip is a meditation — warm, full-bodied, and endlessly layered.",
      scrollRange: [0.50, 0.67],
    },
    {
      id: "brewed",
      title: "Brewed Perfection",
      subtitle: "From Origin to Cup",
      description:
        "The journey ends where flavor begins. Pour, steep, and savor — a cup that carries the highlands of Gayo, the hands of farmers, and the craft of generations.",
      scrollRange: [0.70, 0.97],
    },
  ],
};

export const TOTAL_FRAMES = 142;
export const IMAGE_PATH_PREFIX = "/images/aceh-gayo/frame_";
export const PX_IMAGE_PATH_PREFIX = "/images/px-aceh-gayo/frame_";
export const IMAGE_EXTENSION = ".webp";

export function getFramePath(
  index: number,
  isSmallScreen: boolean = false
): string {
  const prefix = isSmallScreen ? PX_IMAGE_PATH_PREFIX : IMAGE_PATH_PREFIX;
  const padded = String(index).padStart(4, "0");
  return `${prefix}${padded}${IMAGE_EXTENSION}`;
}
