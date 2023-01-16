import { motion } from 'framer-motion';
import Loading from '../assets/loading.svg';
import useFireStore from "../hooks/useFireStore";

const Gallery = ({setSelectedImage}) => {


  const {docs} = useFireStore("images")
  

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
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1}}
            className="d-flex position-absolute text-white align-items-center justify-content-start  profile_overlay">

              <div className="w-25 mx-3">
               <img className="rounded-circle m-1  profile_image w-100 border" src={doc.uploader["photo"]} alt="user" />
              </div>
              
              <div className="d-flex flex-column">
                <h4 className="profile_name lead fs-4 fw-bolder mb-0">{doc.uploader["profile"]}</h4>
                <span className="fs-6">{doc.createdAt?.toDate().toDateString()}</span>
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
  </div>
  )
}

export default Gallery