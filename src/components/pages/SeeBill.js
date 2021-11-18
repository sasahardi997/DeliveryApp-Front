import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DeliveryAxios from '../../apis/DeliveryAxios';

function SeeBill(props) {

    const params = useParams();
    const [bill , setBill] = useState({});

    useEffect(() => {
        DeliveryAxios.get("/bills/" + params.id)
            .then(res => {
                 let data = {
                    billNumber: res.data.billNumber,
                    totalPrice: res.data.totalPrice,
                    date: res.data.date
                }
                setBill(data);
            })
            .catch(error => {
                console.log(error);
                alert("Error Feching Bills!");
            })
    }, [params.id]);

    return (
        <div>
            <h3>Bill number: {bill.billNumber}</h3>
            <h3>Date: {bill.date}</h3>
            <h3>Total price: {bill.totalPrice}</h3>
        </div>
    );
}

export default SeeBill;