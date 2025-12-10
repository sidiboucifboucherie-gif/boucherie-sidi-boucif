import { Product, OperatingHours, Recipe } from './types';

export const OPENING_HOURS: OperatingHours[] = [
  { day: 'Lundi', open: '', isClosed: true },
  { day: 'Mardi', open: '08:00–12:00, 16:00–20:00', isClosed: false },
  { day: 'Mercredi', open: '08:00–12:00, 16:00–20:00', isClosed: false },
  { day: 'Jeudi', open: '08:00–12:00, 16:00–20:00', isClosed: false },
  { day: 'Vendredi', open: '08:00–12:00, 16:00–20:00', isClosed: false },
  { day: 'Samedi', open: '08:00–12:00, 16:00–20:00', isClosed: false },
  { day: 'Dimanche', open: '08:00–12:00, 16:00–20:00', isClosed: false, isSunday: true },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Côte de Bœuf VBF',
    category: 'beef',
    description: 'Une pièce d’exception, persillée et tendre. Idéale pour les grillades.',
    badges: ['VBF', 'Halal', 'Maturation'],
    imageUrl: '/images/cote-de-boeuf.png',
    price: '29.90€'
  },
  {
    id: '2',
    name: 'Poulet Fermier Label Rouge',
    category: 'poultry',
    description: 'Élevé en plein air, chair ferme et goût authentique.',
    badges: ['Label Rouge', 'Halal', 'Fermier'],
    imageUrl: '/images/poulet-fermier.png',
    price: '12.50€'
  },
  {
    id: '3',
    name: 'Foie de Veau',
    category: 'triperie',
    description: 'Coupe artisanale fine, riche en fer et en saveur.',
    badges: ['Veau Français', 'Halal', 'Artisan'],
    imageUrl: '/images/foie-de-veau.png',
    price: '18.90€'
  },
  {
    id: '4',
    name: 'Gigot d\'Agneau',
    category: 'lamb',
    description: 'Tendre et savoureux, parfait pour vos rôtis du dimanche.',
    badges: ['Origine France', 'Halal'],
    imageUrl: '/images/gigot-agneau.png',
    price: '24.90€'
  },
  {
    id: '5',
    name: 'Saucisses Maison',
    category: 'beef',
    description: 'Préparées sur place avec des épices sélectionnées.',
    badges: ['Fait Maison', 'Halal', 'Sans conservateur'],
    imageUrl: '/images/Saucisses Maison.png',
    price: '14.90€'
  },
  {
    id: '6',
    name: 'Cœur de Bœuf',
    category: 'triperie',
    description: 'Une pièce technique préparée par votre artisan.',
    badges: ['VBF', 'Halal', 'Triperie'],
    imageUrl: '/images/coeur-de-boeuf.png',
    price: '9.90€'
  }
];

export const VISIT_DATA = [
  { time: '08h', visitors: 20 },
  { time: '09h', visitors: 45 },
  { time: '10h', visitors: 80 },
  { time: '11h', visitors: 95 },
  { time: '12h', visitors: 60 },
  { time: '16h', visitors: 30 },
  { time: '17h', visitors: 55 },
  { time: '18h', visitors: 85 },
  { time: '19h', visitors: 70 },
];

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Rôti de Bœuf aux Herbes',
    image: '/images/Rôti de Bœuf aux Herbes.png',
    prepTime: '1h 30m',
    servings: 6,
    difficulty: 'Facile',
    ingredients: [
      '1.5kg de rôti de bœuf',
      '4 gousses d\'ail',
      'Romarin et thym frais',
      'Huile d\'olive',
      'Sel et poivre',
      '500g de pommes de terre'
    ],
    steps: [
      'Préchauffez le four à 200°C.',
      'Frottez la viande avec l\'huile d\'olive, l\'ail haché et les herbes.',
      'Saisissez la viande dans une poêle chaude sur toutes les faces.',
      'Enfournez pendant 45 minutes pour une cuisson saignante.',
      'Laissez reposer 10 minutes avant de découper.'
    ]
  },
  {
    id: '2',
    title: 'Tajine d\'Agneau aux Pruneaux',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=2000&auto=format&fit=crop',
    prepTime: '2h 15m',
    servings: 4,
    difficulty: 'Moyen',
    ingredients: [
      '1kg d\'épaule d\'agneau coupée',
      '250g de pruneaux',
      '100g d\'amandes émondées',
      '2 oignons',
      'Cannelle, gingembre, safran',
      'Miel'
    ],
    steps: [
      'Faites revenir la viande et les oignons dans une cocotte.',
      'Ajoutez les épices et couvrez d\'eau.',
      'Laissez mijoter 1h30 à feu doux.',
      'Ajoutez les pruneaux et le miel, continuez la cuisson 30 min.',
      'Servez garni d\'amandes grillées.'
    ]
  },
  {
    id: '3',
    title: 'Poulet Rôti du Dimanche',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=2000&auto=format&fit=crop',
    prepTime: '1h 45m',
    servings: 4,
    difficulty: 'Facile',
    ingredients: [
      '1 poulet fermier (env. 1.5kg)',
      'Beurre pommade',
      'Citron',
      'Ail',
      'Herbes de Provence',
      'Légumes de saison'
    ],
    steps: [
      'Préchauffez le four à 190°C.',
      'Garnissez l\'intérieur du poulet avec le citron et l\'ail.',
      'Massez la peau avec le beurre et les herbes.',
      'Placez dans un plat avec les légumes autour.',
      'Cuire 1h30 en arrosant régulièrement.'
    ]
  }
];