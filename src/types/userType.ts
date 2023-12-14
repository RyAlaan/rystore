import { Timestamp } from "firebase/firestore";

export type userType = {
  email: string;
  fullname: string;
  role: string;
  address?: string;
  firstName: string;
  lastName: string;
  image?: string;
  id: string;
  password: string;
  phone?: string;
  dataAdded?: Timestamp;
  dataUpdated?: Timestamp;
};