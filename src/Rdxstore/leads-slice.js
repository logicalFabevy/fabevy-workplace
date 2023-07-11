import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LeadsSlice = createSlice({
    name: "leads",
    initialState:{
        items: [],
        changes:false,
        loadData:false
    },
    reducers: {
        fetchAllItem: (state, action) => {
            state.loadData = action.payload.loadData;
            state.items = action.payload.item;
        },
        updateLeadStatus: (state, action) => {
            const updateLead = action.payload;
            const existLeadIndx = state.items.findIndex(item => item.id === updateLead.id);
            const existLead = state.items.find(item => item.id === updateLead.id);
            let updateLeadsItem;
            state.changes = true;
            if(existLead){
                updateLeadsItem = {...updateLead};
                const updateExistItem = state.items;
                updateExistItem[existLeadIndx] = updateLeadsItem;
                state.items = [...updateExistItem];
            }
        },

        removeLead: (state, action) => {
            const getRemoveItem = action.payload;
            const updateRemovelead = state.items.filter(item => item.id !== getRemoveItem.id);
            state.items = [...updateRemovelead];
            state.changes = true;
        }
    }
})

export const fetchAll = ()=>{
    const baseURL = process.env.REACT_APP_API_URL;
    return async (dispatchData) => {
        dispatchData(LeadsSlice.actions.fetchAllItem({
            loadData: true
        }))
        try{
            const response = await axios.get(`${baseURL}/leads`);
            const data = response.data;
            dispatchData(LeadsSlice.actions.fetchAllItem({
                item: data || [],
                loadData:false
            }))
        }
        catch(err){
            console.log(err);
        }
    }
}

export const sendUpdateRequest = (leadItem)=>{
   return async (dispatchUpdate) => {
        const sendById = async ()=>{
            await axios.put("http://localhost:3002/webinar/edit-leads/"+leadItem.id, {...leadItem});
            dispatchUpdate(LeadsSlice.actions.updateLeadStatus({...leadItem}))
        }    
        try{
            await sendById();
        }
        catch(err){
            console.log(err);
        }
   } 
} 

export const sendRemoveData = (leadItem) => {
    return async (dispatchRemove) =>{
        const sendById = async () =>{
            await axios.put("http://localhost:3002/webinar/remove-leads/"+leadItem.id, {...leadItem});
            dispatchRemove(LeadsSlice.actions.removeLead({...leadItem}));
        }
        try{
            await sendById();
        }
        catch(err){
            console.log(err);
        }
    }
}

export const {fetchAllItem, updateLeadStatus, removeLead} = LeadsSlice.actions;

export default LeadsSlice.reducer;