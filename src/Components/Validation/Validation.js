
export const VALIDATOR_REQUIRE = (state, action)=>{
    if(action.type === "REQUIRE"){
        if(!(action.val.trim().length > 0)){
            return {
                value: action.val, 
                isValid: false, 
                msg: action.msg
            }
        }else{
            return {
                value: action.val, 
                isValid: true, 
                msg: ""
            }
        }
    }
    if(action.type === "INVALID"){
        return {
                value: action.val, 
                isValid: false, 
                msg: action.msg
            }
    }

    return {value:'', isValid:null, msg: ""}
}

export const IS_CHECKED = (state, action)=>{
    if(action.type === "CHECKED"){
        return {isValid: action.isChecked}
    }
    return {value:'', isValid:null}
}

export const REQUIRE_LETTER = (state, action)=>{
    let isLetters = (/^[A-Za-z ]+$/);
    
    if(action.type !== "" && !(action.val.trim().length > 0)){
        return {value: action.val, isValid: false, msg: action.msg}
    }
    if(action.type === "REQUIRELETTER"){
        if(action.val.match(isLetters)){
            return {value: action.val, isValid: action.val.trim().length > 0, msg: ""}
        }else{
            return {value: action.val, isValid: false, msg: "Please Enter with Alphabets"}
        }
    }
    return {value:'', isValid:null, msg: ""}
}

export const REQUIRE_EMAIL = (state, action)=>{
    let isEmail = (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    
    if(action.type === "EMAIL"){
        if(!(action.val.trim().length > 0)){
            return {value: action.val, isValid: false, msg:action.msg}
        }
        if(action.val.match(isEmail)){
            return {value: action.val, isValid: action.val.trim().length > 0, msg:""}
        }else{
            return {value: action.val, isValid: false, msg:"Please Enter Valid Email"}
        }
    }
    if(action.type === "INVALID"){
        return {value: action.val, isValid: false, msg: action.msg}
    }
    return {value:'', isValid:null, msg:""}
}

export const VALIDATOR_PASSWORD = (state, action)=>{
    let isPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
    
    if(action.type === "PASSWORD"){
        if(!(action.val.trim().length > 0)){
            return {value: action.val, isValid: false, msg:action.msg}
        }
       
        if(action.val.match(isPassword)){
            return {value: action.val, isValid: action.val.trim().length > 0, msg:""}
        }else{
            return {value: action.val, isValid: false, msg:"Please Enter Valid password"}
        }
    }
    if(action.type === "INVALID"){
        return {value: action.val, isValid: false, msg: action.msg}
    }
    return {value:'', isValid:null, msg:""}
}

export const VALIDATOR_URL = (state, action)=>{
    let isUrl = (/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    
    if(action.type === "URL"){
        if(!(action.val.trim().length > 0)){
            return {value: action.val, isValid: false, msg:action.msg}
        }
       
        if(action.val.match(isUrl)){
            return {value: action.val, isValid: action.val.trim().length > 0, msg:""}
        }else{
            return {value: action.val, isValid: false, msg:"Please Enter Valid URL"}
        }
    }
    if(action.type === "INVALID"){
        return {value: action.val, isValid: false, msg: action.msg}
    }
    return {value:'', isValid:null, msg:""}
}


export const REQUIRE_NUMBER = (state, action)=>{
    let inputNum = action.val.replace(/^0+|[^\d.]/g, '')
    if(action.type === "NUMBER"){
        if(!(inputNum.trim().length > 0)){
            return {
                value: inputNum, 
                isValid: false, 
                msg:action.msg
            }
        }
        if(action.val.match(inputNum)){
            return {value: inputNum, isValid: action.val.trim().length > 0, msg: ""}
        }else{
            return {value: inputNum, isValid: false, msg: "Please Enter Valid Number"}
        }
    }
    return {value:'', isValid:null, msg:""}
}

export const OPT_VALIDATE = (state, action)=>{
    if(action.type === "OTP"){
        return {...state, [action.otpID]: action.val, isValid: action.val.trim().length > 0}
    }
    return {otp1: "", otp2: "", otp3: "", otp4: "", isValid:null}
}

export const onSelectFocus = (event)=>{
    const node = event.target.parentNode;
    const icon = node.getElementsByClassName("select-drop-icon");
    return icon[0].classList.add("active-drop");
}
export const onSelectBur = (event)=>{
    const node = event.target.parentNode;
    const icon = node.getElementsByClassName("select-drop-icon");
    return icon[0].classList.remove("active-drop");
}   
export const RequireField = (field, errElm, activeMsg)=> {
    const userInput = document.getElementsByClassName(field);
    let isValid = true;
    for(let i = 0; i < userInput.length; i++){
      
      if(userInput[i].value === ""){
        const pNode = userInput[i].parentNode;
        const errMsg = pNode.getElementsByClassName(errElm);
        errMsg[0].classList.add(activeMsg);
        isValid = false;
      }else{
        const pNode = userInput[i].parentNode;
        const errMsg = pNode.getElementsByClassName(errElm);
        errMsg[0].classList.remove(activeMsg);
        
      }
    }
    return isValid;
}

//Remove errors
export const onKeyupInput = (event) => {
    const pNode = event.target.parentNode;
    const msg = pNode.getElementsByClassName("require-error")[0];
    if(msg){
        msg.classList.remove("invalid-msg");
    }
};


export const togglePasswordVisiblity = (event) => {
    const node = event.target.parentNode;
    const inptElm = node.getElementsByClassName('userinput')[0];
    const type = inptElm.getAttribute("type") === "password" ? "text" : "password";
    inptElm.setAttribute("type", type);
    event.target.src = event.target.dataset.eye === "open" ? "fa fa-eye" : "fa fa-eye-slash";
    event.target.dataset.eye = event.target.dataset.eye === "open" ? "close" : "open";
};