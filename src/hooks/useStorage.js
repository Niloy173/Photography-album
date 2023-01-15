
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { projectStorage } from "../Firebase/config";

const useStorage = (file) => {
  
  const [progress,setProgress] = useState(0);
  const [error,setError] = useState(null);
  const [url,setUrl] = useState(null);


  useEffect(()=> {

    const storageRef = ref(projectStorage,file.name);
    const updateTask = uploadBytesResumable(storageRef,file);

    updateTask.on('state_changed',(snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, () => {

      getDownloadURL(updateTask.snapshot.ref).then((url) => {
        setUrl(url);
      });
     
     
  
      
    })

  },[file])

  return [progress,url,error]
}

export default useStorage;