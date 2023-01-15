import { addDoc, collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { projectFirestore, timeStamp } from '../Firebase/config';
import useStorage from '../hooks/useStorage';

const Progress = ({file,setFile}) => {

  const [progress,url,error] = useStorage(file);
  const {user}  = useContext(AuthContext);

  const showToastMessage = () => {
    toast.success('File Uploaded', {
        position: toast.POSITION.TOP_RIGHT
    });
  };

  const errorToastMessage = (message) => {
    toast.error(message,{
      position: toast.POSITION.TOP_RIGHT
    });
  }
  

  // console.log(`progress - ${progress} url - ${url}`);

  useEffect(() => {
    if(url){

      const {email, displayName, photoURL} = user;
      addDoc(collection(projectFirestore, "images"),{
        url,createdAt: timeStamp(),
        uploader: {
          profile: displayName,
          photo: photoURL,
          email: email
        }
      }).then((response) =>{
         showToastMessage();
        setFile(null);
      })

    }

    if(error){
      errorToastMessage(error)
      setFile(null);
    }

  },[setFile,url,error,user])
  

  

  return (
    <React.Fragment>

    <div className="progress">
      <motion.div className="progress-bar bg-success" role="progressbar" 
        initial={{ width: 0 }}
        animate={{ width: progress + "%"}}
        aria-valuemax="100">{Math.round(progress)}%</motion.div>
    </div>

    <ToastContainer/>
    
    </React.Fragment>
  )
}

export default Progress