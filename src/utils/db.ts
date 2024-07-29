import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const getAllDocuments = async (collectionName: string) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

const getDocumentDetail = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      console.error("Document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting document details: ", error);
    throw error;
  }
};

export { getAllDocuments, getDocumentDetail };
