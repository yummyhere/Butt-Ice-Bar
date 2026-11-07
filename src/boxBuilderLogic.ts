export interface ScoopSelection {
  id: string;
  name: string;
  flavor: string;
  price: number;
  calories: number;
  color: string;
  image: string;
}

export interface ConeOption {
  id: string;
  name: string;
  price: number;
}

export interface BoxConfig {
  boxSize: 4 | 6; // 4-scoop or 6-scoop tasting flight
  selectedScoops: ScoopSelection[];
  coneType: ConeOption;
  giftPackaging: boolean;
}

export const BASE_PRICES: Record<4 | 6, number> = {
  4: 28, // $28 for 4-pack flight
  6: 38, // $38 for 6-pack flight
};

export const CONE_OPTIONS: ConeOption[] = [
  { id: 'waffle-golden', name: 'Artisan Golden Butter Waffle', price: 0 },
  { id: 'waffle-cocoa', name: 'Midnight Charcoal Dutch Cocoa', price: 2 },
  { id: 'waffle-matcha', name: 'Kyoto Green Matcha Cone', price: 2 },
  { id: 'waffle-velvet', name: 'Red Velvet Beetroot Waffle', price: 2 },
];

/**
 * Calculates total price for a tasting flight configuration.
 */
export function calculateBoxPrice(config: BoxConfig): number {
  const basePrice = BASE_PRICES[config.boxSize] || 28;
  const coneCost = config.coneType?.price || 0;
  const packagingCost = config.giftPackaging ? 4 : 0;
  return basePrice + coneCost + packagingCost;
}

/**
 * Calculates total calories for all selected scoops.
 */
export function calculateTotalCalories(scoops: ScoopSelection[]): number {
  return scoops.reduce((sum, item) => sum + (item.calories || 0), 0);
}

/**
 * Verifies if the tasting box is complete based on target capacity.
 */
export function isBoxComplete(config: BoxConfig): boolean {
  return config.selectedScoops.length === config.boxSize;
}
