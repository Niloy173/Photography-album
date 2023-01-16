import { motion } from 'framer-motion';


/* react files, component, context, custom hooks or modules  */
import React, { useContext } from 'react';
import { toast, ToastContainer } from "react-toastify";
import Modal from '../Components/Modal';
import { AuthContext } from '../context/AuthContext';
import useFireStore from '../hooks/useFireStore';


/* svg file */
import Waiting from "../assets/waiting.svg";


/* firebase file or modules */
import { deleteDoc, doc } from 'firebase/firestore';
import { projectFirestore } from '../Firebase/config';

const Profile = ({selected,setSelectedImage}) => {

  const {user} = useContext(AuthContext);
  const {docs} = useFireStore("images", user.email);

  const errorToastMessage = (message) => {
    toast.error(message,{
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const successToastMessage = () => {
    toast.success("Deleted Successfully !",{
      position: toast.POSITION.TOP_RIGHT
    });
  }
  

  const handleDelete = (id) => {
    // console.log(id)
    deleteDoc(doc(projectFirestore, "images",id))
    .then((response) => {
      console.log('file deleted successfully')
      successToastMessage()
    })
    .catch((error) => {
      errorToastMessage(error);
    })
   
  }
  
  return (

    <React.Fragment>
    
    <section className="py-5 text-center container mt-5">
    
      <div className="row py-md-3 py-lg-5">
      
        <div className="col-lg-6 col-md-8 mx-auto">
        
          <h2 className="text-uppercase lead fs-2">User Profile</h2>

          <img className="w-25 rounded-circle border-2 mb-4 mt-2" src={user.photoURL} alt={user.displayName} />
          <p className="fs-4 mb-2">{user.displayName}</p>
          <p className="text-muted fs-4 mb-2">{user.email}</p>
        
        </div>
      
      </div>


    </section>

    <div className="gallery py-5 bg-light">
      
        <div className="container">
        
          <div className="row">

          {
            docs.length > 0 ? docs.map((doc) => (


          <motion.div key={doc.id} id={doc.id}  className="col-md-6 col-lg-4 position-relative"
              layout>
              <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1}}
              src={doc.url}
              className="w-100 rounded-3 shadow-1 mb-4 cover"
              alt="gallery"
              />
  
  
              <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1}}
              className="d-flex justify-content-center position-absolute button_div">
  
                <button type="button" 
                onClick={() => setSelectedImage(doc.url)}
                className="btn btn-primary btn-block mx-2 text-uppercase">
                full image</button>
                
                <button type="button" 
                // data-bs-toggle="modal"
                // data-bs-target="#modal"
                className="btn btn-dark btn-block text-uppercase"
                onClick={() => handleDelete(doc.id)} 
                >delete</button>

              
  
          </motion.div>

      {/* Modal  */}
      {/*<div  className="modal"  id="modal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Photography Album</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
            <div className="modal-body">
                <p>Are you sure you want to delete this?</p>
              </div>
             <div className="modal-footer">
                <button type="button" className="btn btn-danger text-uppercase" data-bs-dismiss="modal">Cancel</button>
                <button onClick={() => handleDelete(doc.id)} type="button" className="btn btn-success text-uppercase">Yes</button>
              </div>
          </div>
        </div>
            </div>*/}
                
    {/* Modal  */}
    
    </motion.div>


    )):

    (<div className="d-sm-flex flex-column-reverse justify-content-center align-items-center g-3">
          
                <img className="my-4 loading" src={Waiting} alt="waiting" />
               
    </div>)}
            
            
      </div>
    </div>
  </div>

  <Modal image={selected} setSelectedImage={setSelectedImage} />

  <ToastContainer/>
  </React.Fragment>
  )
}

export default Profile