import { motion } from 'framer-motion';
import React from 'react';

const Modal = ({image, setSelectedImage}) => {
  // console.log(image)
  const handleClick = (e) => {
    
    if(e.target.className !== 'modal-image'){
      setSelectedImage(null);
    }
  }
  return (
    
    image &&
    (<motion.div className="backdrop" onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
    <motion.img className="modal-image" src={image} alt='enlearged img'
      initial={{ y: '-100vh'}}
      animate={{ y: '0'}}
    />
  </motion.div>)
  )
}

export default Modal