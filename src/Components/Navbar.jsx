import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const {user} = useContext(AuthContext);

  return (
    
  <header>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
    <div className="container">
      <Link className="navbar-brand text-uppercase" to={"/"}>Albums</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="navmenu">
        
      <ul className="navbar-nav ms-auto text-uppercase">
          {/*<li className="nav-item">
            <Link className="nav-link"  to={"/about"}>About</Link>
        </li>*/}
          
          {
            user?.photoURL ?
            (<li className="nav-item">
              <Link className="nav-link" to={"/profile"}>
                <img className="rounded-circle w-25" src={user.photoURL} alt={user.displayName} />
              </Link>
            </li>):
            (<li className="nav-item">
            <Link className="nav-link" to={"/login"}>Login</Link>
             </li>)

          }


        </ul>
      </div>
    </div>
  </nav>
    </header>
  )
}

export default Navbar