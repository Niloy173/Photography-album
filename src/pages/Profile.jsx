import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../Firebase/config';

const Profile = () => {

  const {dispatch,user} = useContext(AuthContext);
  
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT_STATE' });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <section className="py-5 text-center container mt-5">
    
      <div className="row py-md-3 py-lg-5">
      
        <div className="col-lg-6 col-md-8 mx-auto">
        
          <h2 className="text-uppercase lead fs-2">User Profile</h2>

          <img className="w-25 rounded-circle border-2 mb-4 mt-2" src={user.photoURL} alt={user.displayName} />
          <p className="fs-4 mb-2">{user.displayName}</p>
          <p className="text-muted fs-4 mb-2">{user.email}</p>

          <button className="mt-2 p-2" type="button" onClick={handleLogOut}>Logout</button>
        
        </div>
      
      </div>

    </section>
  )
}

export default Profile