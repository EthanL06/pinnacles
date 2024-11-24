import { Resource } from "@/types";
import { db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const addResource = async (resource: Resource) => {
  try {
    const docRef = await addDoc(collection(db, "resources"), resource);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    // Return an array of OGTags
    return querySnapshot.docs.map((doc) => doc.data() as Resource);
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};
