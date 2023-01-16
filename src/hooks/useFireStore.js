
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { projectFirestore } from "../Firebase/config";

const useFireStore = (collectionName, queryText=null) => {
  const [docs,setDocs] = useState([]);

  useEffect(() => {

      let q;
    
      if(queryText){
        q = query(collection(projectFirestore,collectionName), where("uploader.email", '==', queryText));
      }else{
        q = query(collection(projectFirestore,collectionName), orderBy('createdAt','desc'));
      }
      const unsub = onSnapshot(q, (snap) => {
        const documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id:doc.id})
        });
        setDocs(documents);
      })
    
       return () => unsub();

  },[collectionName,queryText]);

  return {docs};
}

export default useFireStore;