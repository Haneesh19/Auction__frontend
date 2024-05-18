import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = ({children}) => {


  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');


  const [productSearch, setProductSearch] = useState('');





  const handleSearch = () =>{
    navigate('#products-body')
  }


  
  
  
  const login = async () =>{
    try{
      const loginInputs = {email, password}
        await axios.post('https://auction-backend-weeb.onrender.com/login', loginInputs)
        .then( async (res)=>{

          localStorage.setItem('userId', res.data._id);
            localStorage.setItem('userType', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);
            if(res.data.usertype === 'customer'){
                navigate('/');
            } else if(res.data.usertype === 'seller'){
              navigate('/seller');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }
          }).catch((err) =>{
            alert("login failed!!");
            console.log(err);
          });    
        }catch(err){
          console.log(err);
        }
      }

      
  const inputs = {username, email, usertype, password};

  const register = async () =>{
    try{
        await axios.post('https://auction-backend-weeb.onrender.com/register', inputs)
        .then( async (res)=>{
            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('userType', res.data.usertype);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('email', res.data.email);

            if(res.data.usertype === 'customer'){
                navigate('/');
            } else if(res.data.usertype === 'seller'){
              navigate('/seller');
            } else if(res.data.usertype === 'admin'){
                navigate('/admin');
            }
        }).catch((err) =>{
            alert("registration failed!!");
            console.log(err);
        });
    }catch(err){
        console.log(err);
    }
  }



  const logout = async () =>{
    
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    
    navigate('/');
  }



  return (
    <GeneralContext.Provider value={{login, register, logout, username, setUsername, email, setEmail, password, setPassword, usertype, setUsertype, productSearch, setProductSearch, handleSearch}} >{children}</GeneralContext.Provider>
  )
}

export default GeneralContextProvider