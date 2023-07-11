import "./Sidenav.css";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidenave = (props) => {
  const user = useSelector((state) => state.user);
  const userAccess = user.access;
  // console.log(userAccess)
  return (
    <div className="sidenav-bar">
      <h1 className="side-logo">
        <a href="#" className="logo">
          <img src={logo} alt="fabevy" />
        </a>
      </h1>

      {/* Side nav links */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navitem">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
              end
            >
              <i className="fa fa-briefcase" aria-hidden="true"></i>{" "}
              <span>Work Line</span>
            </NavLink>
          </li>

          <li className="navitem">
            <NavLink
              to="timesheet"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
              <span>Time Sheet</span>
            </NavLink>
          </li>
          <li className="navitem">
            <NavLink
              to="studentbatch"
              className={({ isActive }) =>
                isActive ? "navlink active" : "navlink"
              }
            >
              <i className="fa fa-graduation-cap" aria-hidden="true"></i>{" "}
              <span>Student Batch</span>
            </NavLink>
          </li>
          {(userAccess.admin ||
            userAccess.managing_director ||
            userAccess.director_of_HR_operations ||
            userAccess.head_of_operations ||
            userAccess.business_development_executive) && (
            <li className="navitem ">
              <NavLink
                to="webinar"
                className={({ isActive }) =>
                  `navlink ${isActive ? "active" : ""}`
                }
                
              >
                <i className="fa fa-bookmark" aria-hidden="true"></i>{" "}
                <span>Webinar</span>
              </NavLink>
              
            </li>
          )}

          {userAccess.admin && (
            <li className="navitem">
              <NavLink
                to="create-user"
                className={({ isActive }) =>
                  isActive ? "navlink active" : "navlink"
                }
              >
                <i className="fa fa-users" aria-hidden="true"></i>{" "}
                <span>Create User</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidenave;
