import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const {user} = useContext(AuthContext);

  return (
    
  <header>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 fixed-top">
    <div className="container">
      <a className="navbar-brand text-uppercase" href="/">Albums</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
        <span className="navbar-toggler-icon"></span>
      </button>
    <div className="collapse navbar-collapse" id="navmenu">
        
      <ul className="navbar-nav ms-auto text-uppercase">
          {/*<li className="nav-item">
            <a className="nav-link"  href="/about">About</a>
        </li>*/}
          
          {
            user?.photoURL ?
            (<li className="nav-item">
              <a className="nav-link" href="/profile">
                <img className="rounded-circle w-25" src={user.photoURL} alt={user.displayName} />
              </a>
            </li>):
            (<li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
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