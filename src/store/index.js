import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./order-slice";


const store = configureStore({
    reducer: {
        order: orderSlice.reducer
    }
});

export default store;