import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        deliverers: [],
        pageNo: 0,
        totalPages: 1
    },
    reducers:{
        replaceOrders(state, action){
            state.orders = action.payload.items;
            state.pageNo = action.payload.pageNo;
            state.totalPages = action.payload.totalPages;
        },
        deleteOrder(state, action){
            const id = action.payload.id;
            state.orders = state.orders.filter(x => {
                return x.id !== id;
            })
        },
        replaceDeliverers(state, action){
            state.deliverers = action.payload.items;
        },
        createOrder(state, action){
            state.orders = state.orders.push(...state.orders, action.payload);
        }
    }
})

export const orderActions = orderSlice.actions;

export default orderSlice;