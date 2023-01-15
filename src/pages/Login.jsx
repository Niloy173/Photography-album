import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from "../Firebase/config";



const Login = () => {

  const {dispatch} = useContext(AuthContext);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

    if(result){
      const {displayName, photoURL, email} = result.user;
      
      dispatch({
        type: 'LOGIN_STATE',
        payload: {displayName, photoURL, email}
      })
    }
    } catch (error) {
      console.log(error);
    }
  }
 
 


  return (
    
    <section className='py-5 text-center container mt-5'>
    
    <div className="row py-lg-5">

    <h1 className="text-uppercase fw-bold">All Pictures</h1>
    
    <p className="lead text-muted my-3">
    What do we feel when we look at a good photograph? We just want to be there, 
    right at the exact moment that photo taken!
    </p>
      
    <div className="col-md-12 mx-auto">
        
      <button
       type="button"
       onClick={googleSignIn}
       className="btn btn-lg btn-google btn-block text-uppercase btn-outline-dark">
        
        <img alt='google' src="https://img.icons8.com/color/16/000000/google-logo.png" /> Signup Using Google</button>

      </div>
    </div>
    
    </section>
  )
}

export default Login