import { configureStore } from "@reduxjs/toolkit";
import LeadsSlice from "./leads-slice";
import userSlice from "./user-slice";

const Store = configureStore({
    reducer: {
            leads: LeadsSlice,
            user:userSlice
        }
})

export default Store;