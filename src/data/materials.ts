import graniteDetail from '@/assets/granite-detail.jpg';
import quartzDetail from '@/assets/quartz-detail.jpg';
import quartziteDetail from '@/assets/quartzite-detail.jpg';
import marbleDetail from '@/assets/marble-detail.jpg';

export interface MaterialData {
  slug: string;
  name: string;
  heroImage: string;
  tagline: string;
  description: string;
  overview: string;
  pros: string[];
  cons: string[];
  applications: {
    title: string;
    description: string;
  }[];
  maintenance: {
    title: string;
    description: string;
  }[];
  priceRange: string;
  priceNote: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  features: string[];
}

export const materialsData: Record<string, MaterialData> = {
  granite: {
    slug: 'granite',
    name: 'Granite',
    heroImage: graniteDetail,
    tagline: 'Natural Beauty Meets Unmatched Durability',
    description: 'Each granite slab is a unique work of art, formed over millions of years deep within the earth. Experience the timeless beauty of natural stone.',
    overview: `Granite is an igneous rock formed from cooled magma, making it one of the hardest and most durable natural stones available for countertops. Each slab features unique mineral patterns created over millions of years, ensuring your countertops are truly one-of-a-kind.

At Stoneworks of Colorado, we source our granite from premier quarries around the world, hand-selecting each slab for quality, consistency, and beauty. Our expert fabricators work with state-of-the-art equipment to bring out the natural beauty of every piece.`,
    pros: [
      'Extremely heat resistant - place hot pots directly on the surface',
      'Highly scratch resistant - won\'t show knife marks',
      'Unique natural patterns - no two slabs are alike',
      'Increases home value with timeless appeal',
      'Available in hundreds of colors and patterns',
      'Can last a lifetime with proper care'
    ],
    cons: [
      'Requires periodic sealing (annually recommended)',
      'Porous nature can absorb liquids if not sealed',
      'Some patterns have natural fissures',
      'Heavier than engineered alternatives',
      'Visible seams on larger installations'
    ],
    applications: [
      {
        title: 'Kitchen Countertops',
        description: 'The most popular choice for busy kitchens. Granite\'s heat and scratch resistance makes it ideal for meal prep and cooking.'
      },
      {
        title: 'Bathroom Vanities',
        description: 'Granite adds luxury to master baths and powder rooms while resisting moisture and daily wear.'
      },
      {
        title: 'Outdoor Kitchens',
        description: 'Select granites perform beautifully outdoors, handling Colorado\'s temperature swings with ease.'
      },
      {
        title: 'Bar Tops',
        description: 'Create a stunning focal point with granite\'s natural beauty, perfect for entertaining spaces.'
      }
    ],
    maintenance: [
      {
        title: 'Daily Cleaning',
        description: 'Wipe with a soft cloth and mild dish soap. Avoid harsh chemicals that can break down the sealer.'
      },
      {
        title: 'Annual Sealing',
        description: 'Apply a quality granite sealer once a year. We offer professional sealing services for our clients.'
      },
      {
        title: 'Spill Management',
        description: 'Clean up acidic spills (wine, citrus, vinegar) promptly to prevent potential staining.'
      },
      {
        title: 'Heat Protection',
        description: 'While granite is heat resistant, using trivets extends the life of your sealer and surface.'
      }
    ],
    priceRange: '$50 - $200+ per square foot installed',
    priceNote: 'Price varies based on stone rarity, color, and pattern complexity. Contact us for a personalized quote.',
    faqs: [
      {
        question: 'Is granite more durable than quartz?',
        answer: 'Granite and quartz have comparable durability, but they excel in different areas. Granite is more heat-resistant and handles direct contact with hot pots better. Quartz is non-porous and requires no sealing. Both are excellent choices for high-traffic kitchens.'
      },
      {
        question: 'How often does granite need to be sealed?',
        answer: 'We recommend sealing granite countertops annually for optimal protection. Some lighter-colored granites may benefit from sealing every 6 months. We can assess your specific stone and provide maintenance guidance.'
      },
      {
        question: 'Can granite crack or chip?',
        answer: 'Granite is extremely durable but not indestructible. Heavy impacts on edges can cause chips, and improper support can lead to cracks. Proper installation and reasonable care will keep your granite beautiful for decades.'
      },
      {
        question: 'Does granite harbor bacteria?',
        answer: 'When properly sealed and maintained, granite is a hygienic surface. The sealer fills the pores, preventing bacteria from penetrating. Regular cleaning with mild soap keeps your counters sanitary.'
      }
    ],
    features: ['100% Natural Stone', 'Heat Resistant', 'Unique Patterns']
  },
  quartz: {
    slug: 'quartz',
    name: 'Quartz',
    heroImage: quartzDetail,
    tagline: 'Engineered Perfection for Modern Living',
    description: 'Quartz combines the beauty of natural stone with the performance of modern engineering. Enjoy consistent patterns and virtually maintenance-free luxury.',
    overview: `Quartz countertops are engineered surfaces made from approximately 90-95% ground natural quartz crystals bound with polymer resins. This manufacturing process creates a non-porous, incredibly durable surface that never needs sealing.

At Stoneworks of Colorado, we partner with leading quartz manufacturers to offer an extensive selection of colors and patterns. From marble-look veining to solid contemporary colors, quartz provides design flexibility with exceptional performance.`,
    pros: [
      'Non-porous - never needs sealing',
      'Highly resistant to stains and bacteria',
      'Consistent color and pattern throughout',
      'Wide variety of colors and designs available',
      'Extremely durable and scratch-resistant',
      'Low maintenance - easy daily cleaning'
    ],
    cons: [
      'Not as heat resistant as granite - use trivets',
      'Direct sunlight can cause discoloration over time',
      'Higher cost than some natural stones',
      'Less unique than natural stone patterns',
      'Not recommended for outdoor applications'
    ],
    applications: [
      {
        title: 'Kitchen Countertops',
        description: 'Perfect for busy families who want beautiful surfaces without the maintenance of natural stone.'
      },
      {
        title: 'Bathroom Vanities',
        description: 'Quartz\'s non-porous nature makes it ideal for bathrooms where moisture and humidity are concerns.'
      },
      {
        title: 'Waterfall Islands',
        description: 'Quartz\'s consistent patterns make it perfect for dramatic waterfall edges with seamless flow.'
      },
      {
        title: 'Commercial Spaces',
        description: 'High durability and low maintenance make quartz ideal for offices, retail, and hospitality.'
      }
    ],
    maintenance: [
      {
        title: 'Daily Cleaning',
        description: 'Simply wipe with warm water and mild soap. No special cleaners needed.'
      },
      {
        title: 'No Sealing Required',
        description: 'Unlike natural stone, quartz never needs sealing, saving time and money over its lifetime.'
      },
      {
        title: 'Heat Protection',
        description: 'Always use trivets or hot pads. Sudden temperature changes can damage the resin binding.'
      },
      {
        title: 'Avoid Harsh Chemicals',
        description: 'Skip abrasive cleaners and bleach. Mild dish soap handles any cleaning task.'
      }
    ],
    priceRange: '$55 - $175+ per square foot installed',
    priceNote: 'Price depends on brand, color, and pattern complexity. Premium designer lines cost more. Contact us for exact pricing.',
    faqs: [
      {
        question: 'Is quartz a natural stone?',
        answer: 'Quartz countertops are engineered surfaces made from approximately 90-95% ground natural quartz crystals combined with polymer resins and pigments. While the quartz crystals are natural, the final product is manufactured.'
      },
      {
        question: 'Can I put hot pans on quartz?',
        answer: 'We recommend always using trivets or hot pads with quartz countertops. While quartz is heat-resistant to a degree, sudden temperature changes or sustained heat can damage the resin binding and cause discoloration or cracking.'
      },
      {
        question: 'Will quartz stain?',
        answer: 'Quartz is highly stain-resistant due to its non-porous nature. However, prolonged exposure to certain chemicals or leaving spills for extended periods can potentially cause issues. Clean spills promptly for best results.'
      },
      {
        question: 'How does quartz compare in price to granite?',
        answer: 'Quartz and granite have overlapping price ranges. Mid-range options for both typically fall between $60-$100 per square foot installed. Premium varieties of either can exceed $150 per square foot.'
      }
    ],
    features: ['Non-Porous', 'Low Maintenance', 'Consistent Color']
  },
  quartzite: {
    slug: 'quartzite',
    name: 'Quartzite',
    heroImage: quartziteDetail,
    tagline: 'Nature\'s Hardest Stone with Stunning Beauty',
    description: 'Quartzite offers the flowing elegance of marble with durability that surpasses granite. Experience the best of both worlds.',
    overview: `Quartzite is a natural metamorphic rock formed when sandstone is subjected to extreme heat and pressure deep within the earth. This process transforms soft sandstone into one of nature's hardest materials, creating stunning flowing patterns reminiscent of marble.

At Stoneworks of Colorado, we carefully curate our quartzite selection from premium quarries worldwide. Each slab is hand-inspected for quality and structural integrity, ensuring you receive only the finest material for your home.`,
    pros: [
      'Harder than granite - extremely scratch resistant',
      'Naturally beautiful flowing patterns',
      'Highly heat resistant for cooking',
      'UV resistant - suitable for sunny areas',
      'Unique natural variations in each slab',
      'Excellent long-term investment'
    ],
    cons: [
      'Requires annual sealing like granite',
      'Higher price point than many alternatives',
      'Limited color palette compared to quartz',
      'Harder stone makes fabrication more complex',
      'Quality varies significantly between quarries'
    ],
    applications: [
      {
        title: 'Kitchen Countertops',
        description: 'Ideal for those who love the marble look but need superior durability for active kitchens.'
      },
      {
        title: 'Statement Islands',
        description: 'Quartzite\'s dramatic veining creates unforgettable centerpieces in open-concept spaces.'
      },
      {
        title: 'Bathroom Vanities',
        description: 'Adds spa-like luxury to master baths with patterns that rival the finest marble.'
      },
      {
        title: 'Outdoor Applications',
        description: 'UV resistance makes quartzite an excellent choice for Colorado outdoor kitchens and patios.'
      }
    ],
    maintenance: [
      {
        title: 'Regular Sealing',
        description: 'Apply a quality stone sealer annually. Some quartzites may need more frequent sealing.'
      },
      {
        title: 'Daily Care',
        description: 'Clean with pH-neutral stone cleaner or mild dish soap and warm water.'
      },
      {
        title: 'Avoid Acids',
        description: 'While more resistant than marble, acidic substances should still be cleaned promptly.'
      },
      {
        title: 'Professional Maintenance',
        description: 'We offer annual maintenance services to keep your quartzite looking pristine.'
      }
    ],
    priceRange: '$70 - $250+ per square foot installed',
    priceNote: 'Exotic quartzites with unique patterns command premium prices. Contact us for current availability and pricing.',
    faqs: [
      {
        question: 'What\'s the difference between quartz and quartzite?',
        answer: 'Despite similar names, they\'re very different. Quartzite is a natural stone formed from sandstone, while quartz countertops are engineered from ground crystals and resins. Quartzite is harder and more heat-resistant but requires sealing.'
      },
      {
        question: 'Is quartzite better than granite?',
        answer: 'Quartzite is harder than granite and often features more dramatic veining. However, both are excellent choices. Quartzite typically costs more due to its rarity and the complexity of fabrication. The best choice depends on your aesthetic preferences and budget.'
      },
      {
        question: 'Does quartzite etch like marble?',
        answer: 'True quartzite is much more resistant to etching than marble. However, some stones labeled as quartzite are actually dolomitic marble. We always test our slabs to ensure you\'re getting genuine quartzite.'
      },
      {
        question: 'How do I know if I have real quartzite?',
        answer: 'True quartzite won\'t etch with acidic substances like lemon juice. If you\'re unsure about your existing counters, we can help identify your stone type and provide appropriate care recommendations.'
      }
    ],
    features: ['Extremely Durable', 'Natural Stone', 'Exotic Patterns']
  },
  porcelain: {
    slug: 'porcelain',
    name: 'Porcelain',
    heroImage: graniteDetail, // Using granite as placeholder - replace with porcelain image
    tagline: 'Ultra-Thin Luxury with Maximum Performance',
    description: 'Porcelain slabs offer revolutionary design possibilities with extreme durability. Experience the future of countertop surfaces.',
    overview: `Porcelain countertops represent the cutting edge of surface technology. Made from refined clay fired at extreme temperatures, porcelain slabs offer an incredibly thin profile with outstanding durability and design flexibility.

At Stoneworks of Colorado, we've embraced this innovative material for clients seeking unique applications. Porcelain's ability to replicate natural stone, concrete, metal, and even wood opens unlimited design possibilities while delivering exceptional performance.`,
    pros: [
      'Extremely heat resistant - up to 2,200°F',
      'Highly scratch and stain resistant',
      'Non-porous - never needs sealing',
      'UV resistant - perfect for outdoor use',
      'Thin profile reduces weight significantly',
      'Can mimic marble, concrete, wood, and more'
    ],
    cons: [
      'Can chip on edges if impacted heavily',
      'Less familiar to some homeowners',
      'Requires specialized fabrication expertise',
      'Limited selection compared to natural stone',
      'Seams more visible than other materials'
    ],
    applications: [
      {
        title: 'Kitchen Countertops',
        description: 'Perfect for those who want marble aesthetics with superior performance and zero maintenance.'
      },
      {
        title: 'Outdoor Kitchens',
        description: 'Porcelain excels outdoors with full UV resistance and tolerance for Colorado weather extremes.'
      },
      {
        title: 'Backsplashes',
        description: 'Large-format porcelain creates seamless backsplashes with minimal grout lines.'
      },
      {
        title: 'Fireplace Surrounds',
        description: 'Extreme heat resistance makes porcelain ideal for fireplace applications.'
      }
    ],
    maintenance: [
      {
        title: 'Simple Cleaning',
        description: 'Wipe with any non-abrasive cleaner. Porcelain handles most cleaning products safely.'
      },
      {
        title: 'No Sealing Needed',
        description: 'Like quartz, porcelain never requires sealing due to its non-porous surface.'
      },
      {
        title: 'Edge Care',
        description: 'While very durable, porcelain edges can chip from heavy impacts. Use reasonable care.'
      },
      {
        title: 'Long-Term Beauty',
        description: 'Porcelain maintains its appearance indefinitely with basic care and cleaning.'
      }
    ],
    priceRange: '$50 - $150+ per square foot installed',
    priceNote: 'Pricing depends on thickness, pattern, and manufacturer. Specialty designs may cost more.',
    faqs: [
      {
        question: 'Is porcelain durable enough for kitchen countertops?',
        answer: 'Absolutely. Modern porcelain slabs are engineered for countertop use with excellent scratch, stain, and heat resistance. They\'re widely used in commercial kitchens and high-end residential applications worldwide.'
      },
      {
        question: 'How thin are porcelain countertops?',
        answer: 'Porcelain slabs typically range from 6mm to 12mm thickness, compared to 20-30mm for natural stone. This thin profile reduces weight and offers a sleek, contemporary aesthetic while maintaining full durability.'
      },
      {
        question: 'Can porcelain crack or chip?',
        answer: 'While porcelain is very durable, edges can chip from heavy impacts. Proper fabrication and edge finishing minimize this risk. Our installers take extra care with porcelain edges to ensure long-lasting results.'
      },
      {
        question: 'Why choose porcelain over natural stone?',
        answer: 'Porcelain offers zero maintenance, extreme heat resistance, and full UV stability that natural stone can\'t match. It\'s ideal for outdoor applications, fireplace surrounds, and clients who want a completely care-free surface.'
      }
    ],
    features: ['Ultra Heat Resistant', 'Zero Maintenance', 'UV Stable']
  }
};

export const getMaterialBySlug = (slug: string): MaterialData | undefined => {
  return materialsData[slug];
};

export const getAllMaterials = (): MaterialData[] => {
  return Object.values(materialsData);
};
