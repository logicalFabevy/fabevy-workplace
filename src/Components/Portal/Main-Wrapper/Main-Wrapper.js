import { Outlet, useNavigate } from "react-router";
import ContainerFluid from "../../Container/Container-fluid";
import Sidenave from "../../Sidenav/Sidenav";
import Header from '../../Header/Header';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../Rdxstore/user-slice";

const MainWrapper = () =>{
    const token = localStorage.getItem("fabtoken");
  const navigate = useNavigate();
  const [isLogged, setIslogged] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.user);

  const checkIslogged = () =>{
    if(!token){
      setIslogged(false);
      navigate("/auth/login");
      return;
    }
    setIslogged(true);
  }
  
  useEffect(()=>{
    checkIslogged();
    dispatch(fetchUserData());
    if(userData.isExpired){
      navigate("/auth/login");
      localStorage.removeItem("fabtoken");
    }
  }, [token, isLogged, userData.isExpired])

    return(
        isLogged && !userData.loading &&
        <ContainerFluid className="p-0">
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
    )
}

export default MainWrapper;