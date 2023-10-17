import { Timestamp } from "firebase/firestore";

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
  dataAdded?: Timestamp;
  dataUpdated?: Timestamp;
  category: "camera" | "cellphone" | "computer" | "gamepad" | "headphone" | "smartwatch";
};
