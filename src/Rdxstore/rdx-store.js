import { configureStore } from "@reduxjs/toolkit";
import LeadsSlice from "./leads-slice";
import userSlice from "./user-slice";
import certificateSlice from "./certificate-slice";

const Store = configureStore({
    reducer: {
            leads: LeadsSlice,
            user:userSlice,
            certificate:certificateSlice
        }
})

export default Store;