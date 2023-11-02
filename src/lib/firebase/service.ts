import app from "./init";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import bcrypt from "bcryptjs";
import { userType } from "@/types/userType";
import { productType } from "@/types/productType";
import { cartType } from "@/types/cartType";

const firestore = app;

// CREATE
export async function createData(
  collectionName: string,
  { data }: { data: productType },
  callback: Function
) {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      ...data,
      dataAdded: serverTimestamp(),
      dataUpdated: serverTimestamp(),
    });
    callback({ statusCode: 200, message: "Register success", data: docRef });
  } catch (error : any) {
    callback({ statusCode: 500, message: error.message, data: null });
  }
}

export async function singUp(userData: userType, callback: Function) {
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
    callback({ statusCode: 400, message: "Email already exists", data: null });
  } else {
    // hashing password using bcrypt
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";

    const data = await addDoc(collection(firestore, "users"), {
      ...userData,
      dataAdded: serverTimestamp(),
      dataUpdated: serverTimestamp(),
    })
      .then(() => {
        callback({ statusCode: 200, message: "Register success", data: data });
      })
      .catch((error: any) => {
        callback({ statusCode: 500, message: error.message, data: null });
      });
  }
}

// READ
export async function retrieveData(collectionName: string, callback: Function) {
  const q = query(
    collection(firestore, collectionName),
    // where("isDiscount", "==", true)
    // where("stock", ">", 0)
  );
  
  const snapshot = await getDocs(q);

    // .filter((doc)=> doc.data().stock > 0)

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    callback({ statusCode: 200, message: "Data found successfuly", data });
  } else {
    callback({ statusCode: 404, message: "Data not found", data: null });
  }
}

export async function retrieveDataById(
  collectionName: string,
  id: string,
  callback: Function
) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = {
    id: id,
    ...snapshot.data(),
  };

  if (data) {
    callback({ statusCode: 200, message: "Data found successfuly", data });
  } else {
    callback({ statusCode: 404, message: "Data not found", data: null });
  }
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

export async function getCartData(userId: string, callback: Function) {
  try {
    const cartQuery = query(
      collection(firestore, "cart"),
      where("userId", "==", userId)
    );
    const cartSnapshot = await getDocs(cartQuery);
    const cartData = cartSnapshot.docs.map((cartDoc) => ({
      id: cartDoc.id,
      ...cartDoc.data(),
    })as cartType);

    if (cartData.length === 0) {
      callback({ statusCode: 404, message: "You have no items in your cart", data: null });
      return;
    }

    const productIds = cartData.map((cartItem) => cartItem.productId);
    const productData = [];

    for (const productId of productIds) {
      const productDocRef = doc(firestore, "products", productId);
      const productSnapshot = await getDoc(productDocRef);
      const product = {
        id: productId,
        ...productSnapshot.data(),
      };
      productData.push(product);
    }

    callback({
      statusCode: 200,
      message: "Data found successfully",
      data: { cartData, productData },
    });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    callback({ statusCode: 500, message: "Internal server error", data: null });
  }
}

// UPDATE
export async function updateDataById(
  collectionName: string,
  id: string,
  data: { data: userType } | { data: productType },
  callback: Function
) {
  console.log(collectionName);
  console.log(id);
  console.log(data);
  try {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const dataRef = snapshot.data();

    if (dataRef) {
      const updateData = {
        ...data,
        dataUpdated: serverTimestamp(),
      };

      console.log(updateData);

      await updateDoc(doc(firestore, collectionName, id), updateData).then(
        () => {
          callback({
            statusCode: 200,
            message: "Data updated successfully",
            data: updateData,
          });
        }
      );
    } else {
      callback({ statusCode: 404, message: "Data not found", data: null });
    }
  } catch (error) {
    callback({
      statusCode: 500,
      message: "Error updating document : " + error,
      data: null,
    });
  }
}

// DELETE
export async function deleteDataById(
  collectionName: string,
  id: string,
  callback: Function
) {
  try {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();

    if (data) {
      await deleteDoc(doc(firestore, collectionName, id));
      callback({
        statusCode: 200,
        message: "Data deleted successfully",
        data: null,
      });
    } else {
      callback({ statusCode: 404, message: "Data not found", data: null });
    }
  } catch (error) {
    callback({
      statusCode: 500,
      message: "Error updating document : " + error,
      data: null,
    });
  }
}

