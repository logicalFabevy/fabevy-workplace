import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const certificateSlice = createSlice({
    name:"certificate",
    initialState:{
        item:[],
        isChange:false,
        isLoad:false
    },
    reducers:{
        responseData:(state, action)=>{
            state.item = action.payload.item;
            state.isLoad = action.payload.isLoad;
        },
        addCertificate:(state, action) => {
            state.isChange = true;
            if(state.item.length > 0){
                state.item.push(action.payload); 
            }else{
                state.item = [action.payload]; 
            }
            
        }
    }
})

export const fetchCertificate = ()=>{
    const baseURL = process.env.REACT_APP_API_URL;
    return async (dispatchData) =>{
        dispatchData(certificateSlice.actions.responseData({
            item:[],
            isLoad:true
        }))
        try {
            const response = await axios.get(`${baseURL}/course-certificate/certificate-list/`);
            const data = response.data;
            // console.log(data)
            dispatchData(certificateSlice.actions.responseData({
                item:data || [],
                isLoad:false
            }))
        }   
        catch(err){
            console.log(err)
        }     
    }
}

export const {responseData, addCertificate} = certificateSlice.actions;
export default certificateSlice.reducer;