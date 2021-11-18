import DeliveryAxios from "../apis/DeliveryAxios"
import { orderActions } from "./order-slice"

export const getOrders = (newPageNo, delivererId, placeOfDelivery) => {
    return (dispatch) => {

        let config = {
            params: {
                pageNo: newPageNo
            }
        }

        // eslint-disable-next-line
        if(delivererId != -1){
            config.params['delivererId'] = delivererId;
        }
        if(placeOfDelivery !== ""){
            config.params['placeOfDelivery'] = placeOfDelivery
        }

        DeliveryAxios.get("/orders", config)
            .then(res => {
                dispatch(orderActions.replaceOrders({
                    items: res.data, 
                    totalPages: res.headers['total-pages'], 
                    pageNo: newPageNo,
                    delivererId: delivererId,
                    placeOfDelivery: placeOfDelivery
                }));
            }).catch(error => {
                console.log(error);
                alert("Fetching orders failed.")
            })
    }
}

export const deleteOrder = (id) => {
    return (dispatch) => {
        DeliveryAxios.delete("/orders/" + id)
            .then(res => {
                dispatch(orderActions.deleteOrder({id: id}))
            }).catch(error => {
                console.log(error)
            })
    }
}

export const getDeliverers = () => {
    return (dispatch) => {
        DeliveryAxios.get("/deliverers")
            .then(res => {
                dispatch(orderActions.replaceDeliverers({items: res.data}))
            }).catch(error => {
                console.log(error)
            })
    }
}

export const createOrder = (order) => {
    return (dispatch) => {
        DeliveryAxios.post("/orders", order)
            .then(res => {
              orderActions.createOrder(res.data)
            }).catch(error => {
                console.log(error)
            })
    }
}

export const createBill = (id) => {
    return (dispatch) => {
        DeliveryAxios.put("/orders/bills/" + id)
            .then(res => {
                dispatch(getOrders(0, -1, ""));
            })
            .catch(error => {
                console.log(error);
            })
    }
}