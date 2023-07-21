import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Auth from './Components/Auth-Log/Auth/Auth';
import LoginPage from './Components/Auth-Log/Login-Page/Login-Page';
import Webinar from "./Components/Portal/Leads/Webinar";
import MainWrapper from './Components/Portal/Main-Wrapper/Main-Wrapper';
import Workline from './Components/Portal/Workline/Workline';
import Timesheet from './Components/Portal/Timesheet/Timesheet';
import Studentbatch from './Components/Portal/Studentbatch/Studentbatch';
import CreateUser from './Components/Portal/Create-User/Create-User';
import CourseCertificate from './Components/Portal/Course-Certificate/Course-Certificate';
import ErrorPage from './Components/Portal/Error-Page/Error-Page';

function App() {

  if(window.location.pathname.includes("/")){
    window.history.replaceState(
      "",
      "",
      "/workline"
    );
  }

  return (
    
      <BrowserRouter basename={'/'}>
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="create-user" element={<CreateUser />} />  */}
          </Route>
          <Route path="/" element={<MainWrapper  />}>
            <Route path="workline" element={<Workline />} />
            <Route path="timesheet" element={<Timesheet />} />  
            <Route path="studentbatch" element={<Studentbatch />} />  
            <Route path="webinar" element={<Webinar />} /> 
            <Route path="create-user" element={<CreateUser />} />  
            <Route path="course-certificate" element={<CourseCertificate />} />  
          </Route>
          <Route path="error-page" element={<ErrorPage />} />  
        </Routes>
      </BrowserRouter>
  );
}

export default App;
