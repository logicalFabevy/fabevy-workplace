import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name:"user",
    initialState:{
        item:{},
        access:{},
        loading:false,
        isExpired:false
    },
    reducers:{
        getUserData:(state, action)=>{
            state.item = action.payload.item;
            state.access = action.payload.access;
            state.loading = action.payload.loading;
            state.isExpired = action.payload.isExpired;
        }
    }
})

export const fetchUserData = ()=>{
    
    const token = localStorage.getItem("fabtoken")
    const baseURL = process.env.REACT_APP_API_URL;
    return async (dispatch) =>{
        dispatch(userSlice.actions.getUserData({
            item: {},
            loading: true,
            isExpired:false
        }))
        try{
           const response = await axios.post(`${baseURL}/users/validate/`, 
            {
                jwt: token
            })
           
            const data = response.data;
            dispatch(userSlice.actions.getUserData({
                item: {...data.data},
                access:JSON.parse(data.data.access),
                loading: false,
                isExpired: false
            }))
        }
        catch(err){
            console.log(err);
            const data = err.response;
            if(data.status === 401){
                if(data.data.error === "Expired token"){
                    dispatch(userSlice.actions.getUserData({
                        item: {},
                        access:{},
                        loading: false,
                        isExpired: true
                    }))
                }
                
            }
        }
    }
}
export const {getUserData} = userSlice.actions;
export default userSlice.reducer;