import React, { useContext, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import Gallery from '../Components/Gallery';
import Modal from '../Components/Modal';
import Progress from '../Components/Progress';
import { AuthContext } from '../context/AuthContext';

const Main = () => {

  const [file,setFile] = useState(null);
  const [selected , setSelectedImage] = useState(null);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  const {user} = useContext(AuthContext);
  // console.log(user);


  const errorToastMessage = (message) => {
    toast.error(message,{
      position: toast.POSITION.TOP_RIGHT
    });
  }
  
  const ChangeHandler = (e) => {
    let selected = e.target.files[0];
    
    if(selected && types.includes(selected.type)){
      setFile(selected);
      // console.log(file);
    }else{
      setFile(null);
      errorToastMessage('Invalid file type');
    }
  }




  return (

    <React.Fragment>
    
    <section className="py-5 text-center container mt-5">
      
      <div className="row py-md-3 py-lg-3">
        
        <div className="col-lg-6 col-md-8 mx-auto">
        
        <h1 className="text-uppercase fw-bold">All Pictures</h1>
        <p className="lead text-muted">That frame of mind that you need to make fine pictures of a very wonderful subject; you cannot do it by not being lost yourself</p>

        {
          user && 
          (<div className="mb-2 my-2">
          <form>
            <label htmlFor="formFile" className="form-label cursor"><AiOutlinePlusCircle className="fs-3"/></label>
            <input onChange={ChangeHandler} disabled={file && true}
            className="form-control d-none" type="file" id="formFile" />
          </form>
        </div>)
        }

        <p className='lead text-muted'>
          {file && file.name}
        </p>

        {
          file && 
          (<Progress file={file} setFile={setFile} />)
        }

        </div>
        

      </div>

      
      
    </section>

    <Gallery setSelectedImage={setSelectedImage}/>
    <Modal image={selected} setSelectedImage={setSelectedImage} />

    <ToastContainer/>

    </React.Fragment>
  )
}

export default Main;