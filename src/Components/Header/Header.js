import "../../assets/css/font-awesome.min.css";
import "./Header.css";
import ContainerFluid from "../Container/Container-fluid";
import Flexbox from "../Flexbox/Flexbox";
import Col from "../Flexbox/Col";
import userPic from "../../assets/images/user-img.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Header = (props) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const userData = user.item;
    const onLogOut = (event) =>{
        localStorage.removeItem("fabtoken");
        navigate("/auth/login");
    }
    return (
        <header className="header-nav">
            <ContainerFluid>
                <Flexbox>
                <Col lg={5} className="d-flex">
                    <div className="navbar-action">
                    <div className="bar-btn">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    </div>
                    <div className="header-search">
                    <input
                        type="search"
                        placeholder="Search"
                        className="search-top"
                    />
                    </div>
                </Col>
                <Col lg={7}>
                    <div className="header-actions d-flex justify-content-end">
                        <div className="user-nav dropdown d-flex align-items-center">
                            <div className="user-nav-info"> 
                                <h2>{userData.firstname} {userData.lastname}</h2>
                                <h4>{userData.role}</h4>
                            </div>
                            <div
                            className="user-box dropdown-toggle"
                            id="dropdownProfile"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                                <img src={userPic} alt="user picture" className="user-pic" />
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownProfile">
                                
                                <Link className="user-nav-link" to="">
                                    <i className="fa fa-user-o" aria-hidden="true"></i> My Profile
                                </Link>
                                <Link className="user-nav-link" to=""><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Profile</Link>
                                <Link className="user-nav-link" to=""><i className="fa fa-shield" aria-hidden="true"></i> Activity</Link>
                                <Link className="user-nav-link" onClick={onLogOut} to="#"><i className="fa fa-sign-out" aria-hidden="true"></i> Sing Out</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                </Flexbox>
            </ContainerFluid>
        </header>
    );
};

export default Header;
