import './App.css';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import ContainerFluid from './Components/Container/Container-fluid';
import Sidenave from './Components/Sidenav/Sidenav';
import Header from './Components/Header/Header';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetUserData, fetchUserData } from './Rdxstore/user-slice';

function App() {
  const baseURL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("fabtoken");
  const navigate = useNavigate();
  const [isLogged, setIslogged] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user)

  const checkIslogged = () =>{
    if(!token){
      setIslogged(false);
      navigate("/auth/login");
      return;
    }
    setIslogged(true);
    dispatch(fetchUserData());
  }

  useEffect(()=>{
    checkIslogged();
    if(userData.isExpired){
        navigate("/auth/login");
    }
  }, [token, isLogged])


  return (
    isLogged && !userData.loading && <ContainerFluid className="p-0">
          <Header />
          <section className='d-flex'>
              <Sidenave />
              <div className='main-wrapper'>
                  <div className="main-wrap">
                    <Outlet /> 
                  </div>
              </div>
          </section>
      </ContainerFluid>
  );
}

export default App;
