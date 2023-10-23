<<<<<<< HEAD
export type formType = {
    user_id: string;
    product_id: string;
    quantity: number;
    total_price: number;
=======
import { Timestamp } from "firebase/firestore";

export type cartType = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    dateAdded: Timestamp;
    dateUpdated: Timestamp;
>>>>>>> e021d6b3ba4743aa516eae5240461f5bf47339f2
};
