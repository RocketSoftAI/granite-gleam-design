// Stock program stone data organized by category

export interface StoneItem {
  name: string;
  image: string;
}

export interface StoneCategory {
  name: string;
  stones: StoneItem[];
}

export const graniteStones: StoneItem[] = [
  { name: 'Venetian Gold', image: '/images/stock/granite/venetian-gold.png' },
  { name: 'Valle Nevado', image: '/images/stock/granite/valle-nevado.png' },
  { name: 'Caledonia', image: '/images/stock/granite/caledonia.png' },
  { name: 'Blanco Tulum', image: '/images/stock/granite/blanco-tulum.png' },
  { name: 'Uba Tuba', image: '/images/stock/granite/uba-tuba.png' },
  { name: 'Black Pearl Polished', image: '/images/stock/granite/black-pearl-polished.png' },
  { name: 'Steel Gray Polished', image: '/images/stock/granite/steel-gray-polished.png' },
  { name: 'Viscount White', image: '/images/stock/granite/viscount-white.png' },
  { name: 'Giallo Ornamental', image: '/images/stock/granite/giallo-ornamental.png' },
  { name: 'Steel Gray Leathered', image: '/images/stock/granite/steel-gray-leathered.png' },
  { name: 'Bianco Antico', image: '/images/stock/granite/bianco-antico.png' },
  { name: 'Black Mist Honed', image: '/images/stock/granite/black-mist-honed.png' },
  { name: 'Black Pearl Leathered', image: '/images/stock/granite/black-pearl-leathered.png' },
  { name: 'Typhoon Bordeaux', image: '/images/stock/granite/typhoon-bordeaux.png' },
  { name: 'Kalahari Leathered', image: '/images/stock/granite/kalahari-leathered.png' },
  { name: 'Kalahari Polished', image: '/images/stock/granite/kalahari-polished.png' },
  { name: 'Sunset Canyon', image: '/images/stock/granite/sunset-canyon.png' },
  { name: 'New River White', image: '/images/stock/granite/new-river-white.png' },
];

export const quartzStones: StoneItem[] = [
  { name: 'Iced White', image: '/images/stock/quartz/iced-white.png' },
  { name: 'Macabo Gray', image: '/images/stock/quartz/macabo-gray.png' },
  { name: 'Arctic White', image: '/images/stock/quartz/arctic-white.png' },
  { name: 'Frost White', image: '/images/stock/quartz/frost-white.png' },
  { name: 'Aspen', image: '/images/stock/quartz/aspen.png' },
  { name: 'Sparkling White', image: '/images/stock/quartz/sparkling-white.png' },
  { name: 'Avila', image: '/images/stock/quartz/avila.png' },
  { name: 'Steamboat', image: '/images/stock/quartz/steamboat.png' },
  { name: 'Fossil Gray', image: '/images/stock/quartz/fossil-gray.png' },
  { name: 'Sponda Extra', image: '/images/stock/quartz/sponda-extra.png' },
  { name: 'Carrara Breve', image: '/images/stock/quartz/carrara-breve.png' },
  { name: 'Powderhorn', image: '/images/stock/quartz/powderhorn.png' },
  { name: 'Calico White', image: '/images/stock/quartz/calico-white.png' },
  { name: 'New Carrara Marmi', image: '/images/stock/quartz/new-carrara-marmi.png' },
  { name: 'Mammoth', image: '/images/stock/quartz/mammoth.png' },
  { name: 'Mammoth Gold', image: '/images/stock/quartz/mammoth-gold.png' },
  { name: 'Cashmere Taj', image: '/images/stock/quartz/cashmere-taj.png' },
  { name: 'Calacatta Ultra', image: '/images/stock/quartz/calacatta-ultra.png' },
  { name: 'Tempo Valore', image: '/images/stock/quartz/tempo-valore.png' },
  { name: 'Golden', image: '/images/stock/quartz/golden.png' },
  { name: 'Soapstone Metropolis', image: '/images/stock/quartz/soapstone-metropolis.png' },
  { name: 'Gray Lagoon Polished', image: '/images/stock/quartz/gray-lagoon.png' },
  { name: 'Tranquility', image: '/images/stock/quartz/tranquility.png' },
  { name: 'Calacatta Premata', image: '/images/stock/quartz/calacatta-premata.png' },
  { name: 'Calacatta Safyra', image: '/images/stock/quartz/calacatta-safyra.png' },
  { name: 'Colton', image: '/images/stock/quartz/colton.png' },
  { name: 'Yukon', image: '/images/stock/quartz/yukon.png' },
  { name: 'Cappuccino Blanco', image: '/images/stock/quartz/cappuccino-blanco.png' },
  { name: 'Valla Gold', image: '/images/stock/quartz/valla-gold.png' },
  { name: 'Venus', image: '/images/stock/quartz/venus.png' },
];

export const stoneCategories: StoneCategory[] = [
  { name: 'Granite', stones: graniteStones },
  { name: 'Quartz', stones: quartzStones },
];

export const infoCards = [
  {
    title: 'Stock Program',
    description: 'Stoneworks of Colorado has a variety of stock in selection, contact us today to learn more about the current specials.',
    pageUrl: '/stock-program-colors',
  },
  {
    title: 'Edge Styles',
    description: 'Stoneworks of Colorado offers a variety of edging styles for your next renovation, or new home project.',
    pageUrl: '/edge-styles',
  },
  {
    title: 'Sink Styles',
    description: 'Stoneworks of Colorado offers a variety of sink styles for your next countertop installation.',
    pageUrl: '/sink-styles',
  },
];
