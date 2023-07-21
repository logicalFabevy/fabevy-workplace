import "./Login-Page.css"
import logo from "../../../assets/images/fabevy-logo-landscape.png";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
    REQUIRE_EMAIL,
    VALIDATOR_REQUIRE,
  } from "../../Validation/Validation";

const LoginPage = () =>{
    const baseURL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate()
    const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
        value: "",
        isValid: null,
        msg:""
    });
    
    const [password, dispatchPassword] = useReducer(VALIDATOR_REQUIRE, {
        value: "",
        isValid: null,
        msg: ""
    });
    
    const [isLoadData, setIsLoadData] = useState(false);
    const [remember, setRemember] = useState(false);
    const [formIsValid, setformIsValid] = useState(false);
    const [logErr, setLogErr] = useState(null);
    const { isValid: isEmail } = email;
    const { isValid: isPassword } = password;

    //Load remember me field
    useEffect(()=> {
        let setRemeberEmail = localStorage.getItem("rememberEmail");
        if(setRemeberEmail){
            dispatchEmail({ type: "EMAIL", val: setRemeberEmail, msg: "Please Enter Email"});
            setRemember(true);
        }
    }, [remember])

    //set remember email & password
    const setRememberme = (event)=>{
        setRemember((current) => !current);
        if(event.target.checked){
            localStorage.setItem("rememberEmail", email.value);
        }else{
            localStorage.removeItem("rememberEmail");
        }
    }

    //Form validation ---------------------------///
    useEffect(() => {
        const identifier = setTimeout(() => {
        setformIsValid(isEmail && isPassword);
        }, 500);
        return () => {
        clearTimeout(identifier);
        };
    }, [isEmail && isPassword]);

    const onInputHandler = (event) => {
        const name = event.target.name;
        const val = event.target.value;
        if (name === "user_email") {
            dispatchEmail({ type: "EMAIL", val: val, msg: "Please Enter Email"});
        }
        if (name === "user_password") {
            dispatchPassword({ type: "REQUIRE", val: val, msg:"Please Enter Password" });
        }
        setformIsValid(isEmail && isPassword);
    }
    const onLogin = async(event)=>{
        event.preventDefault();
        dispatchEmail({ type: "EMAIL", val: email.value, msg: "Email ID field cannot be Empty"});
        dispatchPassword({ type: "REQUIRE", val: password.value, msg: "Password field cannot be empty"});
        if (formIsValid) {
            const getUserPassword = {
              email: email.value,
              password: password.value,
            };
            setIsLoadData(true);
            try{
                const response = await axios.post(`${baseURL}/users/login/`, getUserPassword)
                const data = response.data;
                // console.log(data);
                if(data.status === 402){
                    setIsLoadData(false);
                    setLogErr(data.type);
                    setTimeout(()=>{
                        setLogErr(null)
                    }, [3000])
                    return;
                }
                localStorage.setItem("fabtoken", data.jwt);
                navigate("/workline");
                setIsLoadData(false);
            }
            catch(err){
                // console.log(err);
                const data = err.response
                setIsLoadData(false);
                if(data.status == 402){
                    setLogErr(data.data.type);
                    setTimeout(()=>{
                        setLogErr(null)
                    }, [3000])
                }
            }
        }
        
    }


    return (
        
            <div className="container-fluid d-flex p-0">
                <div className="left-side">
                    <div className="form-container">
                        <img src={logo} alt="Fabevy workplace" className="login-logo"/>
                        {/* <h2>Login to <span>Workplace</span></h2> */}
                        <p className="">Log in to get in the momnent updates on the things <br/>that interest you.</p>
                        {logErr && <p className="alert alert-danger" role="alert">{logErr}</p>}
                        <form onSubmit={onLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email Id</label>
                                <input id="email" className="form-inputs" name="user_email" type="email" placeholder="Your Email" value={email.value} onChange={onInputHandler}  />
                                {email.isValid == false ? (
                                    <p className="error-msg">{email.msg}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="pswd">Password</label>
                                <input id="pswd" className="form-inputs" name="user_password" type="password" placeholder="Your Password" value={password.value} onChange={onInputHandler} />
                                {password.isValid == false ? (
                                    <p className="error-msg">{password.msg}</p>
                                ) : (
                                    ""
                                )}
                            </div>
                            
                            <div className="check">
                                <div className="checkbox d-flex align-items-center">
                                    <input id="check" type="checkbox" /> <label htmlFor="check">Remember me</label>
                                </div>
                                {/* <div className="passwd">
                                    <a href="">Forgot Password</a>
                                </div> */}
                            </div>
                            <button type="submit" className="btn btn-login" disabled={isLoadData}>
                                {isLoadData &&
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                }
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
                <div className="right-side">
                    <div className="img"></div>
                </div>
            </div>
        
       
    )
}

export default LoginPage;