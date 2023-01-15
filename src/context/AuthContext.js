import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const InitialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
}


const AuthContext = createContext();


const AuthContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(Reducer,InitialState);
 
  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(state.user))
  },[state.user])
  

  return <AuthContext.Provider value={{ 
   
    user: state.user, 
    dispatch 
  }}>
    {children}
  </AuthContext.Provider>
}

export {
  AuthContextProvider,
  AuthContext
};

