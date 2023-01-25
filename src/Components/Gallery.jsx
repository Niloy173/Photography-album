import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { BsDownload } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../assets/loading.svg';
import { AuthContext } from '../context/AuthContext';
import useFireStore from "../hooks/useFireStore";

const Gallery = ({setSelectedImage}) => {


  const {docs} = useFireStore("images")
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const errorToastMessage = (message) => {
    toast.error(message,{
      position: toast.POSITION.TOP_RIGHT
    });
  }

  const downloadImage = async (imageUrl) => {
    try {

      if(user){
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        saveAs(blob, 'download-image.jpg');
      }else{
        navigate("/login");
      }
      
    } catch (error) {
      console.log(error);
      errorToastMessage(error);
    }
  }
  

  return (
    <div className="gallery py-5 bg-light">
    
      <div className="container">

      <div className="row">

      {
        docs.length > 0 ? docs.map((doc) =>(

          (
            <motion.div key={doc.id} className="col-md-6 col-lg-4 position-relative image_container"
            layout
            whileHover={{ opacity:1}}  
            onClick={() => setSelectedImage(doc.url)}
            >
            <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1}}
            src={doc.url}
            className="w-100 rounded-3 shadow-1 mb-4 cover"
            alt="gallery"
            />

            <motion.span 
            
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1}}
             onClick={() => downloadImage(doc.url)} title='download' 
             className='position-absolute download'>{<BsDownload/>}
             
            </motion.span>

            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1}}
            className="d-flex position-absolute text-white align-items-center justify-content-start  profile_overlay">

              <div className="w-25 mx-3">
               <img className="rounded-circle m-1  profile_image w-100 border" src={doc.uploader["photo"]} alt="user" />
              </div>
              
              <div className="d-flex flex-column">
                <h4 className="profile_name lead fs-5 fw-bolder mb-0 w-auto">{doc.uploader["profile"].replace(/[^a-zA-Z]/g,' ')}</h4>
                <span className="fs-6 lead">{doc.createdAt?.toDate().toDateString()}</span>
              </div>
              

            </motion.div>
            <span className="center">Click to view full image</span>
          </motion.div>
          )

        )):
        (<div className="d-sm-flex flex-column-reverse justify-content-center align-items-center g-3">
          
          <img className="my-4 loading" src={Loading} alt="loading" />
          <h3 className="lead fs-2 text-dark text-center mb-5">Loading Images</h3>
        </div>)

      }

       
      
    </div>

      
    </div>

    <ToastContainer/>
  </div>
  )
}

export default Gallery