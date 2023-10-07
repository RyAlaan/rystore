export type productType = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  rating: number;
  people: number;
  isDiscount?: boolean;
  discount?: number;
  sizes?: string[];
};
