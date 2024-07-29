import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth as Auth, email, password);
};

export { doSignInWithEmailAndPassword };
