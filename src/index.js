import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './Rdxstore/rdx-store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Workline from './Components/Portal/Workline/Workline';
import Timesheet from './Components/Portal/Timesheet/Timesheet';
import Studentbatch from './Components/Portal/Studentbatch/Studentbatch';
import Webinar from './Components/Portal/Leads/Webinar';
import Auth from './Components/Auth-Log/Auth/Auth';
import LoginPage from './Components/Auth-Log/Login-Page/Login-Page';
import CreateUser from './Components/Portal/Create-User/Create-User';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter basename={'/'}>
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="create-user" element={<CreateUser />} />  */}
          </Route>
          <Route path="/" element={<App />}>
            <Route path="workline" element={<Workline />} />
            <Route path="timesheet" element={<Timesheet />} />  
            <Route path="studentbatch" element={<Studentbatch />} />  
            <Route path="webinar" element={<Webinar />} />  
            <Route path="create-user" element={<CreateUser />} />  
          </Route>
        </Routes>
      </BrowserRouter>
      
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
