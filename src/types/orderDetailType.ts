import { Timestamp } from "firebase/firestore";

export type orderDetailType = {
  id: string;
  orderCode: string;
  productId: string;
  quantity: number;
  price: number;
  dateAdded: Timestamp;
  dateUpdated: Timestamp;
};