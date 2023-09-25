import app from "./init";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

// Get spesified Firestore collection using its document ID
// The parameters collectionName and id specify the name of the collection and the ID of the document to retrieve.
export async function retrieveDataById(collectionName: string, id: string) {
  // It uses the getDoc function to retrieve a snapshot of the specified document.
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  console.log(data);

  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    throw new Error("user not found");
  }
}

export async function singUp(
  userData: {
    email: string;
    fullname?: string;
    address?: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: string;
  },
  callback: Function
) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // check id the email already exists
  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    // hashing password using bcrypt
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";

    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Register success" });
      })
      .catch((error) => {
        callback({ status: false, message: error.message });
      });
  }
}

export async function update(
  userData: {
    email: string;
    fullname?: string;
    address?: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: string;
  },
  callback: Function
) {}