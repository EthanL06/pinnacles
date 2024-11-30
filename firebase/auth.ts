import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async (email: string, password: string) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred;
  } catch (e) {
    throw new Error("Failed to sign in");
  }
};

export const isSignedIn = () => {
  return auth.currentUser !== null;
};
