import { initializeApp, FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2dwJv82pIqdjq7Mez5Yn8r_-9uxNnEuU",
  authDomain: "rystore-eae2d.firebaseapp.com",
  projectId: "rystore-eae2d",
  storageBucket: "rystore-eae2d.appspot.com",
  messagingSenderId: "610908197214",
  appId: "1:610908197214:web:5842c344bc102a2f153fcf",
};

// Inisialisasi Firebase
const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const app: Firestore = getFirestore(firebaseApp);
export const storage  = getStorage(firebaseApp);

export default app;
