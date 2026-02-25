export type Platform = 'zepto' | 'instamart' | 'blinkit' | 'bigbasket';

export interface PlatformPrice {
  platform: Platform;
  price: number;
  deliveryTime: string;
  inStock: boolean;
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  image: string;
  unit: string;
  prices: PlatformPrice[];
}

export const platformLabels: Record<Platform, string> = {
  zepto: 'Zepto',
  instamart: 'Instamart',
  blinkit: 'Blinkit',
  bigbasket: 'BigBasket',
};

export const platformColors: Record<Platform, string> = {
  zepto: 'bg-platform-zepto',
  instamart: 'bg-platform-instamart',
  blinkit: 'bg-platform-blinkit',
  bigbasket: 'bg-platform-bigbasket',
};

export const platformTextColors: Record<Platform, string> = {
  zepto: 'platform-zepto',
  instamart: 'platform-instamart',
  blinkit: 'platform-blinkit',
  bigbasket: 'platform-bigbasket',
};

export const mockGroceries: GroceryItem[] = [
  {
    id: '1',
    name: 'Amul Toned Milk',
    category: 'Dairy',
    image: '🥛',
    unit: '1 L',
    prices: [
      { platform: 'zepto', price: 66, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 64, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 65, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 62, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '2',
    name: 'Aashirvaad Atta',
    category: 'Staples',
    image: '🌾',
    unit: '5 kg',
    prices: [
      { platform: 'zepto', price: 299, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 289, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 295, deliveryTime: '12 min', inStock: false },
      { platform: 'bigbasket', price: 279, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '3',
    name: 'Organic Bananas',
    category: 'Fruits',
    image: '🍌',
    unit: '1 dozen',
    prices: [
      { platform: 'zepto', price: 49, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 45, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 47, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 42, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '4',
    name: 'Maggi Noodles',
    category: 'Packaged Food',
    image: '🍜',
    unit: 'Pack of 12',
    prices: [
      { platform: 'zepto', price: 168, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 162, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 165, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 156, deliveryTime: '30 min', inStock: false },
    ],
  },
  {
    id: '5',
    name: 'Onions',
    category: 'Vegetables',
    image: '🧅',
    unit: '1 kg',
    prices: [
      { platform: 'zepto', price: 38, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 35, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 36, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 32, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '6',
    name: 'Britannia Bread',
    category: 'Bakery',
    image: '🍞',
    unit: '400g',
    prices: [
      { platform: 'zepto', price: 45, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 42, deliveryTime: '15 min', inStock: false },
      { platform: 'blinkit', price: 44, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 40, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '7',
    name: 'Tomatoes',
    category: 'Vegetables',
    image: '🍅',
    unit: '1 kg',
    prices: [
      { platform: 'zepto', price: 42, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 38, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 40, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 35, deliveryTime: '30 min', inStock: true },
    ],
  },
  {
    id: '8',
    name: 'Tata Tea Gold',
    category: 'Beverages',
    image: '🍵',
    unit: '500g',
    prices: [
      { platform: 'zepto', price: 285, deliveryTime: '10 min', inStock: true },
      { platform: 'instamart', price: 275, deliveryTime: '15 min', inStock: true },
      { platform: 'blinkit', price: 280, deliveryTime: '12 min', inStock: true },
      { platform: 'bigbasket', price: 265, deliveryTime: '30 min', inStock: true },
    ],
  },
];

export const categories = ['All', 'Dairy', 'Staples', 'Fruits', 'Vegetables', 'Packaged Food', 'Bakery', 'Beverages'];
