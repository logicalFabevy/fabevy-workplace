import { NavLink } from "react-router-dom";

const ErrorPage = ()=>{
    return (
        <div className="error-section">
            <div className="container text-center mt-5">
                <p>Sorry you don't have access for this page.</p>
                <NavLink to="/">Go to Workline</NavLink>
            </div>
            
        </div>
    )
}

export default ErrorPage;