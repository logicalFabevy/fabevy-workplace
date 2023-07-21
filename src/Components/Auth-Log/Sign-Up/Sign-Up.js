import "./Sign-Up.css";
import logo from "../../../assets/images/fabevy-logo-landscape.png";
import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  REQUIRE_EMAIL,
  REQUIRE_LETTER,
  VALIDATOR_PASSWORD
} from "../../Validation/Validation";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const accessObj = {
    "tech_trainer":false,
    "executive_accountant":false,
    "business_development_executive":false,
    "quality_assurance_expert":false,
    "operations_executive":false,
    "creative_designer":false,
    "program_co-ordinator":false,
    "head_of_operations":false,
    "software_engineer":false,
    "software_engineer_trainee":false,
    "managing_director":false,
    "director_of_hr_operations":false,
    "admin":false
}
const SignUp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("fabtoken");
  const user = useSelector(state => state.user);
  const userAccess = user.access;
  const checkToken = ()=>{
    if(!token){
      navigate("/auth/login");
      return;
    }
    if(!userAccess.admin){
      navigate("/auth/login");
      return;
    }
  }
  useEffect(()=>{
    checkToken();
  }, [token])

  const baseURL = process.env.REACT_APP_API_URL;
  const [firstName, dispatchFirstName] = useReducer(REQUIRE_LETTER, {
    value: "",
    isValid: null,
    msg: "",
  });
  const [lastName, dispatchLastName] = useReducer(REQUIRE_LETTER, {
    value: "",
    isValid: null,
    msg: "",
  });
  const [email, dispatchEmail] = useReducer(REQUIRE_EMAIL, {
    value: "",
    isValid: null,
    msg: "",
  });
  const [role, setRole] = useState("tech_trainer");
  const [password, dispatchPassword] = useReducer(VALIDATOR_PASSWORD, {
    value: "",
    isValid: null,
    msg: "",
  });
  const [access, setAccess] = useState({...accessObj})
  const [formIsValid, setformIsValid] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const { isValid: isfName } = firstName;
  const { isValid: islName } = lastName;
  const { isValid: isEmail } = email;
  const { isValid: isPassword } = password;

  useEffect(()=>{
    setTimeout(() => {
      setIsUserCreated(false);
    }, 2000);
  }, [isUserCreated])
  //Form validate loader
  useEffect(() => {
    const identifier = setTimeout(() => {
      setformIsValid(isfName && islName && isEmail && isPassword);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [isfName && islName && isEmail && isPassword]);

  const onInputHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;
    if (name === "firstname") {
        dispatchFirstName({ type: "REQUIRELETTER", val: val, msg:"Please Enter Your First Name" });
    }
    if (name === "lastname") {
        dispatchLastName({ type: "REQUIRELETTER", val: val, msg:"Please Enter Your Last Name" });
    }
    if (name === "email") {
        dispatchEmail({ type: "EMAIL", val: val, msg: "Please Enter Your Email" });
    }
    if(name === "role"){
        setRole(val);
        setAccess({...access, [val]:true});
    }
    if (name === "password") {
      dispatchPassword({ type: "PASSWORD", val: val, msg: "Please Enter Password" });
    }
    setformIsValid(isfName && islName && isEmail && isPassword);
  };

  const onSubmitUser = async (event) => {
    event.preventDefault();
    if(formIsValid){
        let roleMerge = role.split("_").join(" ");
        const userData = {
            firstname:firstName.value,
            lastname:lastName.value,
            email:email.value,
            access:{...access},
            role:roleMerge,
            password:password.value
        }
        setIsLoad(true);
        try {
            const response = await axios.post(`${baseURL}/users/create_user/`, {...userData});
            dispatchFirstName({type:""});
            dispatchLastName({type:""});
            dispatchEmail({type:""});
            dispatchPassword({type:""});
            setRole("tech_trainer");
            setAccess({...accessObj});
            setIsLoad(false);
            setIsUserCreated(true);
        } 
        catch (err) {
            console.log(err);
            setIsLoad(false);
        }
    }
    
  };
  return (
    <section className="login-signup-section">
      <div className="container-fluid padd-lt-rt-0">
        <div className="row">
          <div className="col-md-6 padd-lt-rt-0 login-signup-img"></div>

          <div className="col-md-6 padd-lt-rt-0 center-postion">
            <div className="login-signup-container">
              {/*-- Login signup title --*/}
              <div className="login-signup-header">
                {/* <h4>Welocome To</h4> */}
                <img src={logo} alt="Fabevy" className="logo" />
                <div className="login-signup-title">
                  <p>
                    Sign Up to get in the momnent updates on the things <br />{" "}
                    that interest you.
                  </p>
                </div>
              </div>
              {/*-- Login signup title End--*/}

              {/*-- Login form --*/}
              <div className="login-sign-form-section">
                <form className="login-sign-form" onSubmit={onSubmitUser}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="First name"
                      name="firstname"
                      className="form-control"
                      value={firstName.value}
                      onChange={onInputHandler}
                    />
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    {firstName.isValid == false ? (
                    <p className="error-msg">{firstName.msg}</p>
                    ) : (
                    ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Last name"
                      name="lastname"
                      className="form-control"
                      value={lastName.value}
                      onChange={onInputHandler}
                    />
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    {lastName.isValid == false ? (
                    <p className="error-msg">{lastName.msg}</p>
                    ) : (
                    ""
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email ID"
                      name="email"
                      className="form-control"
                      value={email.value}
                      onChange={onInputHandler}
                    />
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    {email.isValid == false ? (
                    <p className="error-msg">{email.msg}</p>
                    ) : (
                    ""
                    )}
                  </div>
                  <div className="form-group">
                    <select className="form-control" name="role" value={role} onChange={onInputHandler}>
                        <option value="tech_trainer" >Tech Trainer</option>
                        <option value="executive_accountant">Executive - Accountant</option>
                        <option value="business_development_executive">Business Development Executive</option>
                        <option value="quality_assurance_expert">Quality Assurance Expert</option>
                        <option value="operations_executive">Operations Executive</option>
                        <option value="creative_designer">Creative Designer</option>
                        <option value="program_co-ordinator">Program Co-ordinator</option>
                        <option value="head_of_operations">Head of Operations</option>
                        <option value="software_engineer">Software Engineer</option>
                        <option value="software_engineer_trainee">Software Engineer Trainee</option>
                        <option value="managing_director">Managing Director</option>
                        <option value="director_of_hr_operations">Director of HR Operations</option>
                        <option value="admin">Admin</option>
                    </select>
                    <i className="fa fa-briefcase" aria-hidden="true"></i>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Create Password"
                      name="password"
                      className="form-control"
                      value={password.value}
                      onChange={onInputHandler}
                    />
                    <i className="fa fa-lock" aria-hidden="true"></i>
                    {password.isValid == false ? (
                    <p className="error-msg">{password.msg}</p>
                    ) : (
                    ""
                    )}
                  </div>
                  
                  <div className="form-group text-center">
                    {isUserCreated && <p>User has been created successfully</p>}
                  </div>
                  <div className="login-sign-form-btn">
                    <button type="submit" className="btn btn-primary" disabled={isLoad}>
                        {isLoad &&
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        }
                      Create User
                    </button>
                  </div>
                </form>
              </div>
              {/*-- Login form End--*/}

              {/*-- Sign up link --*/}
              {/* <div className="signup-link">
                                <p>Do you have an account ? <a href="#">Sign In</a></p>
                            </div> */}
              {/*-- End --*/}

              {/*-- line break --*/}
              {/* <div className="border-login-or">Or</div> */}
              {/*-- Line break end --*/}

              {/*-- Sign another account --
                            <div className="login-another-way">
                                <h4>Continue with social media</h4>
                                <div className="login-social-account">
                                <a href="#" className="fb-link"><i className="fa fa-facebook" aria-hidden="true"></i> facebook</a>
                                <a href="#" className="twit-link"><i className="fa fa-twitter" aria-hidden="true"></i> Twitter</a>
                                <a href="#" className="gmail-link"><i className="fa fa-google" aria-hidden="true"></i> Gmail</a>
                                </div>
                            </div>
                            {/*-- Sign another account end --*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
