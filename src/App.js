import { useContext, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

/* pages */
import Login from './pages/Login';
import Main from './pages/Main';
import Profile from './pages/Profile';

/* Components */
import Navbar from './Components/Navbar';


// context
import { AuthContext } from './context/AuthContext';

function App() {

  const {user} = useContext(AuthContext);
  const [selected , setSelectedImage] = useState(null);
  
  return (
    
      <div className="App">
        <Navbar/>
        <main>
          
          <Routes>
            <Route path="/" element={<Main selected={selected} setSelectedImage={setSelectedImage}/>} />
            <Route path="/login" element={user? <Navigate to={"/"} />: <Login/>} />
            {/*<Route path="/about" element={<h1>I am about page</h1>} />*/}
            <Route path="/profile" element={user ? <Profile selected={selected} setSelectedImage={setSelectedImage} />: <Navigate to={"/"} />} />

            <Route path="*" element={<div style={{
              padding: "70px 0",
              textAlign: "center"
            }}>
              <h1>No data found</h1>
              </div>} />
          </Routes>
          
        </main>
      </div>
    
    
  );
}

export default App;
