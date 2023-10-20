import { Timestamp } from "firebase/firestore";

export type cartType = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    dateAdded: Timestamp;
    dateUpdated: Timestamp;
};
