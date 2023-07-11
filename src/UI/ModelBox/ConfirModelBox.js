import React from 'react';
import  ReactDOM  from 'react-dom/client';
import './ConfirModelBox.css';

export const ConfirmAlertBx = (props)=>{
    document.body.classList.add("react-confirmBx");
    const divConfirm = document.createElement("div");
    divConfirm.setAttribute("id", "confirmBx-body");
    divConfirm.setAttribute("class", "model-bx active");
    document.body.appendChild(divConfirm);
    const root = (0, ReactDOM.createRoot)(divConfirm);
    root.render(<ConfirModelBox data={props} />);

}

const removeConfirmBx = (action)=>{
    const confirmBx = document.getElementById("confirmBx-body");
    confirmBx.remove();
    document.body.classList.remove("react-confirmBx");
    if(action.onClick){
        action.onClick()
    }
   
}

const ConfirModelBox = (props)=>{
    const modelData = props.data;

    return (
        <div className='model-bx-body confirm-bx'>
            <div className='model-title confirm-bx-title'>
                <h3>{modelData.title}</h3>
            </div>
            <div className='model-bx-content confirm-bx-content'>
                <p>{modelData.message}</p>
                <div className='model-bx-action confirm-bx-action'>
                    {
                        modelData.buttons.map((btns) => {
                            return <button 
                                    key={btns.label} 
                                    className={`${btns.label == "Yes" ? "btns btns-primary":"btns btns-secondary"}`} 
                                    name={btns.label} 
                                    onClick={()=> {removeConfirmBx(btns)}}
                                    >{btns.label}</button>
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}
 
export default ConfirModelBox;


