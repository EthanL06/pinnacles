import { Resource } from "@/types";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { ReviewingResource } from "@/types/Resource";

const REVALIDATE_TIME = 1000 * 60 * 60;

export const addResourceToReview = async (resource: Resource) => {
  try {
    const { id } = await addDoc(collection(db, "review"), resource);
    return id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
};

export const removeResourceFromReview = async (docId: string, add: boolean) => {
  try {
    const docRef = doc(db, "review", docId);
    const docSnap = await getDoc(docRef);

    if (add && docSnap.exists()) {
      addResource(docSnap.data() as Resource);
    }

    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

export const fetchReviewingResources = async () => {
  try {
    const q = query(collection(db, "review"), orderBy("title"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as ReviewingResource,
    );
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};

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
    const q = query(collection(db, "resources"), orderBy("title"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as Resource);
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};
