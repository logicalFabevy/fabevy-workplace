import "./OffcanvasBox.css";
import React from "react";
const OffcanvasBox = (props) =>{
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id={props.showid} aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">{props.title}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {props.children}
            </div>
        </div>
    )
}

export default OffcanvasBox;