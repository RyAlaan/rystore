import { Timestamp } from "firebase/firestore";

export type orderType = {
  id: string;
  orderCode: string;
  userId: string;
  orderStatus:
    | "Awaiting Payment"
    | "Awaiting Confirmation"
    | "Awaiting Pickup"
    | "Completed"
    | "Rejected";
  totalPrice: number;
  image: string | null;
  dateAdded: Timestamp;
  dateUpdated: Timestamp;
};
