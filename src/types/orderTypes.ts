import { Timestamp } from "firebase/firestore";

export type orderType = {
  id: string;
  orderCode: string;
  orderStatus:
    | "Pending"
    | "Awaiting Payment"
    | "Awaiting Confirmation"
    | "Awaiting Pickup"
    | "Completed"
    | "Rejected";
  totalPrice: number;
  userId: string;
  image : string | null
  dateAdded: Timestamp;
  dateUpdated: Timestamp;
};
