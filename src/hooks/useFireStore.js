
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFireStore = (collectionName) => {
  const [docs,setDocs] = useState([]);

  useEffect(() => {
    
      const q = query(collection(projectFirestore,"images"), orderBy('createdAt','desc'));
      const unsub = onSnapshot(q, (snap) => {
        const documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id:doc.id})
        });
        setDocs(documents);
      })
    
       return () => unsub();

  },[collectionName]);

  return {docs};
}

export default useFireStore;